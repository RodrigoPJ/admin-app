import { styled, useThemeProps } from "@mui/material/styles";
import { forwardRef, type ReactNode } from "react";
import theme from "../../theme";
import { Typography } from "@mui/material";
import { type CallOutcome } from "../../../types/component-types";

interface TagProps {
  variant?: keyof typeof VARIANT_TO_BACKGROUND_COLOR;
  children: ReactNode;
}

interface TagOwnerState extends TagProps {
  variant: TagProps["variant"];
}

export const CALL_STATUS_TO_TAG_PROPS = {
  scheduled: { text: "Scheduled", variant: "cyan" },
  rescheduled: { text: "Rescheduled", variant: "dodger" },
  cancellation: { text: "Cancellation", variant: "purple" },
  "not-available": { text: "Not Available", variant: "wine" },
  "handled-by-agent": { text: "Handled\nby Agent", variant: "gray" },
} as const satisfies Record<CallOutcome, { text: string; variant: string }>;
const VARIANT_TO_BACKGROUND_COLOR = {
  success: theme.vars.palette.success.main,
  warning: theme.vars.palette.warning.main,
  error: theme.vars.palette.error.main,
  lacklustre: theme.vars.palette.onSurfaceVariant.main,
  icy: theme.vars.palette.common.aqua,
  forest: "forestgreen",
  lime: "limegreen",
  peachPuff: "sandybrown",
  orange: "orange",
  orangeRed: "hsl(9, 100%, 72%)",
  cyan: "hsl(181.76470588235293, 87.93103448275862%, 54.509803921568626%)",
  dodger: "dodgerblue",
  purple: "purple",
  wine: "crimson",
  gray: "hsl(0, 0%, 73.33333333333333%)",
};
const TagRoot = styled("div", {
  // shouldForwardProp: (prop) =>
  //   prop !== "color" && prop !== "variant" && prop !== "sx",
  name: "MuiTag",
  slot: "root",
})<{ ownerState: TagOwnerState }>(({ theme, ownerState }) => {
  return {
    padding: theme.spacing(0.25, 0.75),
    width: "max-content",
    borderRadius: `${theme.shape.borderRadius}px`,
    backgroundColor: ownerState.variant
      ? VARIANT_TO_BACKGROUND_COLOR[ownerState.variant]
      : undefined,
  };
});

const TagText = styled(Typography, {
  name: "MuiTag",
  slot: "text",
})<{ ownerState: TagOwnerState }>(({ theme }) => {
  return {
    // lineHeight: "0",
    color: theme.vars.palette.common.white,
    fontSize: theme.typography.label.fontSize.medium,
    fontWeight: 500,
    whiteSpace: "pre",
    lineHeight: 1.1,
  };
});

const Tag = forwardRef<HTMLDivElement, TagProps>(function Tag(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: "MuiTag" });
  const { variant, ...other } = props;
  const ownerState = { ...props, variant };
  return (
    <TagRoot ref={ref} ownerState={ownerState} {...other}>
      <TagText ownerState={ownerState}>{props.children}</TagText>
    </TagRoot>
  );
});

export default Tag;
