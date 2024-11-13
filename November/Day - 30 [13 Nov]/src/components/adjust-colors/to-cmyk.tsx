import { hex } from 'color-convert';
import LabeledInput from '../shared/labeled-input';
import { ActionUnion } from '../../global';

type HexToCMYKProps = {
  hexColor: string;
  dispatch: React.Dispatch<ActionUnion>;
};

const HexToCMYK = ({ hexColor, dispatch }: HexToCMYKProps) => {
  const color = hex.cmyk(hexColor);
  const [c, m, y, k] = color;

  return (
    <section className="grid w-full grid-flow-col gap-2">
      <LabeledInput
        label="C"
        type="number"
        value={c}
        min={0}
        max={255}
        onChange={(e) => {
          dispatch({
            type: 'SET_CMYK_COLOR',
            payload: { cmyk: [Number(e.target.value), m, y, k] },
          });
        }}
      />
      <LabeledInput
        label="M"
        type="number"
        value={m}
        min={0}
        max={255}
        onChange={(e) => {
          dispatch({
            type: 'SET_CMYK_COLOR',
            payload: { cmyk: [c, Number(e.target.value), y, k] },
          });
        }}
      />
      <LabeledInput
        label="Y"
        type="number"
        value={y}
        min={0}
        max={255}
        onChange={(e) => {
          dispatch({
            type: 'SET_CMYK_COLOR',
            payload: { cmyk: [c, m, Number(e.target.value), k] },
          });
        }}
      />
      <LabeledInput
        label="K"
        type="number"
        value={k}
        min={0}
        max={255}
        onChange={(e) => {
          dispatch({
            type: 'SET_CMYK_COLOR',
            payload: { cmyk: [c, m, y, Number(e.target.value)] },
          });
        }}
      />
    </section>
  );
};

export default HexToCMYK;
