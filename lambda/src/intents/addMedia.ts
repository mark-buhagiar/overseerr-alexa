import {
  HandlerInput,
  RequestHandler,
  getIntentName,
  getRequestType,
} from "ask-sdk-core";
import axios from "axios";
import { AppDetails, IntentTypes, RequestTypes, Slots } from "../lib/constants";
import { GetRequestAttributes } from "../lib/helpers";

const overseerrApiKey = AppDetails.API_KEY as const;
const axiosInstance = axios.create({
  headers: {
    "X-Api-Key": overseerrApiKey,
    "Content-Type": "application/json",
  },
});

async function searchForMedia(mediaName: string) {
  try {
    const searchUrl = `${AppDetails.OVERSEERR_URL}search?page=1&language=en&query=${mediaName}`;
    const searchResponse = await axiosInstance.get<OverseerrSearchResponse>(
      searchUrl
    );

    return searchResponse.data;
  } catch (e) {
    console.error(e.toJSON());
    throw new Error(`An error occurred while searching for ${mediaName}`);
  }
}

function getBestGuessResult(results: Result[]) {
  const sortedResults = results
    .filter((x) => x.mediaType === "movie" && x.mediaInfo === undefined) // Filter the list such that we only have movies that we have not already requested... so you can say... add batman 5 times in a row to keep adding batman films.
    .map((x) => x as Movie)
    .sort((a, b) => ((a.popularity ?? 0) > (b.popularity ?? 0) ? -1 : 1)); // Sort the films by popularity descending

  return sortedResults.length > 0 ? sortedResults[0] : undefined;
}

async function requestMovie(movie: Movie) {
  const { id: mediaId, mediaType, title } = movie;

  const postUrl = `${AppDetails.OVERSEERR_URL}request`;
  const postBody = {
    mediaId,
    mediaType,
    is4k: false,
    serverId: AppDetails.OVERSEERR_SERVER_ID,
    profileId: AppDetails.OVERSEERR_QUALITY_PROFILE_ID,
    rootFolder: AppDetails.OVERSEERR_ROOT_FOLDER,
    userId: AppDetails.OVERSEERR_OBO_ID,
  };

  try {
    const overseerrRequestResponse = await axiosInstance.post<OverseerrRequest>(
      postUrl,
      postBody
    );

    const requestResponseData = overseerrRequestResponse.data;
    console.log("Requested", requestResponseData);
    return requestResponseData;
  } catch (e) {
    console.error(e.toJSON());
    throw new Error(`An error occurred while requesting ${title}`);
  }
}

async function processMediaRequest(mediaName: string) {
  const searchResponse = await searchForMedia(mediaName);
  const topResult = getBestGuessResult(searchResponse.results);

  if (!topResult) {
    throw new Error("No matching movie found");
  }

  await requestMovie(topResult);
  return topResult;
}

export const AddMediaIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    return (
      getRequestType(handlerInput.requestEnvelope) === RequestTypes.Intent &&
      getIntentName(handlerInput.requestEnvelope) === IntentTypes.AddMedia
    );
  },
  async handle(handlerInput) {
    const { slots } = GetRequestAttributes(handlerInput);
    const mediaInput = slots[Slots.MEDIA_NAME].value;

    let speakOutput = "No idea what went wrong!";
    let responseBuilder = handlerInput.responseBuilder;

    try {
      const requestedMovie = await processMediaRequest(mediaInput);
      speakOutput = `Requested ${requestedMovie.title}`;
      responseBuilder.withStandardCard(
        AppDetails.APP_NAME,
        speakOutput,
        `${AppDetails.TMDB_POSTER_BASE}${requestedMovie.posterPath}`,
        `${AppDetails.TMDB_POSTER_BASE}${requestedMovie.posterPath}`
      );
    } catch (e) {
      speakOutput = e.message;
      responseBuilder.withSimpleCard(AppDetails.APP_NAME, speakOutput);
    }

    return responseBuilder.speak(speakOutput).getResponse();
  },
};
