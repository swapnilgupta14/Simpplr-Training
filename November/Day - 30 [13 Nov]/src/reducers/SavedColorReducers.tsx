import {AddSavedColorState, SavedColorActionType} from "../global"

export const initialState: AddSavedColorState = {
    savedColorName: '',
    error: null,
};

export const reducerSavedColor = (state: AddSavedColorState, action: SavedColorActionType): AddSavedColorState => {
    switch (action.type) {
        case 'SET_COLOR_NAME':
            return { ...state, savedColorName: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'CLEAR_ERROR':
            return { ...state, error: null };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
};