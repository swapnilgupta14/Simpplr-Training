import React from 'react';
import {
  getComplementColors,
  getTriadColors,
} from '../../lib/get-related-colors';
import RelatedColorPalette from './related-color-palette';
import { ActionUnion } from '../../global';

type RelatedColorsProps = {
  hexColor: string;
  dispatch: React.Dispatch<ActionUnion>
};

const RelatedColors = ({ hexColor, dispatch }: RelatedColorsProps) => {
  const triadColors = getTriadColors(hexColor);
  const complementColors = getComplementColors(hexColor);

  return (
    <>
      <RelatedColorPalette title="Triad Colors" hexColors={triadColors} dispatch={dispatch}/>
      <RelatedColorPalette
        title="Complimentary Colors"
        hexColors={complementColors}
        dispatch={dispatch}
      />
    </>
  );
};

export default RelatedColors;
