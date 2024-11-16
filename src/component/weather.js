import * as React from 'react'
import { useState, useEffect } from 'react'
import { Box, TextField, Typography, Divider } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import GpsFixedIcon from '@mui/icons-material/GpsFixed'
import ImageDisplay from './imageDisplay'
import DegreeDisplay from './degreeDisply'
import ForecastCollection from './forecastMain'
import InfoDetail from './infoDetail'

// invoke the api
import { getCurrentCity, getCurrentWeather, getForecastWeather, getCityPhoto } from '../APIcalls'

const classes = {
    root: {
        width: '70%',
        minHeight: '80%',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.2), -8px -8px 16px rgba(255, 255, 255, 0.5)',
        border: '1px solid #C0C0C5',
        display: 'flex',

    },
    leftContainer: {
        width: '25%',
        padding: '20px',
        borderRadius: '16px',
    },
    rightContainer: {
        width: '75%',
        backgroundColor: '#E0E0E5',
        padding: '20px',
        borderRadius: '16px',
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
    const [targetCity, setTargetCity] = useState('Sydney')
    const [info, setInfo] = useState(null)
    const [photo, setPhoto] = useState(null)
    const [forecastData, setForecastData] = useState(null)

    useEffect(() => {
        getWeatherData()
    }, [])

    const getUserCity = async () => {
        const res = await getCurrentCity()
        setTargetCity(res)
    }

    const getWeatherData = async () => {
        try {
            // Call the three functions concurrently
            const [weatherData, forecastData, photoData] = await Promise.all([
                getCurrentWeather(targetCity),  
                getForecastWeather(targetCity), 
                getCityPhoto(targetCity) 
            ])
    
            // Update the state with the results
            setInfo(weatherData)
            setForecastData(forecastData)
            setPhoto(photoData)
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
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

                    <IconButton onClick={getWeatherData}>
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
                <Typography variant='h5' sx={{ textAlign: 'center' }}> 3 DAYS FORECAST (including today)</Typography>
                { info ? (
                    <>
                        <ForecastCollection forecastInfo={forecastData} />
                        <Divider />
                        <InfoDetail infoDetail={info} />
                    </>
                ) : (
                    <Typography variant="body1">loading...</Typography>
                )}
            </Box>
        </Box>
    )
}

export default Weather