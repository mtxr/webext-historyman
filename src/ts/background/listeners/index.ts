import { IAppState } from '@bg/store';
import { Store } from 'redux';
import { setupOnVisited } from './on-visited';
import { setupOnVisitRemoved } from './on-visit-removed';

const setupListeners = (store: Store<IAppState>) => {
  setupOnVisited(store);
  setupOnVisitRemoved();
};

export default setupListeners;
