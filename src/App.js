import * as React from 'react'
import Box from '@mui/material/Box'
import { display } from '@mui/system';

const classes = {
  root: {
    width: '100vw',
    height: '100vh',
    backgroundImage: 'url(/assets/background.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}

function App() {
  return (
    <Box sx={classes.root}>
      hello
    </Box>
  )
}

export default App;
