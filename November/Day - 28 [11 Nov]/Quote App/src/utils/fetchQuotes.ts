import { Quote } from "./types";

export const fetchRandomQuote = async (limit: number = 1): Promise<Quote[]> => {
  const response = await fetch(
    `http://api.quotable.io/quotes/random?limit=${limit}`
  );
  if (response.status !== 200) throw new Error("Failed to fetch quotes");
  return response.json();
};
