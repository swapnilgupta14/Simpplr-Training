import ColorName from './color-name';
import HexToCMYK from './to-cmyk';
import HexToHSL from './to-hsl';
import HexToHSV from './to-hsv';
import HexToRGB from './to-rgb';

// import { ColorActions } from '../../global';

// type AdjustColorsProps = {
//   hexColor: string;
//   dispatch: React.Dispatch<ColorActions>
// };

const AdjustColors = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <h3>Adjust Colors</h3>
      <HexToRGB />
      <HexToHSL/>
      <HexToHSV />
      <HexToCMYK/>
      <ColorName/>
    </div>
  );
};

export default AdjustColors;
