export interface Media {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  media_type?: 'movie' | 'tv';
  overview?: string
}

export interface MediaState {
  trending: Media[] | null;
  recentReleases: Media[] | null;
  upcoming: Media[] | null;
  loading: boolean;
  error: string | null;
}

export type MediaAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Partial<MediaState> }
  | { type: "FETCH_ERROR"; payload: string };

export interface MediaContextType {
  state: MediaState;
  fetchMedia: (key: keyof Pick<MediaState, 'trending' | 'recentReleases' | 'upcoming'>) => Promise<void>;
}

export interface SearchResult extends Media {
  media_type: 'movie' | 'tv';
}


export interface UserLists {
    favorites: Media[];
    watchlist: Media[];
    watched: Media[];
}

export type ListType = keyof UserLists;

export type UserListsAction =
    | { type: 'ADD_TO_LIST'; payload: { listType: ListType; media: Media } }
    | { type: 'REMOVE_FROM_LIST'; payload: { listType: ListType; mediaId: number } }
    | { type: 'SET_LISTS'; payload: UserLists };

export interface UserListsContextType {
    lists: UserLists;
    isInList: (listType: ListType, mediaId: number) => boolean;
    addToList: (listType: ListType, media: Media) => void;
    removeFromList: (listType: ListType, mediaId: number) => void;
}