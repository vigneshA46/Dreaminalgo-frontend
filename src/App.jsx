import '@mantine/core/styles.css';

import { MantineProvider, Text } from '@mantine/core';
import Home from './modules/Home';

function App() {

  return (
   <MantineProvider>
    <Home />
   </MantineProvider>
  )
}

export default App