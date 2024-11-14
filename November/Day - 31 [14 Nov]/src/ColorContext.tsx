import { createContext, useReducer, ReactNode, Dispatch } from 'react';
import { reducerFunction } from './reducers/ColorReducers';
import { ColorActions, State } from './global';

type ColorContextType = {
    state: State;
    dispatch: Dispatch<ColorActions>;
};

const initialState: State = {
    hexColor: "#000000"
};

export const ColorContext = createContext<ColorContextType>({ state: initialState } as ColorContextType);

type ColorProviderProps = {
    children: ReactNode;
};

export const Provider = ({ children }: ColorProviderProps) => {
    const [state, dispatch] = useReducer(reducerFunction, initialState);

    return (
        <ColorContext.Provider value={{ state, dispatch }}>
            {children}
        </ColorContext.Provider>
    );
};