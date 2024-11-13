import React from 'react';
import ColorChangeSwatch from '../shared/color-change-swatch';
import { ActionUnion } from '../../global';

type RelatedColorPaletteProps = {
  title: string;
  hexColors: string[];
  dispatch: React.Dispatch<ActionUnion>
};

const RelatedColorPalette = ({
  title,
  hexColors,
  dispatch,
}: RelatedColorPaletteProps) => {
  return (
    <section>
      <h3 className="mb-4">{title}</h3>
      <div className="grid grid-cols-3 gap-2">
        {hexColors.map((hexColor) => {
          return (
            <ColorChangeSwatch
              key={hexColor}
              hexColor={hexColor}
              className="w-full h-full hover:cursor-pointer"
              onClick={() => dispatch({ type: "UPDATE_HEX_COLOR", payload: hexColor })}
            />
          );
        })}
      </div>
    </section>
  );
};

export default RelatedColorPalette;
