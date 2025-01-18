<script setup>
/* API REQUEST FORMAT

https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/[location]/[date1]/[date2]?key=YOUR_API_KEY 

&include=,,
days – daily data
hours – hourly data
alerts – weather alerts
current – current conditions or conditions at requested time

*/

let requestWeatherData = async function (location, date1, date2, key) {
    try {
        let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date1}/${date2}?key=${key}`);
        let weatherData = response.json();
        return weatherData;
    } catch (e) {
        console.log(e)
    }
}
</script>

<template>
    <menu>

    </menu>
    <div>
        <button @click="requestWeatherData"></button>
    </div>
</template>

<style></style>