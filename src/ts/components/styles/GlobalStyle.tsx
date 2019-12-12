import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle<{ width?: string; height?: string }>`
  body, html {
    box-sizing: border-box;
    display: block;
    margin: 0;
    padding: 0;
    background: ${p => p.theme.rootBg};
    height: ${p => p.height};
    width: ${p => p.width};
    font-size: 1rem;
  }

  * {
    color: ${p => p.theme.fg};
    fill: currentColor;
  }
`;

export default GlobalStyle;
