import React, { createContext, useContext, useReducer } from 'react';
import { initialItems } from '../items';
import { State, Action, PackingContextType } from '../types';

const PackingContext = createContext<PackingContextType | undefined>(undefined);

const initialState: State = {
    items: initialItems,
    selectedCategory: 'all',
    unpackedSearchQuery: '',
    packedSearchQuery: '',
};

function packingReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'TOGGLE_PACK':
            return {
                ...state, items: state.items.map((item) => item.id === action.payload
                    ? { ...item, isPacked: !item.isPacked }
                    : item)
            };
        case 'SET_CATEGORY':
            return { ...state, selectedCategory: action.payload };
        case 'SET_UNPACKED_SEARCH_QUERY':
            return { ...state, unpackedSearchQuery: action.payload };
        case 'SET_PACKED_SEARCH_QUERY':
            return { ...state, packedSearchQuery: action.payload };
        case 'ADD_ITEM':
            return {
                ...state,
                items: [...state.items, action.payload]
            };
        case 'EDIT_ITEM_NAME':
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, name: action.payload.name }
                        : item
                )
            };
        case "UNPACK_ALL":
            return {
                ...state,
                items: state.items.map(item => ({
                    ...item,
                    isPacked: false,
                })),
            };
        default:
            return state;
    }
}

// type DispatchActionType = {
//     state: State,
//     dispatch: React.Dispatch<Action>
// }

export function PackingProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(packingReducer, initialState);

    return (
        <PackingContext.Provider value={{ state, dispatch }}>
            {children}
        </PackingContext.Provider>
    );
}

export function usePackingContext() {
    const context = useContext(PackingContext);
    if (!context) {
        throw new Error('PackingProvider');
    }
    return context;
}