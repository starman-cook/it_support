import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import store, {history} from "./Store/configStore";
import axios from './axiosApi';

axios.interceptors.request.use(req => {
    try {

        req.params.id = store.getState().applications.data ? store.getState().applications.data['clientId'] : '';
        req.params.hash = store.getState().applications.data ? store.getState().applications.data['hash'] : '';
    } catch (err) {
        console.log(err);
    }
    return req;
});


const app = (
  <Provider store={store}>
      <ConnectedRouter history={history}>
            <App/>
      </ConnectedRouter>
  </Provider>
)

ReactDOM.render(app,
  document.getElementById('root')
);

reportWebVitals();
