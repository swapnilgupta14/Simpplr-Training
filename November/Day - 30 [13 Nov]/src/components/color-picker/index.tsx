import { useContext } from 'react';
import { ColorContext } from '../../ColorContext';
import ColorSelect from './color-select';
import ColorSwatch from './color-swatch';

const ColorPicker = () => {
  const { state, dispatch } = useContext(ColorContext);

  return (
    <div className="flex w-full flex-col gap-4">
      <h3>Select Color</h3>
      <ColorSelect
        hexColor={state.hexColor}
        onChange={(e) => dispatch({ type: "UPDATE_HEX_COLOR", payload: e.target.value })}
      />
      <ColorSwatch hexColor={state.hexColor} />
    </div>
  );
};

export default ColorPicker;