import { AsyncDispatch } from 'src/store';

export interface ColorState {
    color: string;
    loading: boolean;
    loadedSuccessfully: boolean | null;
}

export const defaultState: ColorState = {
    color: 'grey',
    loading: false,
    loadedSuccessfully: null
};

const COLOR_BLUE = 'blue';
const COLOR_RED = 'red';
const SET_COLOR = 'SET_COLOR';
const COLOR_LOADING = 'COLOR_LOADING';
const COLOR_LOAD_OK = 'COLOR_LOAD_OK';
const COLOR_LOAD_ERR = 'COLOR_LOAD_ERR';
export const LOAD_RED = 'LOAD_RED';

type ChangeColorAction = { type: string; payload: { color: string } };
type IncAction = { type: string; payload: {} };
type LoadingAction = { type: string };
export type ColorAction = ChangeColorAction | IncAction | LoadingAction;
type ActionCreator = (param?: string) => ColorAction;

export const setBlue: ActionCreator = () => ({
    type: SET_COLOR,
    payload: { color: COLOR_BLUE }
});
export const setRed: ActionCreator = () => ({
    type: SET_COLOR,
    payload: { color: COLOR_RED }
});
export const colorLoading: ActionCreator = () => ({
    type: COLOR_LOADING
});
export const colorLoadOk: ActionCreator = () => ({
    type: COLOR_LOAD_OK
});
export const colorLoadErr: ActionCreator = () => ({
    type: COLOR_LOAD_ERR
});
export const incAsync: ActionCreator = () => ({
    type: 'INCREMENT_ASYNC',
    payload: {}
});
export const inc: ActionCreator = () => ({
    type: 'INCREMENT',
    payload: {}
});
export const loadRed: ActionCreator = () => ({
    type: 'LOAD_RED',
    payload: {}
});

export const loadBlue = (fetchBlue: Function) => (dispatch: AsyncDispatch) => {
    dispatch(colorLoading());
    return fetchBlue()
        .then(() => {
            dispatch(colorLoadOk());
            dispatch(setBlue());
        })
        .catch(() => dispatch(colorLoadErr()));
};

export function reducer(state: ColorState = defaultState, action: ColorAction): ColorState {
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
                ...state,
                color: state.color === 'red' ? 'blue' : 'red'
            };
        }
        case COLOR_LOADING: {
            return {
                ...state,
                loading: true
            };
        }
        case COLOR_LOAD_OK: {
            return {
                ...state,
                loading: false,
                loadedSuccessfully: true
            };
        }
        case COLOR_LOAD_ERR: {
            return {
                ...state,
                loading: false,
                loadedSuccessfully: false
            };
        }
    }
    return state;
}

export const actions = { setBlue, setRed, incAsync, inc };
