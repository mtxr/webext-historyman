import * as fromSettingsActions from './actions';

export interface IAppSettings {
  excludeRules: string[];
}

const initialState: IAppSettings = {
  excludeRules: [],
};

const settings = (state = initialState, action: fromSettingsActions.Actions): IAppSettings => {
  switch (action.type) {
    case fromSettingsActions.SET_EXCLUDE_RULES:
      return { ...state, excludeRules: action.payload };
    default:
      return state;
  }
};

export default settings;
