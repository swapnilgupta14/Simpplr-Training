import { useContext } from 'react';
import { ColorContext } from '../../ColorContext';
import colorNames from 'color-name-list';

// type ColorNameProps = {
//   hexColor: string;
// };

const ColorName = () => {
  const { state } = useContext(ColorContext);
  const color = colorNames.find((color) => {
    return color.hex === state.hexColor.toLowerCase();
  });

  if (!color) return null;

  return (
    <p className="information">
      This color is called{' '}
      <span style={{ color: color.hex }}>{color.name}</span>.
    </p>
  );
};

export default ColorName;
