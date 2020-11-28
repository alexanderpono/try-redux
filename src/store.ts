import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from 'redux';
// import { configureStore } from '@reduxjs/toolkit';
import { createStore, applyMiddleware, compose, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';

import {
    reducer as colorReducer,
    ColorState,
    defaultState as colorDefaultState,
    ColorAction
} from './components/App/reducer';
import { rootSaga } from './components/App/saga';

export const reducerAll = combineReducers({
    color: colorReducer
});

export interface AppState {
    color: ColorState;
}

export const defaultState: AppState = {
    color: colorDefaultState
};

export let store: Store;

export type AsyncDispatch = (action: ColorAction | AsyncAction) => void;

type AsyncAction = (dispatch: AsyncDispatch, getState: () => AppState) => void;

export const dispatch = (action: ColorAction | AsyncAction) => {
    if (typeof action === 'function') {
        action(dispatch, store.getState);
        return;
    }
    store.dispatch(action);
};

const sagaMiddleware = createSagaMiddleware();
if (Object.keys(window).indexOf('__REDUX_DEVTOOLS_EXTENSION__') > 0) {
    store = createStore(
        reducerAll,
        compose(applyMiddleware(sagaMiddleware), composeWithDevTools())
    );
} else {
    store = createStore(reducerAll, applyMiddleware(sagaMiddleware));
}
sagaMiddleware.run(rootSaga);
