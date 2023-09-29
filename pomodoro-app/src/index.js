import React from 'react';
import ReactDOM from 'react-dom/client';
import Pomodoro from './components/Pomodoro';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Pomodoro />
  </React.StrictMode>
);