type RGBAColor = `rgba(${number}, ${number}, ${number}, ${number})`;
type BasePalette = Record<string, RGBAColor>;
const basePalette = {
  aqua100: "rgba(19, 192, 194, 1)",
  baseBlack100: "rgba(48, 63, 84, 1)",
  baseBlack30: "rgba(48, 63, 84, 0.3)",
  black30: "rgba(0, 0, 0, 0.3)",
  black15: "rgba(0, 0, 0, 0.15)",
  black10: "rgba(0, 0, 0, 0.10)",
  blue100: "rgba(81, 145, 233, 1)",
  blue15: "rgba(81, 145, 233, 0.15)",
  gray100: "rgba(127, 139, 155, 1)",
  green100: "rgba(73, 172, 0, 1)",
  grey100: "rgba(213, 222, 234, 1)",
  lightBlue100: "rgba(240, 246, 250, 1)",
  lightGray100: "rgba(189, 197, 207, 1)",
  lightGrey100: "rgba(233, 238, 245, 1)",
  orange100: "rgba(238, 173, 7, 1)",
  red100: "rgba(255, 84, 61, 1)",
  white100: "rgba(255, 255, 255, 1)",
} as const satisfies BasePalette;

export default basePalette;
