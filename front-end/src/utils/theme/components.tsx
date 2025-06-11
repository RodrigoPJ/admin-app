import {
  type Components,
  backdropClasses,
  chipClasses,
  outlinedInputClasses,
  svgIconClasses,
} from "@mui/material";
import { type MUITheme } from "./theme";
import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from "react-router";
import { type LinkProps } from "@mui/material/Link";
import { forwardRef } from "react";

const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;
  return <RouterLink ref={ref} to={href} {...other} />;
});

const MuiLink: Components<MUITheme>["MuiLink"] = {
  defaultProps: {
    component: LinkBehavior,
  } as LinkProps,
  styleOverrides: {
    root: ({ theme }) => ({
      fontSize: theme.typography.label.fontSize.large,
      textDecoration: "none",
    }),
  },
};

const MuiDialog: Components<MUITheme>["MuiDialog"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      [`& .${backdropClasses.root}`]: {
        backgroundColor: theme.vars.palette.scrim.main,
      },
    }),
  },
};

declare module "@mui/material/Button" {
  interface ButtonOwnProps {
    relief?: boolean;
  }
}

const MuiButtonBase: Components<MUITheme>["MuiButtonBase"] = {
  defaultProps: {
    disableRipple: true,
    disableTouchRipple: true,
  },
};

const MuiButton: Components<MUITheme>["MuiButton"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: `${theme.shape.borderRadius * 2}px`,
      fontSize: `${theme.typography.label.fontSize.large}`,
      height: "34px",
      variants: [
        {
          props: { variant: "contained", relief: true },
          style: {
            background:
              "linear-gradient(180deg, #5191E9 0%, #5191E9 69.55%, #4C81CA 100%)",
            boxShadow: theme.shadows[2],
            transition: "background 0s",
            [`&:hover`]: {
              background: "#70A6F1",
              boxShadow: theme.shadows[2],
            },
          },
        },
        {
          props: { variant: "outlined", relief: true },
          style: {
            boxShadow: theme.shadows[2],
            transition: "background 0s",
            [`&:hover`]: {
              boxShadow: theme.shadows[2],
            },
          },
        },
      ],
    }),
  },
  defaultProps: {
    disableElevation: true,
  },
};
/*
variant="outlined"
          color="primary"
          size="small"
          sx={{
            borderRadius: 1.5,
            bgcolor: "surfaceContainer.main",
            fontSize: "label.fontSize.medium",
            lineHeight: 1.1,
            py: 0.5,
            [`& .${chipClasses.label}`]: {
              px: 1,
            },
          }}

*/
const MuiCheckbox: Components<MUITheme>["MuiCheckbox"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      [`& .${svgIconClasses.root}`]: {
        fontSize: 16,
      },
      [`&.Mui-checked .${svgIconClasses.root}`]: {
        color: theme.vars.palette.primary.main,
      },
    }),
  },
};
const MuiChip: Components<MUITheme>["MuiChip"] = {
  defaultProps: {
    variant: "outlined",
    color: "primary",
    size: "small",
  },
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor: theme.vars.palette.surfaceContainer.main,
      borderRadius: `${theme.shape.borderRadius * 1.5}px`,
      fontSize: theme.typography.label.fontSize.medium,
      lineHeight: 1.1,
      padding: theme.spacing(0.5, 0),
      [`& .${chipClasses.label}`]: {
        padding: theme.spacing(0, 1),
      },
    }),
  },
};

declare module "@mui/material/IconButton" {
  interface IconButtonOwnProps {
    isActive?: boolean;
  }
}
const MuiIconButton: Components<MUITheme>["MuiIconButton"] = {
  variants: [
    {
      props: { isActive: true },
      style: ({ theme }) => ({
        backgroundColor: theme.vars.palette.surfaceContainerHigh.main,
        [`& .${svgIconClasses.root}`]: {
          color: theme.vars.palette.primary.main,
        },
        [`&:hover .${svgIconClasses.root}`]: {
          color: theme.vars.palette.primary.main,
        },
        "&:hover": {
          backgroundColor:
            "rgba(var(--mui-palette-primary-mainChannel) / calc(var(--mui-palette-action-activatedOpacity) + var(--mui-palette-action-focusOpacity)))",
        },
      }),
    },
  ],
};

const MuiSvgIcon: Components<MUITheme>["MuiSvgIcon"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.vars.palette.onSurfaceVariant.light,
      width: 16,
      height: 16,
    }),
  },
};

const MuiPaper: Components<MUITheme>["MuiPaper"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: `${theme.shape.borderRadius * 2}px`,
    }),
  },
};

const MuiInputBase: Components<MUITheme>["MuiInputBase"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: `${theme.shape.borderRadius * 2}px`,
      fontSize: theme.typography.body.fontSize.medium,
      height: "34px",
      padding: "0px",
    }),
  },
};
const MuiPagination: Components<MUITheme>["MuiPagination"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      "& .MuiPaginationItem-root": {
        minWidth: "28px",
        height: "28px",
        border: "1px solid",
        borderColor: theme.vars.palette.primary.main,
        borderRadius: theme.shape.borderRadius * 2,
        backgroundColor: theme.vars.palette.surfaceContainer.main,
        color: theme.vars.palette.primary.main,
        fontSize: theme.typography.label.fontSize.medium,
        fontWeight: theme.typography.fontWeightMedium,
      },
      "& .Mui-selected": {
        borderColor: theme.vars.palette.primary.main,
        backgroundColor: theme.vars.palette.surface.main,
        color: theme.vars.palette.primary.main,
      },
    }),
  },
};

const MuiSelect: Components<MUITheme>["MuiSelect"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      [`& .${outlinedInputClasses.notchedOutline}`]: {
        borderRadius: `${theme.shape.borderRadius * 2}px`,
        borderColor: theme.vars.palette.outline.main,
      },
      [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
        borderColor: theme.vars.palette.onSurfaceVariant.light,
      },
      [`&.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
        {
          border: `1px solid ${theme.vars.palette.onSurfaceVariant.main}`,
          boxShadow:
            "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
        },

      [`& .${outlinedInputClasses.root}.Mui-error`]: {
        [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: theme.vars.palette.error.dark,
        },
        [`&.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
          {
            border: `1px solid ${theme.vars.palette.error.main}`,
          },
      },
    }),
  },
};
const MuiTextField: Components<MUITheme>["MuiTextField"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      "& input:-webkit-autofill": {
        boxSizing: "border-box",
        "-webkit-text-fill-color": theme.vars.palette.onSurface.main,
        "-webkit-box-shadow": `0 0 0px 1000px ${theme.vars.palette.surfaceContainer.main} inset`,
      },
      "& input:-webkit-autofill:hover": {
        boxSizing: "border-box",
        "-webkit-text-fill-color": theme.vars.palette.onSurface.main,
        "-webkit-box-shadow": `0 0 0px 1000px ${theme.vars.palette.surfaceContainer.main} inset`,
      },
      "& input:-webkit-autofill:focus": {
        boxSizing: "border-box",
        "-webkit-text-fill-color": theme.vars.palette.onSurface.main,
        "-webkit-box-shadow": `0 0 0px 1000px ${theme.vars.palette.surfaceContainer.main} inset`,
      },
      "& .MuiFormHelperText-root": {
        marginLeft: 0,
      },
      [`& .${outlinedInputClasses.root}`]: {
        [`& .${outlinedInputClasses.notchedOutline}`]: {
          borderRadius: `${theme.shape.borderRadius * 2}px`,
          borderColor: theme.vars.palette.outline.main,
        },
        [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: theme.vars.palette.onSurfaceVariant.light,
        },
        [`&.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
          {
            border: `1px solid ${theme.vars.palette.onSurfaceVariant.main}`,
            boxShadow:
              "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
          },
      },
      [`& .${outlinedInputClasses.root}.Mui-error`]: {
        [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: theme.vars.palette.error.dark,
        },
        [`&.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
          {
            border: `1px solid ${theme.vars.palette.error.main}`,
          },
      },
    }),
  },
};

export default {
  MuiLink,
  MuiCheckbox,
  MuiChip,
  MuiDialog,
  MuiButtonBase,
  MuiButton,
  MuiPaper,
  MuiTextField,
  MuiInputBase,
  MuiPagination,
  MuiSelect,
  MuiSvgIcon,
  MuiIconButton,
};
