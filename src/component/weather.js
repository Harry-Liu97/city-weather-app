import * as React from 'react'
import { useState } from 'react'
import { Box, TextField, Typography, Divider } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import GpsFixedIcon from '@mui/icons-material/GpsFixed'
import ImageDisplay from './imageDisplay'
import DegreeDisplay from './degreeDisply'

// invoke the api
import { getCurrentCity, getCurrentWeather, getCityPhoto } from '../APIcalls'

const classes = {
    root: {
        width: '80%',
        height: '80%',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.2), -8px -8px 16px rgba(255, 255, 255, 0.5)',
        border: '1px solid #C0C0C5',
        display: 'flex',

    },
    leftContainer: {
        width: '25%',
        height: '100%',
        marginRight: '12px'
    },
    rightContainer: {
        width: '75%',
        height: '100%',
        marginLeft: '12px',
        backgroundColor: '#E0E0E5',
    },
    searchSection: {
        width: '100%',
        minHeight: '56px',
        display: 'flex',
        justifyContent: 'space-around',
    },
    textField: {
        width: '50%',
    },
    weatherDisplay: {
        width: '100%',
    }
}

const Weather = () => {
    const [targetCity, setTargetCity] = useState('')
    const [info, setInfo] = useState(null)
    const [photo, setPhoto] = useState(null)

    const getUserCity = async () => {
        const res = await getCurrentCity()
        setTargetCity(res)
    }

    const getUserWeather = async () => {
        const res = await getCurrentWeather(targetCity)
        setInfo(res)
        console.log(res)
    }

    const getUserPhoto = async () => {
        const res = await getCityPhoto(targetCity)
        setPhoto(res)
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

                    <IconButton onClick={() => {getUserWeather(); getUserPhoto()}}>
                        <SearchIcon  sx={{ fontSize: '2rem' }} />
                    </IconButton>

                </Box>

                <Box sx={classes.weatherDisplay}>
                    { info ? (
                        <>
                            <DegreeDisplay info={info} />
                            <Divider />
                            <ImageDisplay  imageURL={photo} location={info.location} status={info.current} />
                        </>
                    ) : (
                        <Typography variant="body1">loading...</Typography>
                    )}
                </Box>

            </Box>




            <Box sx={classes.rightContainer}>
                Right container

            </Box>
        </Box>
    )
}

export default Weather