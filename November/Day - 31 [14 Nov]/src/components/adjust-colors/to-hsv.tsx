import { hex } from 'color-convert';
import LabeledInput from '../shared/labeled-input';
// import { ColorActions } from '../../global';

// type HexToHSVProps = {
//   hexColor: string;
//   dispatch: React.Dispatch<ColorActions>

// };

import { useContext } from 'react';
import { ColorContext } from '../../ColorContext';

const HexToHSV = () => {
  const {state, dispatch} = useContext(ColorContext)
  const color = hex.hsv(state.hexColor);
  const [h, s, v] = color;

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
            type: 'SET_HSV_COLOR',
            payload: { hsv: [Number(e.target.value), s, v] },
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
            type: 'SET_HSV_COLOR',
            payload: { hsv: [h, Number(e.target.value), v] },
          });
        }}
      />
      <LabeledInput
        label="V"
        type="number"
        value={v}
        min={0}
        max={255}
        onChange={(e) => {
          dispatch({
            type: 'SET_HSV_COLOR',
            payload: { hsv: [h, s, Number(e.target.value)] },
          });
        }}
      />
    </section>
  );
};

export default HexToHSV;
