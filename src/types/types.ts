export interface ITitle {
  romaji?: string;
  english?: string;
  native?: string;
  userPreferred?: string;
}

export interface IMediaResult {
  id: string;
  title: string | ITitle;
  url?: string;
  image?: string;
  cover?: string;
  status?: MediaStatus;
  rating?: number;
  type?: MediaFormat | TvType;
  releaseDate?: string;
  [x: string]: unknown; // other fields
}

export interface ISearch<T> {
  currentPage?: number;
  hasNextPage?: boolean;
  totalPages?: number;
  /**
   * total results must include results from all pages
   */
  totalResults?: number;
  results: T[];
}

export interface Trailer {
  id: string;
  site?: string;
  thumbnail?: string;
}

export interface FuzzyDate {
  year?: number;
  month?: number;
  day?: number;
}

export enum MediaFormat {
  TV = "TV",
  TV_SHORT = "TV_SHORT",
  MOVIE = "MOVIE",
  SPECIAL = "SPECIAL",
  OVA = "OVA",
  ONA = "ONA",
  MUSIC = "MUSIC",
  MANGA = "MANGA",
  NOVEL = "NOVEL",
  ONE_SHOT = "ONE_SHOT",
}

export interface IMediaInfo extends IMediaResult {
  malId?: number | string;
  genres?: string[];
  description?: string;
  status?: MediaStatus;
  totalEpisodes?: number;
  /**
   * @deprecated use `hasSub` or `hasDub` instead
   */
  subOrDub?: SubOrDub;
  hasSub?: boolean;
  hasDub?: boolean;
  synonyms?: string[];
  /**
   * two letter representation of coutnry: e.g JP for japan
   */
  countryOfOrigin?: string;
  isAdult?: boolean;
  isLicensed?: boolean;
  season?: string;
  studios?: string[];
  color?: string;
  cover?: string;
  trailer?: Trailer;

  episodes?: IMediaEpisode[];
  chapters?: IMangaChapter[];

  startDate?: FuzzyDate;
  endDate?: FuzzyDate;
  recommendations?: IMediaResult[];
  relations?: IMediaResult[];
}

export interface IMediaEpisode {
  id: string;
  title?: string;
  url?: string;
  season?: number;
  number?: number;
  description?: string;
  isFiller?: boolean;
  image?: string;
  releaseDate?: string;
  [x: string]: unknown; // other fields
}

export interface IMangaChapter {
  id: string;
  title: string;
  volume?: number;
  pages?: number;
  releaseDate?: string;
  [x: string]: unknown; // other fields
}

export interface IEpisodeServer {
  name: string;
  url: string;
}

export interface IVideo {
  /**
   * The **MAIN URL** of the video provider that should take you to the video
   */
  url: string;
  /**
   * The Quality of the video should include the `p` suffix
   */
  quality?: string;
  /**
   * make sure to set this to `true` if the video is hls
   */
  isM3U8?: boolean;
  /**
   * set this to `true` if the video is dash (mpd)
   */
  isDASH?: boolean;
  /**
   * size of the video in **bytes**
   */
  size?: number;
  [x: string]: unknown; // other fields
}

export enum StreamingServers {
  AsianLoad = "asianload",
  GogoCDN = "gogocdn",
  StreamSB = "streamsb",
  MixDrop = "mixdrop",
  UpCloud = "upcloud",
  VidCloud = "vidcloud",
  StreamTape = "streamtape",
  VizCloud = "vizcloud",
  // same as vizcloud
  MyCloud = "mycloud",
  Filemoon = "filemoon",
  VidStreaming = "vidstreaming",
}

export enum MediaStatus {
  ONGOING = "Ongoing",
  COMPLETED = "Completed",
  HIATUS = "Hiatus",
  CANCELLED = "Cancelled",
  NOT_YET_AIRED = "Not yet aired",
  UNKNOWN = "Unknown",
}

export enum SubOrDub {
  SUB = "sub",
  DUB = "dub",
  BOTH = "both",
}

export interface ISubtitle {
  /**
   * The id of the subtitle. **not** required
   */
  id?: string;
  /**
   * The **url** that should take you to the subtitle **directly**.
   */
  url: string;
  /**
   * The language of the subtitle
   */
  lang: string;
}

/**
 * The start, and the end of the intro or opening in seconds.
 */
export interface Intro {
  start: number;
  end: number;
}

export interface ISource {
  headers?: { [k: string]: string };
  intro?: Intro;
  subtitles?: ISubtitle[];
  sources: IVideo[];
  download?: string;
  embedURL?: string;
}

/**
 * Used **only** for movie/tvshow providers
 */
export enum TvType {
  TVSERIES = "TV Series",
  MOVIE = "Movie",
  ANIME = "Anime",
}

export enum Genres {
  ACTION = "Action",
  ADVENTURE = "Adventure",
  CARS = "Cars",
  COMEDY = "Comedy",
  DRAMA = "Drama",
  ECCHI = "Ecchi",
  FANTASY = "Fantasy",
  HORROR = "Horror",
  MAHOU_SHOUJO = "Mahou Shoujo",
  MECHA = "Mecha",
  MUSIC = "Music",
  MYSTERY = "Mystery",
  PSYCHOLOGICAL = "Psychological",
  ROMANCE = "Romance",
  SCI_FI = "Sci-Fi",
  SLICE_OF_LIFE = "Slice of Life",
  SPORTS = "Sports",
  SUPERNATURAL = "Supernatural",
  THRILLER = "Thriller",
}

export enum Topics {
  ANIME = "anime",
  ANIMATION = "animation",
  MANGA = "manga",
  GAMES = "games",
  NOVELS = "novels",
  LIVE_ACTION = "live-action",
  COVID_19 = "covid-19",
  INDUSTRY = "industry",
  MUSIC = "music",
  PEOPLE = "people",
  MERCH = "merch",
  EVENTS = "events",
}

export enum AvailableExtensionTypes {
  anime = "anime",
  manga = "manga",
  movie = "movie",
  cartoon = "cartoon",
}
