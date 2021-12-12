const apiKey = process.env.OPENWEATHER_KEY;

export let geocodeByName = async function(cityName, stateCode='', countryCode='', limit=1) {
    let response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${apiKey}`);
    let geoData = await response.json();
    let latitude = geoData[0].lat;
    let longitude = geoData[0].lon;
    console.log(geoData);
    console.log(latitude, longitude);
};

