import * as React from 'react'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'

const classes = {
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '30px'
    },
    textFont: {
        marginTop: '10px',
        fontSize: '3rem'
    }
}

const CityDegreeDisplay = ({info}) => {
    const [currentTime, setCurrentTime] = useState({curDay: '', curTime: ''})

    const getCurrentDate = () => {
        const date = new Date()
        const formattedTime = date.toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: info.location.tz_id,
        })
    
        // Format the day of the week based on the time zone
        const weekDay = date.toLocaleDateString('en-US', { weekday: 'long', timeZone: info.location.tz_id })
        
        setCurrentTime({curDay: weekDay, curTime: formattedTime})
    }

    useEffect(() => {
        const timer = setInterval(getCurrentDate, 1000)
        return () => clearInterval(timer)
    }, [info.location.tz_id])

    return (
        <Box sx={classes.root}>
            <img 
                src={info.current.condition.icon.replace(/64x64/, '128x128')}
                alt='weather icon'
                style={{ width: '128px', height: '128px', objectFit: 'contain', marginTop: '20px'  }}
            />
            <Typography sx={{ color: '#b0b0b0' }}> {info.current.condition.text} </Typography>
            <Typography sx={classes.textFont}> {info.current.temp_c} °C </Typography>
            <Box sx={{ display: 'flex', marginTop: '10px' }}>
                <Typography sx={{ marginRight: '10px', fontSize: '1.2rem' }}>{currentTime.curDay}</Typography>
                <Typography sx={{ marginLeft: '10px', fontSize: '1.2rem' }} >{currentTime.curTime}</Typography>
            </Box>

        </Box>
    )
}

export default CityDegreeDisplay