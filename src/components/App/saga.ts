import { put, takeEvery, all, call } from 'redux-saga/effects';
import { colorLoading, colorLoadOk, setRed, colorLoadErr } from './reducer';
import { fetchRedErr } from './api';

export function* helloSaga() {
    console.log('Hello Sagas!');
}

export const delay = (ms: number) => new Promise((res: Function) => setTimeout(res, ms));

// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
    yield call(delay, 1000);
    yield put({ type: 'INCREMENT' });
}

// // Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}

export function* loadRed(fetchRed: () => Promise<void>) {
    yield put(colorLoading());
    try {
        yield call(fetchRed);
        yield put(colorLoadOk());
        yield put(setRed());
    } catch (e) {
        yield put(colorLoadErr());
    }
}

export function* watchLoadRed() {
    yield takeEvery('LOAD_RED', loadRed, fetchRedErr);
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export function* rootSaga() {
    yield all([helloSaga(), watchIncrementAsync(), watchLoadRed()]);
}
