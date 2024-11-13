export interface Quote {
  id: string;
  content: string;
  author: string;
  authorSlug: string;
  length: number;
  tags: string[];
}

export interface State {
  quotes: Quote[];
  limit: string;
  dailyQuote: Quote | null;
  isLoading: boolean;
}

export type Action = 
  | { type: 'SET_DAILY_QUOTE'; payload: Quote }
  | { type: 'SET_QUOTES'; payload: Quote[] }
  | { type: 'SET_LIMIT'; payload: string }
  | { type: 'SET_IS_LOADING'; payload: boolean }
  | { type: 'CLEAR_QUOTES' };

export interface DailyQuoteProps {
  dailyQuote: Quote | null;
  isLoading: boolean;
}

export interface QuotesProps {
  quotes: Quote[];
  dispatch: React.Dispatch<Action>;
  children?: React.ReactNode;
}