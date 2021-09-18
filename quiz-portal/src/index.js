import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { StateProvider } from './store.js';

const app = (
  <StateProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </StateProvider>
);

ReactDOM.render(app, document.getElementById('root'));