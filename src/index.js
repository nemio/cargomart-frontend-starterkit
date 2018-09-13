// @flow

import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from 'store';

import Root from 'containers/Root';

import reset from 'styles/reset.less';

const rootContainer = document.getElementById('root');

if (rootContainer) {
  ReactDOM.render(<Provider store={ store }>
    <Root />
  </Provider>, rootContainer);
}
