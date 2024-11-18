import React, {
    createContext,
    useReducer,
    useContext,
    useEffect,
    useCallback,
} from "react";
import { Media } from "../types";

type ListType = "favorites" | "watchlist" | "watched";

interface UserLists {
    favorites: Media[];
    watchlist: Media[];
    watched: Media[];
}

type UserListsAction = { type: "ADD_TO_LIST"; payload: { listType: ListType; media: Media } }
    | { type: "REMOVE_FROM_LIST"; payload: { listType: ListType; mediaId: number } }
    | { type: "SET_LISTS"; payload: UserLists };

interface UserListsContextType {
    lists: UserLists;
    isInList: (listType: ListType, mediaId: number) => boolean;
    addToList: (listType: ListType, media: Media) => void;
    removeFromList: (listType: ListType, mediaId: number) => void;
}

const initialState: UserLists = {
    favorites: [],
    watchlist: [],
    watched: [],
};

const STORAGE_KEY = "user_media_lists";

const loadInitialState = (): UserLists => {
    if (typeof window === 'undefined') return initialState;
    
    try {
        const savedLists = localStorage.getItem(STORAGE_KEY);
        return savedLists ? JSON.parse(savedLists) : initialState;
    } catch (error) {
        console.error('Error loading lists from localStorage:', error);
        return initialState;
    }
};

const userListsReducer = (state: UserLists, action: UserListsAction): UserLists => {
    switch (action.type) {
        case "ADD_TO_LIST": {
            const { listType, media } = action.payload;
            if (state[listType].some((item) => item.id === media.id)) return state;
            const newState = {
                ...state,
                [listType]: [...state[listType], media],
            };
            if (typeof window !== 'undefined') {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
            }
            return newState;
        }
        case "REMOVE_FROM_LIST": {
            const { listType: type, mediaId } = action.payload;
            const newState = {
                ...state,
                [type]: state[type].filter((item) => item.id !== mediaId),
            };
            if (typeof window !== 'undefined') {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
            }
            return newState;
        }
        case "SET_LISTS":
            return action.payload;
        default:
            return state;
    }
};

const UserListsContext = createContext<UserListsContextType | undefined>(undefined);

export const UserListsProvider: React.FC<{ children: React.ReactNode }> = ({ children,}) => {
    const [lists, dispatch] = useReducer(userListsReducer, initialState, loadInitialState);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
        }
    }, [lists]);

    const isInList = useCallback(
        (listType: ListType, mediaId: number) =>
            lists[listType].some((item) => item.id === mediaId),
        [lists]
    );

    const addToList = useCallback(
        (listType: ListType, media: Media) =>
            dispatch({ type: "ADD_TO_LIST", payload: { listType, media } }),
        []
    );

    const removeFromList = useCallback(
        (listType: ListType, mediaId: number) =>
            dispatch({ type: "REMOVE_FROM_LIST", payload: { listType, mediaId } }),
        []
    );

    const value = { lists, isInList, addToList, removeFromList };

    return (
        <UserListsContext.Provider value={value}>
            {children}
        </UserListsContext.Provider>
    );
};

export const useUserLists = (): UserListsContextType => {
    const context = useContext(UserListsContext);
    if (!context) {
        throw new Error("useUserLists must be used within a UserListsProvider");
    }
    return context;
};