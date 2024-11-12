export interface Quote {
  id: string;
  content: string;
  author: string;
  authorSlug: string;
  length: number;
  tags: string[];
}

export interface QuotesProps {
  quotes: Quote[];
  setQuotes: React.Dispatch<React.SetStateAction<Quote[]>>;
  setLimit: React.Dispatch<React.SetStateAction<string>>;
  children?: React.ReactNode;
}

export interface DailyQuoteProps {
  dailyQuote: Quote | null;
  isLoading: boolean;
}