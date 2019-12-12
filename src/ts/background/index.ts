import { createStore, applyMiddleware, Middleware } from 'redux';
import { wrapStore } from 'webext-redux';
import { configureApp } from './AppConfig';
import reducers, { loadState, saveState } from './store';

const saveStateMiddleware: Middleware = store => next => action => {
  const result = next(action);
  saveState(store.getState());
  return result;
};

loadState().then(state => {
  const store = createStore(reducers, state, applyMiddleware(saveStateMiddleware));

  configureApp(store);
  wrapStore(store);
});
