import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import { IAppState } from '@bg/store';
import { IAppSettings, SettingsActions } from '@bg/store/settings';
import idx from 'idx.macro';
import Section from '@components/Section';
import Close from '@svg/Close';
import Add from '@svg/Add';

interface IIgnoreRules {
  excludeRules: IAppSettings['excludeRules'];
  dispatch: Dispatch;
}

class IgnoreRules extends React.Component<IIgnoreRules> {
  onChange = (index: number, value: string) => {
    const { excludeRules } = this.props;
    excludeRules[index] = value;
    this.props.dispatch(SettingsActions.setExcludeRules([...excludeRules]));
  }

  removeRule = (index: number) => {
    const { excludeRules } = this.props;
    this.props.dispatch(SettingsActions.setExcludeRules(excludeRules.filter((_, i) => i !== index)));
  }

  addRule = () => {
    const { excludeRules } = this.props;
    excludeRules.push('');
    this.props.dispatch(SettingsActions.setExcludeRules([...excludeRules]));
  }

  render() {
    return (
      <Section>
        <label>Ignore Rules</label>
        <small>You can add * wildcard to match anything. Eg: *.netflix, *.youtube.</small>
        <Rules>
          {this.props.excludeRules.map((rule, index) => (
            <li key={index}>
              <input defaultValue={rule} onChange={e => this.onChange(index, e.target.value)} />
              <Close onClick={() => this.removeRule(index)} />
            </li>
          ))}
        </Rules>
        <Button bg="#3689b6" onClick={this.addRule}><Add /></Button>
      </Section>
    );
  }
}

const mapStateToProps = (state: IAppState) => {
  return {
    excludeRules: idx(state, _ => _.settings.excludeRules) || [],
  };
};

export default connect(mapStateToProps)(IgnoreRules);

const Rules = styled.ul`
  list-style: none;
  margin: 0;
  margin-bottom: 1rem;
  padding: 0;
  border-radius: ${p => p.theme.fieldRadius};
  overflow: hidden;
  border: ${p => p.theme.fieldBorder};
  li {
    &:first-child {
      border-top: none;
    }
    display: flex;
    border-top: ${p => p.theme.fieldBorder};
    overflow: hidden;
    background: ${p => p.theme.fieldBg};
    input {
      flex-grow: 1;
      border: none;
      padding: 0.5rem 1rem;
      background: transparent;
    }
    svg {
      width: 1rem;
      height: 1rem;
      padding: 0.5rem;
      margin: auto;
      cursor: pointer;
    }
  }
`;

const Button = styled.button<{ bg?: string }>`
  cursor: pointer;
  background: ${p => p.bg || p.theme.fieldBg};
  border: none;
  padding: 0.25rem 1rem;
  border-radius: ${p => p.theme.fieldRadius};
`;
