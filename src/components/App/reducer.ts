export interface AppState {
    color: string;
}

export const defaultState: AppState = {
    color: 'grey'
};

const SET_COLOR = 'SET_COLOR';
const COLOR_BLUE = 'blue';
const COLOR_RED = 'red';

type ChangeColorAction = { type: string; payload: { color: string } };
type IncAction = { type: string; payload: {} };
type ActionCreator = (param?: string) => ChangeColorAction | IncAction;

export const setBlue: ActionCreator = () => ({
    type: SET_COLOR,
    payload: { color: COLOR_BLUE }
});
export const setRed: ActionCreator = () => ({
    type: SET_COLOR,
    payload: { color: COLOR_RED }
});
export const incAsync: ActionCreator = () => ({
    type: 'INCREMENT_ASYNC',
    payload: {}
});
export const inc: ActionCreator = () => ({
    type: 'INCREMENT',
    payload: {}
});

export function reducer(
    state: AppState = defaultState,
    action: ChangeColorAction | IncAction
): AppState {
    switch (action.type) {
        case SET_COLOR: {
            const a = action as ChangeColorAction;
            return {
                ...state,
                color: a.payload.color
            };
        }
        case 'INCREMENT': {
            return {
                ...state
                // color: action.payload.color
            };
        }
    }
    return state;
}

export const actions = { setBlue, setRed, incAsync, inc };
