import React from 'react';

export interface BoxProps {
    color: string;
}

export class Box extends React.Component<BoxProps> {
    render() {
        return (
            <div
                style={{
                    display: 'block',
                    background: this.props.color,
                    width: '200px',
                    height: '200px'
                }}
            ></div>
        );
    }
}
