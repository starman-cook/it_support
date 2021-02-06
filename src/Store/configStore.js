import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {createBrowserHistory} from 'history';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';


import applicationsReducer from "./ApplicationsReducer/applicationsReducer";

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    applications: applicationsReducer,
    router: connectRouter(history)
});

const middleware = [
    thunkMiddleware,
    routerMiddleware(history)
];

// const saveToLocalStorage = state => {
//     try {
//         const serializedState = JSON.stringify(state);
//         localStorage.setItem('state', serializedState);
//     } catch (e) {
//         console.log('Error save state');
//     }
// };

// const loadFromLocalStorage = () => {
//     try {
//         const serializedState = localStorage.getItem('state');
//         if (serializedState === null) {
//             return undefined;
//         }
//
//         return JSON.parse(serializedState);
//     } catch (e) {
//         return undefined;
//     }
// };
const enhancers = composeEnhancers(applyMiddleware(...middleware));
// const persistedState = loadFromLocalStorage();

const store = createStore(rootReducer, enhancers);

// store.subscribe(() => {
//     saveToLocalStorage({
//         users: {
//             user: store.getState().users.user
//         }
//     })
// });

export default store;