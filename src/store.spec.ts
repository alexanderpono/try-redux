import { reducerAll } from './store';
import { actions } from './components/App/reducer';

describe('reducerAll', () => {
    it('sets color=blue when receives COLOR_BLUE action', () => {
        const blueState = reducerAll(undefined, actions.setBlue());
        expect(blueState).toEqual({
            color: { color: 'blue', loading: false, loadedSuccessfully: null }
        });
    });

    it('sets color=red when receives COLOR_RED action', () => {
        const redState = reducerAll(undefined, actions.setRed());
        expect(redState).toEqual({
            color: { color: 'red', loading: false, loadedSuccessfully: null }
        });
    });
});
