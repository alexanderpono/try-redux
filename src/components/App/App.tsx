import React from 'react';
import { HelloWorld } from '../HelloWorld';
import { Box } from '../Box';
import { Provider } from 'react-redux';
import { store, AppState, defaultState, dispatch } from '../../store';
import { loadBlue, setBlue, setRed, incAsync, loadRed } from './reducer';

function selectColor(state: AppState) {
    return state.color;
}

export class App extends React.Component<{}, AppState> {
    constructor(props: object) {
        super(props);
        this.state = defaultState;
    }

    dispatchBlue = () => {
        dispatch(setBlue());
    };

    dispatchRed = () => {
        dispatch(setRed());
    };

    dispatchLoadBlue = () => {
        const fetchBlue = () => new Promise((resolve) => setTimeout(resolve, 1000));
        dispatch(loadBlue(fetchBlue));
    };

    dispatchIncAsync = () => {
        dispatch(incAsync());
    };

    dispatchLoadRed = () => {
        dispatch(loadRed());
    };

    storeChange = () => {
        this.setState(store.getState());
    };

    componentDidMount() {
        store.subscribe(this.storeChange);
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <div>This is App component !!!</div>
                    <div>{selectColor(this.state).loading ? 'LOADING...' : '.'}</div>
                    <HelloWorld key="2" userName="Alex" />
                    <Box color={this.state.color.color} />
                    <button onClick={this.dispatchBlue}>setBlue</button>
                    <button onClick={this.dispatchRed}>setRed</button>
                    <button onClick={this.dispatchLoadBlue}>loadBlue</button>
                    <button onClick={this.dispatchIncAsync}>incAsync</button>
                    <button onClick={this.dispatchLoadRed}>loadRedFail</button>
                </div>
            </Provider>
        );
    }
}
