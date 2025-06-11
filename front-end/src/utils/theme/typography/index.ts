import { type FontStyle } from "@mui/material/styles/createTypography";
import typeScaleRoles, { type TypeScaleRoleToOptions } from "./typeScaleRoles";

type FontFamily = FontStyle["fontFamily"];
declare module "@mui/material/styles/createTypography" {
  interface FontStyle {
    secondaryFontFamily: FontFamily;
  }
  // eslint-disable-next-line
  interface Typography extends TypeScaleRoleToOptions {}
}

const primaryFontFamily = ['"Instrument Sans"', "sans-serif"].join(",");
const typography = {
  fontFamily: primaryFontFamily,
  button: {
    fontSize: typeScaleRoles.label.fontSize.medium,
    textTransform: "none",
  } as const,
  ...typeScaleRoles,
};

export default typography;
