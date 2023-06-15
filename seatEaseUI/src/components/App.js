import React, {useEffect, useState} from 'react';
import {Route, Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {ThemeProvider} from '@moneta/moneta-web-react';
import classnames from 'classnames';


import HomePage from './home/HomePage';

const defaultHistory = createBrowserHistory();
// eslint-disable
function App({history = defaultHistory}) {
  return (
    <ThemeProvider>
      <Router history={history}>
        <div className="fixed-layout">
          <div>
              <HomePage />

          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
