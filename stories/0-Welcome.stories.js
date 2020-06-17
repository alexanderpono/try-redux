import React from 'react';
import { linkTo } from '@storybook/addon-links';
import { Welcome } from '@storybook/react/demo';

// eslint-disable-next-line no-restricted-syntax
export default {
    title: 'Welcome',
    component: Welcome
};

export const ToStorybook = () => <Welcome showApp={linkTo('Button')} />;

ToStorybook.story = {
    name: 'to Storybook'
};
