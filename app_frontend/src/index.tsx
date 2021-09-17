import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerIcons from './Icons/Icons';

registerIcons();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
