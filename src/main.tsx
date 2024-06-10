import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './global.css';

import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme accentColor="iris" appearance="dark" radius="large">
      <App />
    </Theme>
  </React.StrictMode>
);
