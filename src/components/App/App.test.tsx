import React from 'react';
import { shallow } from 'enzyme';
import { App } from './';

describe('App simple test', () => {
    it('It renders using shallow', () => {
        const wrapper = shallow(<App></App>);
        expect(wrapper.contains(<div>This is App component !!!</div>)).toBe(true);
    });
});
