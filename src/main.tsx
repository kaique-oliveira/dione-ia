import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './global.css';

import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { NotificationProvider } from '@lumus-ui/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NotificationProvider>
      <Theme accentColor="iris" appearance="dark" radius="large">
        <App />
      </Theme>
    </NotificationProvider>
  </React.StrictMode>
);
