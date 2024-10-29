import * as React from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActionArea from '@mui/material/CardActionArea'
import InfoIcon from '@mui/icons-material/Info'

const classes = {
    root: {
        width: '100%',
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', 
    },
    fontData: {
        fontSize: '1.5rem',
        fontWeight: 'bold'
    }
}

const InfoDetail = ({ infoDetail }) => {
    const items = [
        {
            name: 'Humidity',
            data: `${infoDetail.current.humidity} %`
        },
        {
            name: 'Wind Speed',
            data: `${infoDetail.current.wind_mph} mph`
        },
        {
            name: 'Atm. Pressure',
            data: `${infoDetail.current.pressure_mb} mb`
        },
        {
            name: 'UV',
            data: infoDetail.current.uv
        },
        {
            name: 'Visibility',
            data: `${infoDetail.current.vis_km} km`
        },
        {
            name: 'Precipitation',
            data: `${infoDetail.current.precip_mm} mm`
        }
    ]

    return (
        <Grid container spacing={0} sx={classes.root}>
            {items.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index} sx={{ padding: '20px' }}>
                    <Card sx={{ borderRadius: '16px' }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography> <InfoIcon sx={{ verticalAlign: 'middle' }} /> {item.name} </Typography>
                                <Typography sx={classes.fontData}> {item.data} </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}

export default InfoDetail