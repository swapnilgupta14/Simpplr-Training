import React from 'react';
import ColorChangeSwatch from '../shared/color-change-swatch';
// import { ColorActions } from '../../global';


import { useContext } from 'react';
import { ColorContext } from '../../ColorContext';

type RelatedColorPaletteProps = {
  title: string;
  hexColors: string[];
  // dispatch: React.Dispatch<ColorActions>
};


const RelatedColorPalette = ({
  title,
  hexColors,
  // dispatch,
}: RelatedColorPaletteProps) => {

  const {dispatch} = useContext(ColorContext);

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
