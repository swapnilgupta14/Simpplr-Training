// src/components/application.tsx
import { useReducer } from 'react';
import SavedColors from './saved-colors';
import RelatedColors from './related-colors';
import AdjustColors from './adjust-colors';
import ColorPicker from './color-picker';
import { reducerFunction } from '../reducers/ColorReducers';
import { State } from '../global';

const Application = () => {
  const initialState: State = {
    hexColor: "#ffffff"
  };

  const [state, dispatch] = useReducer(reducerFunction, initialState);

  return (
    <div className="grid max-w-3xl grid-cols-1 gap-8 p-8 pb-40 mx-auto dark:bg-slate-900 dark:text-white sm:grid-cols-2">
      <ColorPicker
        hexColor={state.hexColor}
        onChange={(e) => dispatch({ type: "UPDATE_HEX_COLOR", payload: e.target.value })}
      />
      <AdjustColors hexColor={state.hexColor} dispatch={dispatch} />
      <RelatedColors hexColor={state.hexColor} dispatch={dispatch}/>
      <SavedColors hexColor={state.hexColor}/>
    </div>
  );
};

export default Application;