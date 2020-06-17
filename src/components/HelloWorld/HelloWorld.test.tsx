import React from 'react';
import { shallow } from 'enzyme';
import { HelloWorld } from './HelloWorld';
import renderer from 'react-test-renderer';

describe('HelloWorld', () => {
    it('It renders using shallow', () => {
        const wrapper = shallow(<HelloWorld userName="Alex"></HelloWorld>);
        expect(wrapper.contains(<div>Hello World, Alex</div>)).toBe(true);
    });

    it('It renders using renderer and is compared to snaphot', () => {
        const snapshot = renderer.create(<HelloWorld userName="Peter"></HelloWorld>).toJSON();
        expect(snapshot).toMatchSnapshot();
    });
});
