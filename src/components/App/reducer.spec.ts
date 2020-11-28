import {
    reducer as colorReducer,
    setBlue,
    setRed,
    colorLoading,
    colorLoadOk,
    colorLoadErr
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
