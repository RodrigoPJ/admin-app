export type TypeScaleRoleToOptions = typeof typeScaleRoles;
type TypeScaleRole = "display" | "headline" | "title" | "body" | "label";
type TypeScaleRoleOption =
  | "extraSmall"
  | "small"
  | "medium"
  | "large"
  | "extraLarge";
type TypeScaleRoleOptions = Record<
  "fontSize",
  Partial<Record<TypeScaleRoleOption, string>>
>;
type TypeScaleRoles = Record<TypeScaleRole, TypeScaleRoleOptions>;

const PX_PER_REM = 16;

const typeScaleRoles = {
  display: {
    fontSize: {
      medium: `${22 / PX_PER_REM}rem`,
    },
  },
  headline: {
    fontSize: {
      small: `${18 / PX_PER_REM}rem`,
      medium: `${20 / PX_PER_REM}rem`,
      large: `${28 / PX_PER_REM}rem`,
    },
  },
  title: {
    fontSize: {
      small: `${12 / PX_PER_REM}rem`,
      medium: `${14 / PX_PER_REM}rem`,
      large: `${16 / PX_PER_REM}rem`,
    },
  },
  body: {
    fontSize: {
      small: `${12 / PX_PER_REM}rem`,
      medium: `${14 / PX_PER_REM}rem`,
    },
  },
  label: {
    fontSize: {
      extraSmall: `${10 / PX_PER_REM}rem`,
      small: `${11 / PX_PER_REM}rem`,
      medium: `${12 / PX_PER_REM}rem`,
      large: `${14 / PX_PER_REM}rem`,
    },
  },
} satisfies TypeScaleRoles;

export default typeScaleRoles;
