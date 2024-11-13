// import { MouseEventHandler } from 'react';
import Button from '../shared/button';
import ColorChangeSwatch from '../shared/color-change-swatch';

type SavedColorProps = {
  name: string;
  hexColor: string;
  onRemove: () => void;
};

const SavedColor = ({ name, hexColor, onRemove }: SavedColorProps) => {
  return (
    <article className="flex items-center gap-2 justify-between w-full p-2 border border-gray-200 rounded-md shadow-sm">
      <div className="flex items-center gap-2">
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
