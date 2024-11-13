import { useReducer } from 'react';
import id from 'lodash.uniqueid';
import AddSavedColor from './add-saved-color';
import SavedColor from './saved-color';

type SavedColorsProps = {
  hexColor: string;
};

type SavedColorState = {
  id: string;
  name: string;
  hexColor: string;
};

type SavedActionType = { type: 'SAVE_COLOR'; payload: { name: string; hexColor: string } }
  | { type: 'REMOVE_COLOR'; payload: { id: string } };

const initialSavedColors: SavedColorState[] = [
  { id: id(), name: '1989 Miami Hotline', hexColor: '#dd3366' },
  { id: id(), name: 'Blue Fire', hexColor: '#00aadd' },
];

const savedReducer = (state: SavedColorState[], action: SavedActionType): SavedColorState[] => {
  switch (action.type) {
    case 'SAVE_COLOR':
      return [
        ...state,
        { id: id(), name: action.payload.name, hexColor: action.payload.hexColor },
      ];
    case 'REMOVE_COLOR':
      return state.filter((color) => color.id !== action.payload.id);
    default:
      return state;
  }
};

const SavedColors = ({ hexColor }: SavedColorsProps) => {
  const [savedColors, dispatch] = useReducer(savedReducer, initialSavedColors);

  return (
    <section className="flex flex-col w-full gap-4 sm:col-span-2">
      <h3>Save Color</h3>
      <AddSavedColor
        onSave={(name) =>
          dispatch({ type: 'SAVE_COLOR', payload: { name, hexColor } })
        }
      />
      {savedColors.map(({ id, name, hexColor }) => (
        <SavedColor
          key={id}
          name={name}
          hexColor={hexColor}
          onRemove={() => dispatch({ type: 'REMOVE_COLOR', payload: { id } })}
        />
      ))}
    </section>
  );
};

export default SavedColors;
