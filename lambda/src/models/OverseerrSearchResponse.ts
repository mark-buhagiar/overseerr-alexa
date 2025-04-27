interface OverseerrSearchResponse {
  page: number;
  totalPages: number;
  totalResults: number;
  results: Result[];
}

type Result = Movie | TvShow | Person;

interface MediaBase {
  id: number;
  mediaType: string;
  popularity: number;
  posterPath?: string;
  backdropPath?: string;
  voteCount: number;
  voteAverage: number;
  genreIds: number[];
  overview: string;
  originalLanguage: string;
  mediaInfo?: MediaInfo;
}

interface Movie extends MediaBase {
  title: string;
  originalTitle: string;
  releaseDate: string;
  adult: boolean;
  video: boolean;
  mediaType: "movie";
}

interface TvShow extends MediaBase {
  name: string;
  originalName: string;
  originCountry: string[];
  firstAirDate: string;
  mediaType: "tv";
}

interface Person {
  id: number;
  profilePath: string;
  adult: boolean;
  mediaType: "person";
  knownFor: (Movie | TvShow)[];
}
