import 'styled-components';
import { lighten, darken } from 'polished';
import { LIGHT_THEME, DARK_THEME } from '@components/styles/theme-preference';

interface BaseTheme {
  rootBg: string;
  bg: string;
  fg: string;
}

declare module 'styled-components' {
  export interface DefaultTheme extends BaseTheme {
    fieldBorder: string;
    fieldBg: string;
    fieldRadius: string;
    [id: string]: any;
  }
}

import { DefaultTheme } from 'styled-components';

const baseTheme = (def: BaseTheme, colorFn = lighten): DefaultTheme => ({
  fieldRadius: '0.25rem',

  fieldBorder: `1px solid ${colorFn(0.2, def.bg)}`,
  fieldBg: lighten(0.15, def.bg),
  ...def
});

export const lightTheme = baseTheme({
  rootBg: '#eaeaea',
  fg: '#181818',
  bg: darken(0.1, '#eaeaea'),
}, darken);

export const darkTheme = baseTheme({
  rootBg: '#181818',
  fg: '#eaeaea',
  bg: lighten(0.1, '#181818'),
}, lighten);

export const themes: { [id: string]: DefaultTheme } = {
  [LIGHT_THEME]: lightTheme,
  [DARK_THEME]: darkTheme,
};
