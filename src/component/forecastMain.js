import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardActionArea from '@mui/material/CardActionArea'
import Divider from '@mui/material/Divider'

const classes = {
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        margin: '20px 0'
    },
    layout: {
        marginTop: '6px'
    },
    imgLayout: {
        width: '24px',
        height: '24px',
        marginRight: '3px',
        verticalAlign: 'middle'
    }
}

const ForecastCollection = ({forecastInfo}) => {

    const getWeekDay = (dateInfo) => {
        const date = new Date(dateInfo)

        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

        return weekdays[date.getDay()]
    }

    const convertTo24Hour = (time) => {
        const [timePart, sign] = time.split(' ')
        let [hours, minutes] = timePart.split(':')
        
        if (sign === 'PM' && hours !== '12') {
            hours = String(Number(hours) + 12)
        } else if (sign === 'AM' && hours === '12') {
            hours = '00'
        }
    
        return `${hours}:${minutes}`
    }

    return (
        <Box sx={classes.root}>
            { forecastInfo && forecastInfo?.forecast?.forecastday?.map((info, index) => (
                <Card
                    sx={{ 
                        width: 180, 
                        padding: '10px', 
                        borderRadius: '16px', 
                        transition: 'transform 0.3s', 
                        '&:hover': {
                            transform: 'scale(1.05)',
                        }
                    }}
                    key={index}
                >
                    <CardActionArea>
                        <Typography sx={{ textAlign: 'center', fontWeight: 'bold', color: '#b0b0b0' }}>
                            {getWeekDay(info.date)}
                        </Typography>
                        <CardMedia
                            component="img"
                            image={info.day.condition.icon.replace(/64x64/, '128x128')}
                            alt='weather icon'
                            sx={{
                                width: 128,
                                height: 128,
                                margin: '0 auto'
                            }}
                        />
                    <CardContent sx={{ padding: 0, textAlign: 'center' }}>
                        <Typography sx={{ color: '#b0b0b0', marginBottom: '6px' }}> {info.day.condition.text} </Typography>

                        <Divider />

                        <Typography sx={classes.layout}> 
                            <span style={{ marginRight: '15px' }}>
                                <img 
                                    src='/assets/highDegree.png'
                                    alt='highDegree'
                                    style={classes.imgLayout}
                                />  
                                {info.day.maxtemp_c}°C 
                            </span>
                            
                            <span>
                                <img 
                                    src='/assets/lowDegree.png'
                                    alt='lowDegree'
                                    style={classes.imgLayout}
                                />  
                                {info.day.mintemp_c}°C 
                            </span>
                        </Typography>

                        <Typography sx={classes.layout}>  
                            <span style={{ marginRight: '15px' }}>
                                <img 
                                    src='/assets/sunrise.png'
                                    alt='sunrise'
                                    style={classes.imgLayout}
                                />  
                                {convertTo24Hour(info.astro.sunrise)} 
                            </span>

                            <span>
                                <img 
                                    src='/assets/sunset.png'
                                    alt='sunset'
                                    style={classes.imgLayout}
                                />  
                                {convertTo24Hour(info.astro.sunset)} 
                            </span>
                        </Typography>

                    </CardContent>
                    </CardActionArea>
                </Card>
            ))}  

        </Box>
    )
}

export default ForecastCollection