import React from 'react';
import {
  getComplementColors,
  getTriadColors,
} from '../../lib/get-related-colors';
import RelatedColorPalette from './related-color-palette';
// import { ColorActions } from '../../global';

// type RelatedColorsProps = {
//   hexColor: string;
//   dispatch: React.Dispatch<ColorActions>
// };

import { useContext } from 'react';
import { ColorContext } from '../../ColorContext';

const RelatedColors = () => {
  const {state} = useContext(ColorContext);
  const triadColors = getTriadColors(state.hexColor);
  const complementColors = getComplementColors(state.hexColor);

  return (
    <>
      <RelatedColorPalette title="Triad Colors" hexColors={triadColors}/>
      <RelatedColorPalette
        title="Complimentary Colors"
        hexColors={complementColors}
      />
    </>
  );
};

export default RelatedColors;
