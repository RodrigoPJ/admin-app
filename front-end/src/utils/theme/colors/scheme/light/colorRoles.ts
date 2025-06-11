import { type SimplePaletteColorOptions } from "@mui/material";
import basePalette from "./basePalette";

export type ColorRoleToOptions = typeof colorRoles;
export type ColorRole =
  | "primary"
  | "onPrimary"
  | "error"
  | "onError"
  | "surface"
  | "onSurface"
  | "onSurfaceVariant"
  | "surfaceContainer"
  | "surfaceContainerHigh"
  | "outline"
  | "outlineVariant"
  | "scrim"
  | "shadow";

export type ColorRoleExtraOption = "dim" | "dimmer" | "augmented";
type ExtraOptions = Partial<Record<ColorRoleExtraOption, string>>;
type ColorRoles = Record<ColorRole, SimplePaletteColorOptions & ExtraOptions>;

const colorRoles = {
  primary: {
    main: basePalette.blue100,
    contrastText: basePalette.white100,
  },
  onPrimary: {
    main: basePalette.white100,
  },
  error: {
    main: basePalette.red100,
    contrastText: basePalette.white100,
  },
  onError: {
    main: basePalette.white100,
  },
  surface: {
    main: basePalette.lightBlue100,
  },
  onSurface: {
    main: basePalette.baseBlack100,
    dim: basePalette.baseBlack30,
  },
  onSurfaceVariant: {
    main: basePalette.gray100,
    light: basePalette.lightGray100,
  },
  surfaceContainer: {
    main: basePalette.white100,
  },
  surfaceContainerHigh: {
    main: basePalette.blue15,
  },
  outline: {
    main: basePalette.grey100,
  },
  outlineVariant: {
    main: basePalette.lightGrey100,
  },
  scrim: {
    main: basePalette.black30,
  },
  shadow: {
    main: basePalette.black15,
    dim: basePalette.black10,
  },
} satisfies ColorRoles;

export default colorRoles;
