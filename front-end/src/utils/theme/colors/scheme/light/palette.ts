import { type PaletteOptions } from "@mui/material/styles/createPalette";
import basePalette from "./basePalette";
import colorRoles, { type ColorRoleToOptions } from "./colorRoles";

declare module "@mui/material/styles/createPalette" {
  interface CommonColors {
    aqua: string;
  }
  // eslint-disable-next-line
  interface Palette extends ColorRoleToOptions {}
  // eslint-disable-next-line
  interface PaletteOptions extends Partial<ColorRoleToOptions> {}
}

const palette = {
  common: {
    aqua: basePalette.aqua100,
  },
  warning: {
    main: basePalette.orange100,
    contrastText: basePalette.white100,
  },
  success: {
    main: basePalette.green100,
    contrastText: basePalette.white100,
  },
  text: {
    primary: colorRoles.onSurface.main,
    secondary: colorRoles.onSurfaceVariant.main,
  },
  divider: colorRoles.outlineVariant.main,
  background: {
    paper: colorRoles.surfaceContainer.main,
    default: colorRoles.surfaceContainer.main,
  },
  action: {
    hover: colorRoles.onSurface.dim,
    hoverOpacity: 0.08,
  },
  ...colorRoles,
} satisfies PaletteOptions;

export default palette;
