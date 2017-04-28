'use strict';

// Base libraries
import React from 'react';
import ReactDOM from 'react-dom';

// Components
import App from '../app';

window.LeanApiApp = ReactDOM.render(
  <App />,
  document.getElementById('app')
);