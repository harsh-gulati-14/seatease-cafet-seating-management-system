/** @jsxRuntime classic */
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
// IE11 needs "jsxRuntime classic" for this initial file which means that "React" needs to be in scope
// issue: https://github.com/facebook/create-react-app/issues/9906
import React from 'react';
import ReactDOM from 'react-dom';

import './styles/app.scss';
import App from './components/App';

ReactDOM.render(<App />, document.getElementById('root'));
