import { reducer as colorReducer, actions } from './reducer';

test('colorReducer', () => {
    const blueState = colorReducer(undefined, actions.setBlue());
    const redState = colorReducer(undefined, actions.setRed());
    expect(blueState).toEqual({ color: 'blue' });
    expect(redState).toEqual({ color: 'red' });
});
