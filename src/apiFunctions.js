const apiKey = process.env.OPENWEATHER_KEY;

export let geocodeByName = async function(cityName, stateCode, countryCode, limit=1) {
    let response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${apiKey}`);
    let geoData = await response.json();
    console.log(geoData[0]);
    return geoData;
};

export let oneCallWeather = async function(units, cityName, stateCode='', countryCode='', limit=1) {
    try {
        let coords = await geocodeByName(cityName, stateCode, countryCode, limit=1);
        let response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords[0].lat}&lon=${coords[0].lon}&units=${units}&exclude=minutely&appid=${apiKey}`);
        let weatherData = await response.json();
        console.log(weatherData);
        return weatherData;
    } catch(e) {
        console.log('Error!', e);
    }
}