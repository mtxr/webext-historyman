import styled from 'styled-components';

export default styled.section`
  padding: 1rem;
  border-bottom: ${p => p.theme.fieldBorder};

  > label {
    padding-bottom: 1rem;
    display: block;
    font-weight: bold;
    font-size: 1.1rem;
    & + small {
      padding-bottom: 1rem;
      display: block;
      font-style: italic;
    }
  }

  > button {
    float: right;
  }
`;
