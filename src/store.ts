import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { reducer as colorReducer } from './components/App/reducer';

export const reducerAll = combineReducers({
    color: colorReducer
});

export const store = configureStore({
    reducer: reducerAll
});
