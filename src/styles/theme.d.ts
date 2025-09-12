import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      mutedText: string;
      primary: string;
      neutral: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
      inputBackground: string;
      borderDark: string;
      borderLight: string;
      chipBackground: string;
      chipHover: string;
    };
  }

  interface PaletteOptions {
    custom?: {
      mutedText?: string;
      primary?: string;
      neutral?: {
        50?: string;
        100?: string;
        200?: string;
        300?: string;
        400?: string;
        500?: string;
        600?: string;
        700?: string;
        800?: string;
        900?: string;
      };
      inputBackground?: string;
      borderDark?: string;
      borderLight?: string;
      chipBackground?: string;
      chipHover?: string;
    };
  }
}
