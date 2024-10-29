import * as React from 'react'
import { Box, Typography } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import NightlightIcon from '@mui/icons-material/Nightlight'

const classes = {
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
    },
    namePosition: {
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        top: '60%',
        left: '50%',
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '80%'
    }
}

const CityImageDisplay = ({ imageURL, location, status }) => {
    return (
        <Box sx={classes.root}>
            {status.is_day === 1 ? (
                <Typography>
                    <LightModeIcon sx={{ verticalAlign: 'middle', margin: '20px 10px 20px 0' }} />
                    Daytime
                </Typography>

            ) : (
                <Typography>
                    <NightlightIcon sx={{ verticalAlign: 'middle', margin: '20px 10px 20px 0' }} />
                    Nighttime
                </Typography>
            )}
            <img 
                src={imageURL}
                alt='city view'
                style={{ maxWidth: '100%', maxHeight: '300px', width: 'auto', height: 'auto', objectFit: 'contain', borderRadius: '16px',  }}
            />

            <Typography sx={classes.namePosition}>
                {location.name}, {location.country}
            </Typography>
        </Box>
    )
}

export default CityImageDisplay