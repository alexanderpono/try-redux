import React from 'react';
import { render } from 'react-dom';

import { App, HelloWorld } from './components';

render([<App key="1" />, <HelloWorld key="2" userName="Alex" />], document.getElementById('root'));
