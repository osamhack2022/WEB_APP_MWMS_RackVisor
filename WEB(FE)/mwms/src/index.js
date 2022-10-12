import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './utils/grid/overridden-placeholder.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);