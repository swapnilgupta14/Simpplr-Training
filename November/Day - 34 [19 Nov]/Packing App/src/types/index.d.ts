export type Category =
  | "clothing"
  | "electronics"
  | "toiletries"
  | "documents"
  | "accessories"
  | "stationary"
  | "health"
  | "food"
  | "books";

export type PackingContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

export interface Item {
  id: string;
  name: string;
  category: Category;
  isPacked: boolean;
}

export type State = {
  items: Item[];
  selectedCategory: Category | "all";
  unpackedSearchQuery: string;
  packedSearchQuery: string;
};

export type Action =
  | { type: "TOGGLE_PACK"; payload: string }
  | { type: "SET_CATEGORY"; payload: Category | "all" }
  | { type: "SET_UNPACKED_SEARCH_QUERY"; payload: string }
  | { type: "SET_PACKED_SEARCH_QUERY"; payload: string }
  | { type: "ADD_ITEM"; payload: Item }
  | { type: "EDIT_ITEM_NAME"; payload: { id: string; name: string } }
  | { type: "UNPACK_ALL"};

export type GroupedItems = {
  [K in Category]: Item[];
};
