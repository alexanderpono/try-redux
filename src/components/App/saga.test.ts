import { put, call } from 'redux-saga/effects';
import { incrementAsync, delay, loadRed } from './saga';
import { colorLoading, colorLoadOk, setRed, colorLoadErr } from './reducer';
import { fetchRed } from './api';

test('incrementAsync Saga test', () => {
    const gen = incrementAsync();

    expect(gen.next().value).toEqual(call(delay, 1000));
    expect(gen.next().value).toEqual(put({ type: 'INCREMENT' }));
    expect(gen.next()).toEqual({ done: true, value: undefined });
});

describe('loadRed', () => {
    it('dispatches LOADING action when dispatched', () => {
        const gen = loadRed();

        expect(gen.next().value).toEqual(put(colorLoading()));
    });

    it('dispatches COLOR_LOAD_OK action when dispatched and resolved', async () => {
        const gen = loadRed();

        expect(gen.next().value).toEqual(put(colorLoading()));
        expect(gen.next().value).toEqual(call(fetchRed));
        expect(gen.next().value).toEqual(put(colorLoadOk()));
        expect(gen.next().value).toEqual(put(setRed()));
    });

    it('dispatches COLOR_LOAD_ERR action when error occures', async () => {
        const gen = loadRed();

        expect(gen.next().value).toEqual(put(colorLoading()));
        expect(gen.next().value).toEqual(call(fetchRed));
        expect(gen.throw({}).value).toEqual(put(colorLoadErr()));
    });
});
