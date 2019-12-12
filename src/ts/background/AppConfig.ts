import { Store } from 'redux';
import { IAppState } from './store';
import setupListeners from './listeners';

const autoSaveAppState = () => {
  chrome.browserAction.onClicked.addListener(() => {
    chrome.runtime.openOptionsPage();
  });
};

export const configureApp = (store: Store<IAppState>) => {
  autoSaveAppState();
  setupListeners(store);
};
