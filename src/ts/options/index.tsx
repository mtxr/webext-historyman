import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'webext-redux';
import OptionsContainer from './containers/Options';

const store = new Store();

store.ready().then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <OptionsContainer />
    </Provider>
    , document.getElementById('options-root'));
});
