import './App.css'
import '@mantine/core/styles.css';

import { MantineProvider, Text } from '@mantine/core';

function App() {

  return (
   <MantineProvider>
    <Text>mantine </Text>
   </MantineProvider>
  )
}

export default App