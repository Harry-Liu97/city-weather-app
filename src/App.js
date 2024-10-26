import * as React from 'react'
import Box from '@mui/material/Box'
import Weather from './component/weather'

const classes = {
  root: {
    width: '100vw',
    height: '100vh',
    backgroundImage: 'url(/assets/background.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}

function App() {
  return (
    <Box sx={classes.root}>
      <Weather />
    </Box>
  )
}

export default App;
