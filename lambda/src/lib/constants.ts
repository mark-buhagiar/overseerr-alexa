export enum RequestTypes {
  Launch = "LaunchRequest",
  Intent = "IntentRequest",
  SessionEnded = "SessionEndedRequest",
  SystemExceptionEncountered = "System.ExceptionEncountered",
}

export enum IntentTypes {
  Stop = "AMAZON.StopIntent",
  Cancel = "AMAZON.CancelIntent",
  AddMedia = "add_media",
}

export enum ErrorTypes {
  Unknown = "UnknownError",
  Unexpected = "UnexpectedError",
}

export enum LocaleTypes {
  enGB = "en-GB",
  enUS = "en-US",
}

export enum Slots {
  MEDIA_NAME = "media_name",
}

export enum AppDetails {
  APP_NAME = "Overseerr",
  API_KEY = "MTcxNzcwOTIyODA5M2I4ZTE1MTIxLTZkNDMtNDdkNC04ZWNjLWNjNDMwMDE5ZGI5MA==",
  TMDB_POSTER_BASE = "https://image.tmdb.org/t/p/w600_and_h900_bestv2/",
  OVERSEERR_URL = "https://overseerr.episodemanager.eu/api/v1/",
  OVERSEERR_SERVER_ID = 0,
  OVERSEERR_QUALITY_PROFILE_ID = 6,
  OVERSEERR_ROOT_FOLDER = "/externalData/movies",
  OVERSEERR_OBO_ID = 10,
}
