// import { MouseEventHandler } from 'react';
// import { ColorActions } from '../../global';
import Button from '../shared/button';
import ColorChangeSwatch from '../shared/color-change-swatch';

import { useContext } from 'react';
import { ColorContext } from '../../ColorContext';

type SavedColorProps = {
  name: string;
  hexColor: string;
  onRemove: () => void;
  // dispatch_1: React.Dispatch<ColorActions>
};

const SavedColor = ({ name, hexColor, onRemove }: SavedColorProps) => {

  const {dispatch} = useContext(ColorContext);

  return (
    <article className="flex items-center gap-2 justify-between w-full p-2 border border-gray-200 rounded-md shadow-sm">
      <div className="flex items-center gap-2 hover:cursor-pointer"
        onClick={() => dispatch({ type: "UPDATE_HEX_COLOR", payload: hexColor })}
      >
        <ColorChangeSwatch hexColor={hexColor} />
        <h3 className="text-sm font-medium text-gray-700 truncate">{name}</h3>
      </div>
      <Button variant="destructive" size="small" onClick={onRemove}>
        Remove
      </Button>
    </article>
  );
};

export default SavedColor;
