import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from 'redux';
// import { configureStore } from '@reduxjs/toolkit';
import { createStore, applyMiddleware, compose, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { reducer as colorReducer } from './components/App/reducer';
import { rootSaga } from './components/App/saga';

export const reducerAll = combineReducers({
    color: colorReducer
});

const sagaMiddleware = createSagaMiddleware();

export let store: Store;
if (Object.keys(window).indexOf('__REDUX_DEVTOOLS_EXTENSION__') > 0) {
    store = createStore(
        reducerAll,
        compose(applyMiddleware(sagaMiddleware), composeWithDevTools())
    );
} else {
    store = createStore(reducerAll, applyMiddleware(sagaMiddleware));
}
sagaMiddleware.run(rootSaga);
