import { hex } from 'color-convert';
import LabeledInput from '../shared/labeled-input';
// import { ColorActions } from "../../global"

// type HexToHSLProps = {
//   hexColor: string;
//   dispatch: React.Dispatch<ColorActions>
// };

import { useContext } from 'react';
import { ColorContext } from '../../ColorContext';

const HexToHSL = () => {
  const {state, dispatch} = useContext(ColorContext);
  const color = hex.hsl(state.hexColor);
  const [h, s, l] = color;

  return (
    <section className="grid w-full grid-flow-col gap-2">
      <LabeledInput
        label="H"
        type="number"
        min={0}
        max={255}
        value={h}
        onChange={(e) => {
          dispatch({
            type: 'SET_HSL_COLOR',
            payload: { hsl: [Number(e.target.value), s, l] },
          });
        }}
      />
      <LabeledInput
        label="S"
        type="number"
        value={s}
        min={0}
        max={255}
        onChange={(e) => {
          dispatch({
            type: 'SET_HSL_COLOR',
            payload: { hsl: [h, Number(e.target.value), l] },
          });
        }}
      />
      <LabeledInput
        label="L"
        type="number"
        value={l}
        min={0}
        max={255}
        onChange={(e) => {
          dispatch({
            type: 'SET_HSL_COLOR',
            payload: { hsl: [h, s, Number(e.target.value)] },
          });
        }}
      />
    </section>
  );
};

export default HexToHSL;
