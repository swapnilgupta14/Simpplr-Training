
import { State, ActionUnion } from "../global";
import { cmyk, hsl, hsv, rgb } from 'color-convert';

export const reducerFunction = (state: State , action: ActionUnion) => {
    switch (action.type) {
        case "UPDATE_HEX_COLOR":
            return { ...state, hexColor: action.payload };
        case "SET_RGB_COLOR":
            const rgbColor = action.payload.rgb;
            return { ...state, hexColor: `#${rgb.hex(rgbColor)}` };
        case "SET_HSL_COLOR":
            const hslColor = action.payload.hsl;
            return { ...state, hexColor: `#${hsl.hex(hslColor)}` };
        case "SET_HSV_COLOR":
            const hsvColor = action.payload.hsv;
            return { ...state, hexColor: `#${hsv.hex(hsvColor)}` };
        case "SET_CMYK_COLOR":
            const cmykColor = action.payload.cmyk;
            return { ...state, hexColor: `#${cmyk.hex(cmykColor)}` };
        default:
            return state;
    }
};