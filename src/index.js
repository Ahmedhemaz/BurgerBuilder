import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import BurgerBuilder from './store/reducers/burgerBuilder';
import Orders from './store/reducers/order';
import auth from './store/reducers/auth';
const rootReducer = combineReducers({
  burgerBuilder: BurgerBuilder,
  ordersState: Orders,
  auth
});

const logger = store => {
  return next => {
    return action => {
      console.log('[Middleware Dispatching]', action);
      next(action);
      console.log('[Middleware next state]', store.getState());
    }
  }
}

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
