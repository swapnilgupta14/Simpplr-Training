export type State= {
  hexColor: string;
};

export type ActionUnion = HexColorAction | RGBColorAction | CMYKColorAction | HSLColorAction | HSVColorAction;

export type HexColorAction = {
  type: 'UPDATE_HEX_COLOR';
  payload: string;
};

export type RGBColorAction = {
  type: 'SET_RGB_COLOR';
  payload: {
    rgb: [r: number, g: number, b: number];
  };
};

export type HSLColorAction = {
  type: 'SET_HSL_COLOR';
  payload: { hsl: [h: number, s: number, l: number];};
};

export type HSVColorAction = {
  type: 'SET_HSV_COLOR';
  payload: {
    hsv: [h: number, s: number, v: number];
  };
};

export type CMYKColorAction = {
  type: 'SET_CMYK_COLOR';
  payload: { cmyk: [c: number, m: number, y: number, k: number];};
};

export type AddSavedColorState = {
  savedColorName: string;
  error: string | null;
};

export type SavedColorActionType = { type: 'SET_COLOR_NAME'; payload: string }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'RESET' };