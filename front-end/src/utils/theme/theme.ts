import type {} from "@mui/material/themeCssVarsAugmentation";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import components from "./components.tsx";
import palette from "./colors/scheme/light/palette.ts";
import typography from "./typography/index.ts";
import shadows from "./shadows.ts";
import breakpoints from "./breakpoints.ts";

// /* Temporary augmentation to enable hints
// when using callbacks involving the experimental theme */
// declare module "@mui/material/styles" {
//   interface Theme {
//     vars: ThemeVars;
//   }
// }


export type MUITheme = typeof theme;

let theme = createTheme({
  cssVariables: true,
  components,
  colorSchemes: {
    light: {
      palette,
    },
  },
  typography,
  shadows,
  breakpoints,
});

theme = responsiveFontSizes(theme, { factor: 2 }) as MUITheme;

export default theme;
