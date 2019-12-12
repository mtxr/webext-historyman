import * as React from 'react';
import styled from 'styled-components';
import Root from '@components/Root';

class PopupApp extends React.Component {

  render() {
    return (
      <Root>
        <PopupAppContainer>
        </PopupAppContainer>
      </Root>
    );
  }
}

export default PopupApp;

const PopupAppContainer = styled.div`
  display: flex;
`;
