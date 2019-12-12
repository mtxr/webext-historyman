import baseLog from '@utils/log';
import { combineReducers } from 'redux';
import settings, { IAppSettings } from './settings/reducer';

const log = baseLog.extend('store');

export interface IAppState {
  settings: IAppSettings;
}

export const loadState = async (): Promise<IAppState | undefined> => {
  try {
    const state = await new Promise<IAppState>(res => chrome.storage.sync.get(s => res(s as IAppState)));
    if (state === null) {
      return undefined;
    }
    log('loaded state %O', state);
    return state;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (appState: IAppState) => {
  log('Saving state %O', appState);

  return new Promise(res => {
    chrome.storage.sync.set(appState, res);
  });
};

const reducers = combineReducers<IAppState>({
  settings
});

export default reducers;
