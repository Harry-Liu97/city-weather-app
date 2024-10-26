import * as React from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import GpsFixedIcon from '@mui/icons-material/GpsFixed'

// invoke the api
import { getCurrentCity } from '../APIcalls'

const classes = {
    root: {
        width: '80%',
        height: '80%',
        padding: '20px',
        backgroundColor: '#E0E0E5',
        borderRadius: '16px',
        boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.2), -8px -8px 16px rgba(255, 255, 255, 0.5)',
        backgroundImage: 'linear-gradient(145deg, #d4d4dc, #f0f0f4)', 
        border: '1px solid #C0C0C5',
        display: 'flex',

    },
    leftContainer: {
        width: '35%',
        height: '100%',
        marginRight: '12px'
    },
    rightContainer: {
        width: '65%',
        height: '100%',
        marginLeft: '12px'
    },
    searchSection: {
        width: '100%',
        minHeight: '56px',
        display: 'flex',
        justifyContent: 'space-around',
    },
    textField: {
        width: '50%',
    }   
}

const Weather = () => {
    const [targetCity, setTargetCity] = useState('')

    const getUserCity = async () => {
        const res = await getCurrentCity()
        setTargetCity(res)
    }

    return (
        <Box sx={classes.root}>
            <Box sx={classes.leftContainer}>

                <Box sx={classes.searchSection}>
                    <IconButton onClick={getUserCity}>
                        <GpsFixedIcon  sx={{ fontSize: '2rem' }} />
                    </IconButton>

                    <Box sx={classes.textField}>
                        <TextField 
                            fullWidth 
                            label="Search for places..." 
                            id="fullWidth"
                            value={targetCity}
                            onChange={e => setTargetCity(e.target.value)}
                            InputLabelProps={{
                                shrink: !!targetCity // This will shrink the label if targetCity has a value
                            }}
                            />
                    </Box>

                    <IconButton>
                        <SearchIcon  sx={{ fontSize: '2rem' }} />
                    </IconButton>

                </Box>

            </Box>




            <Box sx={classes.rightContainer}>
                Right container

            </Box>
        </Box>
    )
}

export default Weather