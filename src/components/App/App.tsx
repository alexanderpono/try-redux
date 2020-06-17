import React from 'react';
import { HelloWorld } from '../HelloWorld';
import { Box } from '../Box';
import { AppState, defaultState } from './reducer';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { actions } from './reducer';

function selectColor(state: AppState) {
    return state.color;
}

export class App extends React.Component<{}, AppState> {
    constructor(props: object) {
        super(props);
        this.state = defaultState;
    }

    dispatchBlue = () => {
        store.dispatch(actions.setBlue());
    };

    dispatchRed = () => {
        store.dispatch(actions.setRed());
    };

    storeChange = () => {
        this.setState({
            color: selectColor(store.getState().color)
        });
    };

    componentDidMount() {
        store.subscribe(this.storeChange);
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <div>This is App component !!!</div>
                    <HelloWorld key="2" userName="Alex" />
                    <Box color={this.state.color} />
                    <button onClick={this.dispatchBlue}>setBlue</button>
                    <button onClick={this.dispatchRed}>setRed</button>
                </div>
            </Provider>
        );
    }
}
