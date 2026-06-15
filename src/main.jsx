import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { UserProvider } from './context/UserContext.jsx';

import { Notifications } from '@mantine/notifications';
import { MantineProvider } from '@mantine/core';
import "@mantine/core/styles.css"
import '@mantine/notifications/styles.css';
import { ModalsProvider } from "@mantine/modals";

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <MantineProvider>
    <ModalsProvider>
    <Notifications position="top-right"/>
    <App />
    </ModalsProvider>
    </MantineProvider>
  </UserProvider>
)
  