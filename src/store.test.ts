import { reducerAll } from './store';
import { actions } from './components/App/reducer';

test('reducerAll', () => {
    const blueState = reducerAll(undefined, actions.setBlue());
    const redState = reducerAll(undefined, actions.setRed());
    expect(blueState).toEqual({ color: { color: 'blue' } });
    expect(redState).toEqual({ color: { color: 'red' } });
});
