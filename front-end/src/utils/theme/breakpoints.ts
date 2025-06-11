declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    videoSm: true;
    videoLg: true;
  }
}

const breakpoints = {
  values: {
    xs: 0,
    sm: 576,
    videoSm: 720,
    md: 768,
    lg: 992,
    videoLg: 1140,
    xl: 1200,
  },
};

export default breakpoints;
