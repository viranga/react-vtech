import './polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store, { history } from './store';
import App from './containers/app';
import './index.css';

const target = document.querySelector('#root');

render(
  <Provider store={store}>
      <App history={history}/>
  </Provider>,
  target
)