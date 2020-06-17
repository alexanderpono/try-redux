import React from 'react';
import { HelloWorldProps } from './interfaces';

export class HelloWorld extends React.Component<HelloWorldProps> {
    render() {
        return <div>Hello World, {this.props.userName}</div>;
    }
}
