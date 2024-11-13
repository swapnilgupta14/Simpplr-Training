import LabeledInput from '../shared/labeled-input';
import { ActionUnion } from '../../global';

type HexToRGBProps = {
  hexColor: string;
  dispatch: React.Dispatch<ActionUnion>
};

const HexToRGB = ({ hexColor, dispatch }: HexToRGBProps) => {
  const color = require('color-convert').hex.rgb(hexColor);
  const [r, g, b] = color;

  return (
    <section className="grid w-full grid-flow-col gap-2">
      <LabeledInput
        label="R"
        type="number"
        min={0}
        max={255}
        value={r}
        onChange={(e) => {
          dispatch({
            type: 'SET_RGB_COLOR',
            payload: { rgb: [Number(e.target.value), g, b] },
          });
        }}
      />
      <LabeledInput
        label="G"
        type="number"
        value={g}
        min={0}
        max={255}
        onChange={(e) => {
          dispatch({
            type: 'SET_RGB_COLOR',
            payload: { rgb: [r, Number(e.target.value), b] },
          });
        }}
      />
      <LabeledInput
        label="B"
        type="number"
        value={b}
        min={0}
        max={255}
        onChange={(e) => {
          dispatch({
            type: 'SET_RGB_COLOR',
            payload: { rgb: [r, g, Number(e.target.value)] },
          });
        }}
      />
    </section>
  );
};

export default HexToRGB;
