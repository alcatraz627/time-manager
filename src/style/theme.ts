"use client";
import { Palette, PaletteOptions, alpha, createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { TypographyOptions } from "@mui/material/styles/createTypography";
import { textFont, titleFont } from "./font";

// https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
//
// Required to adding new variants/colors to MUI v5 when using typescript
// https://mui.com/material-ui/customization/theming/#typescript
declare module "@mui/material/styles" {
  // https://mui.com/material-ui/customization/palette/#adding-new-colors
  interface Palette {
    textPrimary: Palette["primary"];
    textSecondary: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    textPrimary?: PaletteOptions["primary"];
    textSecondary?: PaletteOptions["primary"];
  }

  // https://mui.com/material-ui/customization/typography/#variants
  interface TypographyVariants {
    highlight1: React.CSSProperties;
    highlight2: React.CSSProperties;
    // appTitle: React.CSSProperties;
    // breadcrumb: React.CSSProperties;
    // inlineLabel: React.CSSProperties;
    // inlineLabelOptional: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    highlight1?: React.CSSProperties;
    highlight2?: React.CSSProperties;
    // appTitle?: React.CSSProperties;
    // breadcrumb?: React.CSSProperties;
    // inlineLabel?: React.CSSProperties;
    // inlineLabelOptional?: React.CSSProperties;
    // inputLabel?: React.CSSProperties;
  }
}

// Update the Button's color prop options
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    textPrimary: true;
    textSecondary: true;
  }
}

// Update the SvgIcon's color prop options
declare module "@mui/material/SvgIcon" {
  interface SvgIconPropsColorOverrides {
    textPrimary: true;
    textSecondary: true;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    highlight1: true;
    highlight2: true;
    // appTitle: true;
    // breadcrumb: true;
    // inlineLabel: true;
    // inlineLabelOptional: true;
    // inputLabel: true;
  }
}

const palette: PaletteOptions = {
  primary: {
    main: "#1565c0",
  },
  secondary: {
    main: "#009688",
  },
  error: {
    main: "#ff5722",
  },
  background: {
    default: "#fff",
  },
  textPrimary: {
    main: grey[900],
  },
  textSecondary: {
    main: grey[600],
  },
};

const typography: (p: Palette) => TypographyOptions = (paletteArg) => ({
  fontFamily: textFont.style.fontFamily,
  allVariants: {
    letterSpacing: 1,
  },
  h1: {
    fontSize: "4.5rem",
    fontWeight: 300,
    lineHeight: 1.167,
    letterSpacing: "-0.01562em",
    color: grey[800],
    fontFamily: titleFont.style.fontFamily,
  },
  h2: {
    fontSize: "3.75rem",
    fontWeight: 300,
    lineHeight: 1.2,
    letterSpacing: "-0.00833em",
    color: grey[800],
    fontFamily: titleFont.style.fontFamily,
  },
  h3: {
    fontSize: "3rem",
    fontWeight: 300,
    lineHeight: 1.167,
    letterSpacing: "0em",
    color: grey[800],
    fontFamily: titleFont.style.fontFamily,
  },
  h4: {
    fontSize: "2.125rem",
    fontWeight: 400,
    lineHeight: 1.235,
    letterSpacing: "0.00735em",
    color: grey[900],
    fontFamily: titleFont.style.fontFamily,
  },
  h5: {
    fontSize: "1.5rem",
    fontWeight: 400,
    lineHeight: 1.334,
    letterSpacing: "0em",
    color: grey[900],
    fontFamily: titleFont.style.fontFamily,
  },
  h6: {
    fontSize: "1.25rem",
    fontWeight: 500,
    lineHeight: 1.6,
    letterSpacing: "0.0075em",
    color: grey[500],
    fontFamily: titleFont.style.fontFamily,
  },
  subtitle1: {
    fontSize: "1.2rem",
    fontWeight: 400,
    lineHeight: 1.75,
    letterSpacing: "0.00938em",
    color: grey[600],
  },
  subtitle2: {
    fontSize: "0.95rem",
    fontWeight: 500,
    lineHeight: 1.57,
    letterSpacing: "0.00714em",
    color: grey[500],
  },
  body1: {
    fontSize: "1.1rem",
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "0.00938em",
  },
  highlight1: {
    fontSize: "1.1rem",
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "0.00938em",
    color: paletteArg.warning.main,
    backgroundColor: alpha(paletteArg.secondary.main, 0.1),
  },
  body2: {
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: 1.43,
    letterSpacing: "0.01071em",
  },
  highlight2: {
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: 1.43,
    letterSpacing: "0.01071em",
    color: paletteArg.warning.main,
    backgroundColor: alpha(paletteArg.secondary.main, 0.1),
  },
  button: {
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: 1.75,
    letterSpacing: "0.02857em",
    textTransform: "uppercase",
  },
  caption: {
    fontSize: "0.75rem",
    fontWeight: 400,
    lineHeight: 1.66,
    letterSpacing: "0.03333em",
  },
  overline: {
    fontSize: "0.75rem",
    fontWeight: 400,
    lineHeight: 2.66,
    letterSpacing: "0.08333em",
    textTransform: "uppercase",
  },
});

export const theme = createTheme({
  typography,
  palette,
  components: {
    // MuiInputBase: {
    //   styleOverrides: {
    //     root: {
    //       borderRadius: "16px!important",
    //     },
    //   },
    // },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          boxShadow: "none",
          borderRadius: 8,
          ":hover": {
            boxShadow: "none",
          },
        },
      },
    },
  },
});
