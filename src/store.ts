import { combineReducers } from 'redux';
// import { configureStore } from '@reduxjs/toolkit';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { reducer as colorReducer } from './components/App/reducer';
import { rootSaga } from './components/App/saga';

export const reducerAll = combineReducers({
    color: colorReducer
});

// export const store = configureStore({
//     reducer: reducerAll
// });
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducerAll, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
