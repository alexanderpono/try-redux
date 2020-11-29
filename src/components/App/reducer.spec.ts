import {
    reducer as colorReducer,
    setBlue,
    setRed,
    colorLoading,
    colorLoadOk,
    colorLoadErr,
    loadBlue
} from './reducer';

describe('colorReducer', () => {
    it('sets color=blue when receives COLOR_BLUE action', () => {
        const blueState = colorReducer(undefined, setBlue());
        expect(blueState.color).toBe('blue');
    });

    it('sets color=red when receives COLOR_RED action', () => {
        const redState = colorReducer(undefined, setRed());
        expect(redState.color).toBe('red');
    });

    it('sets loading=true when receives COLOR_LOADING action', () => {
        const loadingState = colorReducer(undefined, colorLoading());
        expect(loadingState.loading).toBe(true);
    });

    it('sets loading=false when receives COLOR_LOAD_OK action', () => {
        const loadingState = colorReducer(undefined, colorLoading());
        const loadedOkState = colorReducer(loadingState, colorLoadOk());
        expect(loadedOkState.loading).toBe(false);
    });

    it('sets loading=false when receives COLOR_LOAD_ERR action', () => {
        const loadingState = colorReducer(undefined, colorLoading());
        const loadedErrState = colorReducer(loadingState, colorLoadErr());
        expect(loadedErrState.loading).toBe(false);
    });

    it('sets loadedSuccessfully=true when receives COLOR_LOAD_OK action', () => {
        const loadingState = colorReducer(undefined, colorLoading());
        const loadedOkState = colorReducer(loadingState, colorLoadOk());
        expect(loadedOkState.loadedSuccessfully).toBe(true);
    });

    it('sets loadedSuccessfully=false when receives COLOR_LOAD_ERR action', () => {
        const loadingState = colorReducer(undefined, colorLoading());
        const loadedErrState = colorReducer(loadingState, colorLoadErr());
        expect(loadedErrState.loadedSuccessfully).toBe(false);
    });
});

describe('loadBlue', () => {
    it('dispatches LOADING action when dispatched', () => {
        const fetchBlue = jest.fn(() => new Promise(() => null));
        const dispatch = jest.fn();

        const thunk = loadBlue(fetchBlue);
        thunk(dispatch);

        expect(dispatch).toBeCalledTimes(1);
        expect(dispatch).toBeCalledWith({ type: 'COLOR_LOADING' });
    });

    it('dispatches COLOR_LOAD_OK action when dispatched and resolved', async () => {
        const fetchBlue = jest.fn(() => Promise.resolve());
        const dispatch = jest.fn();

        const thunk = loadBlue(fetchBlue);
        await thunk(dispatch);

        expect(dispatch).toBeCalledTimes(3);
        expect(dispatch.mock.calls[0][0]).toEqual({ type: 'COLOR_LOADING' });
        expect(dispatch.mock.calls[1][0]).toEqual({ type: 'COLOR_LOAD_OK' });
        expect(dispatch.mock.calls[2][0]).toEqual({
            type: 'SET_COLOR',
            payload: { color: 'blue' }
        });
    });

    it('dispatches COLOR_LOAD_ERR action when dispatched and rejected', async () => {
        const fetchBlue = jest.fn(() => Promise.reject());
        const dispatch = jest.fn();

        const thunk = loadBlue(fetchBlue);
        await thunk(dispatch);

        expect(dispatch).toBeCalledTimes(2);
        expect(dispatch.mock.calls[0]).toEqual([{ type: 'COLOR_LOADING' }]);
        expect(dispatch.mock.calls[1]).toEqual([{ type: 'COLOR_LOAD_ERR' }]);
    });
});
