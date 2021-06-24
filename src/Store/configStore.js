import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {createBrowserHistory} from 'history';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';


import applicationsReducer from "./ApplicationsReducer/applicationsReducer";
import companyDataReducer from "./CompanyDataReducer/companyDataReducer";
import usersReducer from "./UsersReducer/usersReducer";

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    company: companyDataReducer,
    applications: applicationsReducer,
    users: usersReducer,
    router: connectRouter(history)
});

const middleware = [
    thunkMiddleware,
    routerMiddleware(history)
];

const saveToLocalStorage = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (e) {
        console.log('Error save state');
    }
};

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }

        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
};
const enhancers = composeEnhancers(applyMiddleware(...middleware));
const persistedState = loadFromLocalStorage();

const store = createStore(rootReducer, persistedState, enhancers);

store.subscribe(() => {
    saveToLocalStorage({
        applications: {
                    ...store.getState().applications, data: store.getState().applications.data
                },

        // applications: {
        //             data: {clientId: store.getState().applications.data.clientId, hash:  store.getState().applications.data.hash}
        //         }

        // data: {
        //     ...store.getState().applications.data, clientId: store.getState().applications.data.clientId,
        //     hash: store.getState().applications && store.getState().applications.data.hash
        // }

    })
});

export default store;