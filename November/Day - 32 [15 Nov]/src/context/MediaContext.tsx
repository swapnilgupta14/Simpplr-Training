import React, { createContext, useReducer, useContext, useCallback } from "react";
import { MediaState, MediaAction, MediaContextType } from "../types";
import {
  fetchTrendingMedia,
  fetchNowPlayingMovies,
  fetchNewTvShows,
  fetchUpcomingMovies,
} from "../api/api";

const initialState: MediaState = {
  trending: null,
  recentReleases: null,
  upcoming: null,
  loading: false,
  error: null,
};

const MediaContext = createContext<MediaContextType | undefined>(undefined);

const mediaReducer = (state: MediaState, action: MediaAction): MediaState => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, ...action.payload, loading: false };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const localCache: Record<string, any> = {};

const fetchDataForKey = async (key: keyof MediaState) => {
  if (localCache[key]) {
    return localCache[key];
  }

  let data;
  switch (key) {
    case "trending":
      data = await fetchTrendingMedia();
      break;
    case "recentReleases":
      const [movies, shows] = await Promise.all([
        fetchNowPlayingMovies(),
        fetchNewTvShows(),
      ]);
      data = [...movies, ...shows];
      break;
    case "upcoming":
      data = await fetchUpcomingMovies();
      break;
    default:
      throw new Error(`Invalid key: ${key}`);
  }

  localCache[key] = data;
  return data;
};

export const MediaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(mediaReducer, initialState);

  const fetchMedia = useCallback(
    async (key: keyof MediaState) => {
      if (state[key]) return;

      dispatch({ type: "FETCH_START" });
      try {
        const data = await fetchDataForKey(key);
        dispatch({ type: "FETCH_SUCCESS", payload: { [key]: data } });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An error occurred";
        console.error("Error fetching media:", errorMessage);
        dispatch({ type: "FETCH_ERROR", payload: errorMessage });

        localCache[key] = { error: errorMessage };
      }
    },
    [state]
  );

  return <MediaContext.Provider value={{ state, fetchMedia }}>{children}</MediaContext.Provider>;
};

export const useMediaContext = () => {
  const context = useContext(MediaContext);
  if (context === undefined) {
    throw new Error("useMediaContext must be used within a MediaProvider");
  }
  return context;
};
