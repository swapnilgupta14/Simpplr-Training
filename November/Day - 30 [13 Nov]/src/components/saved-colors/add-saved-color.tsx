import { PropsWithChildren, useReducer } from 'react';
import Button from '../shared/button';
import LabeledInput from '../shared/labeled-input';
// import {AddSavedColorState, SavedColorActionType} from "../../global";
import {initialState, reducerSavedColor} from "../../reducers/SavedColorReducers"

type AddSavedColorProps = {
  onSave: (color: string) => void;
};


const AddSavedColor = ({ onSave }: PropsWithChildren<AddSavedColorProps>) => {
  const [state, dispatch] = useReducer(reducerSavedColor, initialState);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.savedColorName.trim() === '') {
      dispatch({ type: 'SET_ERROR', payload: 'Color name cannot be empty' });
      return;
    }
    onSave(state.savedColorName.trim());
    dispatch({ type: 'RESET' });
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSave}>
      <LabeledInput
        label="Color Name"
        value={state.savedColorName}
        onChange={(e) => {
          dispatch({ type: 'SET_COLOR_NAME', payload: e.target.value });
          if (state.error) dispatch({ type: 'CLEAR_ERROR' });
        }}
      />
      {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
      <Button variant="primary" className="w-full">
        💾 Save Color
      </Button>
    </form>
  );
};

export default AddSavedColor;
