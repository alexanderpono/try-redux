import { put, call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { incrementAsync, delay, loadRed } from './saga';
import { colorLoading, colorLoadOk, setRed, colorLoadErr, reducer } from './reducer';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

test('incrementAsync Saga test', () => {
    const gen = incrementAsync();

    expect(gen.next().value).toEqual(call(delay, 1000));
    expect(gen.next().value).toEqual(put({ type: 'INCREMENT' }));
    expect(gen.next()).toEqual({ done: true, value: undefined });
});

describe('loadRed', () => {
    const fetchRedFail = () => Promise.reject();

    it('dispatches LOADING action when dispatched', () => {
        const gen = loadRed(fetchRedFail);

        expect(gen.next().value).toEqual(put(colorLoading()));
    });

    it('dispatches-2 LOADING action when dispatched', () => {
        return expectSaga(loadRed, fetchRedFail).withReducer(reducer).put(colorLoading()).run();
    });

    it('dispatches COLOR_LOAD_OK action when dispatched and resolved', async () => {
        const gen = loadRed(fetchRedFail);

        expect(gen.next().value).toEqual(put(colorLoading()));
        expect(gen.next().value).toEqual(call(fetchRedFail));
        expect(gen.next().value).toEqual(put(colorLoadOk()));
        expect(gen.next().value).toEqual(put(setRed()));
    });

    it('dispatches COLOR_LOAD_ERR action when error occures', async () => {
        const gen = loadRed(fetchRedFail);

        expect(gen.next().value).toEqual(put(colorLoading()));
        expect(gen.next().value).toEqual(call(fetchRedFail));
        expect(gen.throw({}).value).toEqual(put(colorLoadErr()));
    });

    it('dispatches-2 COLOR_LOAD_ERR action when error occures in loadRed', async () => {
        return expectSaga(loadRed, fetchRedFail)
            .withReducer(reducer)
            .put(colorLoadErr())
            .hasFinalState({ color: 'grey', loading: false, loadedSuccessfully: false })
            .run();
    });

    it('dispatches COLOR_LOAD_OK action when loadRed returns success', async () => {
        return expectSaga(loadRed, fetchRedFail)
            .withReducer(reducer)
            .provide([[matchers.call.fn(fetchRedFail), { id: 42, name: 'John Doe' }]]) //force success result of call(fetchRedFail)
            .put(colorLoadOk())
            .hasFinalState({ color: 'red', loading: false, loadedSuccessfully: true })
            .run();
    });

    it('dispatches COLOR_LOAD_OK action when error occures in loadRed', async () => {
        const error = new Error('error');

        return expectSaga(loadRed, fetchRedFail)
            .withReducer(reducer)
            .provide([[matchers.call.fn(fetchRedFail), throwError(error)]]) //force throw error in call(fetchRedFail)
            .put(colorLoadErr())
            .hasFinalState({ color: 'grey', loading: false, loadedSuccessfully: false })
            .run();
    });
});
