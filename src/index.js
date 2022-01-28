import '@scss/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import allRedusers from './reducers';
import App from './components/App';
import {globalConst} from './global-const';

const store = createStore(allRedusers, { appActive: {tab: globalConst.START_ACTIVE_TAB, examMode: globalConst.START_ACTIVE_EXAMODE} });

const foo = bar => console.log('some...', bar);
foo('bar');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
