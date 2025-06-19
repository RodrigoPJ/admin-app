import { createTheme, type Shadows } from "@mui/material/styles";
import colorRoles from "./colors/scheme/light/colorRoles";

const { shadows: initShadows } = createTheme();

const shadows = [
  "none",
  `15px 0px 25px 10px ${colorRoles.shadow.dim}`,
  `inset 0px -3px 4px ${colorRoles.shadow.main}`,
  `0px 0px 4px 0px ${colorRoles.shadow.main}`,
  `0px 0px 10px 0px ${colorRoles.shadow.main}`,
  `0px 5px 10px 0px ${colorRoles.shadow.dim}`,
  ...initShadows.slice(6),
] as Shadows;

export default shadows;
