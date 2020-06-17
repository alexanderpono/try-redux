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
type ActionCreator = (param?: string) => ChangeColorAction;
export const setBlue: ActionCreator = () => ({
    type: SET_COLOR,
    payload: { color: COLOR_BLUE }
});
export const setRed: ActionCreator = () => ({
    type: SET_COLOR,
    payload: { color: COLOR_RED }
});

export function reducer(state: AppState = defaultState, action: ChangeColorAction): AppState {
    switch (action.type) {
        case SET_COLOR: {
            return {
                ...state,
                color: action.payload.color
            };
        }
    }
    return state;
}

export const actions = { setBlue, setRed };
