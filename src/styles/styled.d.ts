import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      fg: string;
      bg: string;
      primary: string;
      primaryAcc: string;
      secondary: string;
      secondaryAcc: string;
    };
  }
}
