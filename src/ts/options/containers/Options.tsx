import * as React from 'react';
import styled from 'styled-components';
import Root from '@components/Root';
import IgnoreRules from '@options/IgnoreRules';

class OptionsContainer extends React.Component {

  render() {
    return (
      <Root>
        <OptionsAppContainer>
          <IgnoreRules />
        </OptionsAppContainer>
      </Root>
    );
  }
}

export default OptionsContainer;

const OptionsAppContainer = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 768px;
  background-color: ${p => p.theme.bg};
  color: ${p => p.theme.fg};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;
