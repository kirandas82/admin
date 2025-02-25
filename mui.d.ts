import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'] | any;
    white?: any;
    offWhite?: any;
  }
  interface PaletteOptions {
    neutral: PaletteOptions['primary'] | any;
  }
  interface PaletteColor {
    normal?: any;
  }
  interface SimplePaletteColorOptions {
    normal?: any;
  }
  interface PaletteOptions {
    green?: PaletteColorOptions | any;    // custome createTheme palette
    neutral?: PaletteColorOptions | any;
    white?: PaletteColorOptions | any;
    offWhite?: PaletteColorOptions | any;
  }
}
