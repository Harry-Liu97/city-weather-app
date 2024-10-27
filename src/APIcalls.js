import axios from "axios"

let lastRequestTime = 0
const requestInterval = 1000
const BASE_URL_WEATHER = 'http://api.weatherapi.com/v1'
const API_KEY_WEATHER = process.env.REACT_APP_WEATHER_API_KEY
const BASE_URL_PIXABAY = 'https://pixabay.com/api/'
const API_KEY_PIXABAY = process.env.REACT_APP_PIXABAY_API_KEY

/**
 * This function retrieves the user's current city name based on their 
 * geographic coordinates
 * 
 * Data sourced from Nominatim (https://nominatim.openstreetmap.org) 
 * and OpenStreetMap (© OpenStreetMap contributors)
 */

export const getCurrentCity = async () => {
    const currentTime = Date.now()
    
    // Check the time interval
    if (currentTime - lastRequestTime < requestInterval) {
        alert('Requests are too frequent, please try again later.')
        return
    }
    
    lastRequestTime = currentTime

    try {
        // Get the user's latitude and longitude
        const { latitude, longitude } = await new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        resolve({ latitude, longitude })
                    },
                    (error) => {
                        reject(new Error('Geolocation error: ' + error.message))
                    }
                )
            } else {
                reject(new Error('Geolocation is not supported by this browser.'))
            }
        })

        // Use latitude and longitude to get the city name
        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)

        // Check the response status
        if (response.status !== 200) {
            throw new Error('Failed to fetch location data: ' + response.statusText)
        }
        
        const data = response.data

        // Extract the city name
        const city = data.address.city
        return city || 'Unknown location'
        
    } catch (error) {
        console.error('Error:', error)
        return 'Sydney'
    }
}

/**
 * Fetch the current weather information for a specified city
 * 
 * Data source: WeatherAPI (https://www.weatherapi.com)
 */

export const getCurrentWeather = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL_WEATHER}/current.json?key=${API_KEY_WEATHER}&q=${city}`)
        return response.data
    } catch (error) {
        console.error('Failed to fetch weather data:', error)
    }
}

/**
 * Fetch photos for a specified city
 * 
 * Images and videos provided by Pixabay using the Pixabay API (https://pixabay.com)
 */

export const getCityPhoto = async (city) => {
    try {
        const response = await axios.get(BASE_URL_PIXABAY, {
            params: {
                key: API_KEY_PIXABAY,
                q: encodeURIComponent(city),
                image_type: 'photo',
                orientation: 'horizontal',
                category: 'buildings',                
                safesearch: true,
                per_page: 3,
            }
        })

        return response.data.hits[0].largeImageURL

    } catch (error) {
        console.error('Error fetching image:', error)
    }
}