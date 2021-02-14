import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
// import ApplicationsReducer from './Store/ApplicationsReducer/applicationsReducer';
// import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import store, {history} from "./Store/configStore";
import axios from './axiosApi';
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const rootReducer = combineReducers({
//   ApplicationPage: ApplicationsReducer
// });

// const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

axios.interceptors.request.use(req => {
    try {
        req.headers['Authorization'] = store.getState().users.user ?  store.getState().users.user.token : ''
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
