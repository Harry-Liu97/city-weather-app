import axios from "axios"

let lastRequestTime = 0
const requestInterval = 1000

/**
 * Get the current city name
 * 
 * This function retrieves the user's current city name based on their 
 * geographic coordinates using the Nominatim API.
 * 
 * Data sourced from Nominatim (https://nominatim.openstreetmap.org) 
 * and OpenStreetMap (© OpenStreetMap contributors).
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
                        reject(new Error("Geolocation error: " + error.message)) // More detailed error message
                    }
                )
            } else {
                reject(new Error('Geolocation is not supported by this browser.'))
            }
        })

        // Use latitude and longitude to get the city name
        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)

        // Check the response status
        if (response.status !== 200) { // Use response.status instead of response.ok
            throw new Error('Failed to fetch location data: ' + response.statusText)
        }
        
        const data = response.data // Directly use response.data to get the response body
        console.log(data)
        // Extract the city name
        const city = data.address.city
        return city || "Unknown location"
        
    } catch (error) {
        console.error("Error:", error.message); // Print error message
        return 'Sydney'
    }
}
