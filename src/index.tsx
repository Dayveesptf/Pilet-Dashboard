import * as React from 'react';
import { PiletApi } from 'my-app-shell';
import Dashboard from './components/Dashboard';
const globalStyles = require('./styles/global.css');

export function setup(app: PiletApi) {
  app.registerPage('/dashboard', Dashboard);
  
  app.registerMenu(() => 
    React.createElement('a', {
      href: '/dashboard',
      className: 'btn btn-primary',
      style: {
        margin: '0 10px',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px'
      }
    }, '📊 Dashboard')
  );
}