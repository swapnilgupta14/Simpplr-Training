import { PropsWithChildren, useReducer } from 'react';
import Button from '../shared/button';
import LabeledInput from '../shared/labeled-input';

type AddSavedColorProps = {
  onSave: (color: string) => void;
};

type AddSavedColorState = {
  savedColorName: string;
  error: string | null;
};

type Action = { type: 'SET_COLOR_NAME'; payload: string }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'RESET' };

const initialState: AddSavedColorState = {
  savedColorName: '',
  error: null,
};

const reducer = (state: AddSavedColorState, action: Action): AddSavedColorState => {
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

const AddSavedColor = ({ onSave }: PropsWithChildren<AddSavedColorProps>) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
