import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@components/styles/GlobalStyle';
import { themes } from '@components/styles/themes';
import themeName from '@components/styles/theme-preference';
interface SizeProps {
  width?: string;
  height?: string;
}
class Root extends React.Component<React.HTMLAttributes<HTMLDivElement> & SizeProps> {
  render() {
    return (
      <ThemeProvider theme={themes[themeName]}>
        <>
          <GlobalStyle width={this.props.width} height={this.props.height} />
          {this.props.children}
        </>
      </ThemeProvider>
    );
  }
}

export default Root;
