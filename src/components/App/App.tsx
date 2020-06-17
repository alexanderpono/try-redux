import React from 'react';
import { HelloWorld } from '../HelloWorld';
import { Box } from '../Box';

interface AppState {
    color: string;
}

export class App extends React.Component<{}, AppState> {
    constructor(props: object) {
        super(props);
        this.state = {
            color: 'grey'
        };
    }

    setBlue = () => {
        this.setState({
            color: 'blue'
        });
    };

    setRed = () => {
        this.setState({
            color: 'red'
        });
    };

    render() {
        return (
            <div>
                <div>This is App component !!!</div>
                <HelloWorld key="2" userName="Alex" />
                <Box color={this.state.color} />
                <button onClick={this.setBlue}>setBlue</button>
                <button onClick={this.setRed}>setRed</button>
            </div>
        );
    }
}
