import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { UserProvider } from './context/UserContext.jsx';

import { Notifications } from '@mantine/notifications';
import { MantineProvider } from '@mantine/core';
import "@mantine/core/styles.css"
import '@mantine/notifications/styles.css';

createRoot(document.getElementById('root')).render(
  <UserProvider>
        <MantineProvider>

    <Notifications position="top-right"/>
    <App />
    </MantineProvider>
  </UserProvider>,
)
  