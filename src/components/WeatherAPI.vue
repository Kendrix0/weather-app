<script type="module">
import { createApp, ref } from 'vue'
</script>
<script setup>
const location = ref('');
const weatherData = ref('');
const days = ref([]);
const APIkey = ref('FMNUWVMF27AJNG8P9WAECF8RS');

let startDate = new Date();
let endDate = new Date();

endDate = endDate.setDate(endDate.getDate() + 9);
startDate = startDate.toISOString().substring(0, 10);
endDate = new Date(endDate).toISOString().substring(0, 10);
/*
&include=,,
days – daily data
hours – hourly data
alerts – weather alerts
current – current conditions or conditions at requested time

*/

async function requestWeatherData() {
    try {
        let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.value}/${startDate}/${endDate}?key=${APIkey.value}`);
        weatherData.value = await response.json();
        for (let day of weatherData.value.days) {
            days.value.push(day);
        }
    } catch (err) {
        console.log(err)
    }
}
</script>

<template>
    <menu>

    </menu>
    <div>
        <div>
            <input type="text" placeholder="Location" v-model="location">
            <button @click="requestWeatherData">Submit</button>
        </div>
    </div>
</template>

<style></style>