import axios from "axios";
import { Media, SearchResult } from '../types';

const BASE_URL = "https://api.themoviedb.org/3";
const CACHE_DURATION = 5 * 60 * 1000;

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

const cache: Record<string, CacheItem<any>> = {};

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
  },
});

async function fetchWithCache<T>(
  cacheKey: string,
  fetchFn: () => Promise<T>
): Promise<T> {
  const cachedData = cache[cacheKey];
  const now = Date.now();

  if (cachedData && now - cachedData.timestamp < CACHE_DURATION) {
    return cachedData.data;
  }

  const data = await fetchFn();
  cache[cacheKey] = { data, timestamp: now };
  return data;
}

export async function fetchTrendingMedia(): Promise<Media[]> {
  return fetchWithCache('trending', async () => {
    const response = await apiClient.get("/trending/all/day");
    return response.data.results;
  });
}

export async function fetchNowPlayingMovies(): Promise<Media[]> {
  return fetchWithCache('nowPlaying', async () => {
    const response = await apiClient.get("/movie/now_playing");
    return response.data.results;
  });
}

export async function fetchNewTvShows(): Promise<Media[]> {
  return fetchWithCache('newTvShows', async () => {
    const response = await apiClient.get("/tv/airing_today");
    return response.data.results;
  });
}

export async function fetchUpcomingMovies(): Promise<Media[]> {
  return fetchWithCache('upcomingMovies', async () => {
    const response = await apiClient.get("/movie/upcoming");
    return response.data.results;
  });
}

export async function searchMedia(query: string): Promise<SearchResult[]> {
  if (!query.trim()) return [];
  
  return fetchWithCache(`search:${query}`, async () => {
    const response = await apiClient.get("/search/multi", {
      params: { query },
    });
    return response.data.results;
  });
}

export function clearMediaCache(key?: string): void {
  if (key) {
    delete cache[key];
  } else {
    Object.keys(cache).forEach(key => delete cache[key]);
  }
}

export async function fetchMediaById(id: string): Promise<Media> {
  return fetchWithCache(`media:${id}`, async () => {
    const response = await apiClient.get(`/movie/${id}`);
    return response.data;
  }).catch(async () => {
    const response = await apiClient.get(`/tv/${id}`);
    return response.data;
  });
}