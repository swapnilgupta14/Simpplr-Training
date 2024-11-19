// src/components/application.tsx
// import { useReducer } from 'react';
import SavedColors from './saved-colors';
import RelatedColors from './related-colors';
import AdjustColors from './adjust-colors';
import ColorPicker from './color-picker';
// import { reducerFunction } from '../reducers/ColorReducers';
// import { State } from '../global';

import { Provider } from '../ColorContext';

const Application = () => {
  // const initialState: State = {
  //   hexColor: "#000000"
  // };

  // const [state, dispatch] = useReducer(reducerFunction, initialState);


  return (
    <Provider>
      <div className="grid max-w-3xl grid-cols-1 gap-8 p-8 pb-40 mx-auto dark:bg-slate-900 dark:text-white sm:grid-cols-2">
        <ColorPicker />
        <AdjustColors />
        <RelatedColors />
        <SavedColors />
      </div>
    </Provider>
  );
};

export default Application;