<script type="module">
import { ref } from 'vue'
</script>
<script setup>
import { en } from 'vuetify/locale';
import WeatherSummary from './components/WeatherSummary.vue'

const location = ref('')
const weatherData = ref('')
const APIkey = ref('FMNUWVMF27AJNG8P9WAECF8RS')
const days = ref([])
const currentConditions = ref({})
const locationError = ref(false)
const dataPresent = ref(false)
let startDate = new Date()
let endDate = new Date()
endDate = endDate.setDate(endDate.getDate() + 9)

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

startDate = formatDate(startDate)
endDate = formatDate(endDate)

async function requestWeatherData() {
  try {
    let response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.value}/${startDate}/${endDate}?key=${APIkey.value}&include=current,hours`
    )
    weatherData.value = await response.json()
    locationError.value = false
    currentConditions.value = weatherData.value.currentConditions;
    days.value = weatherData.value.days
    console.log(weatherData.value)
    dataPresent.value = !!days.value
  } catch (err) {
    locationError.value = true;
  }
}
</script>

<template>
<div class="h-screen d-flex flex-column justify-center">
  <header class="d-flex justify-center align-center flex-column mt-10">
    <div>
        <div class="d-flex">
          <v-combobox
        label="Enter Location"
        bg-color="grey-darken-4"
        :items="['Athens', 'Dallas', 'Little Rock', 'Madrid', 'Philadelphia']"
        variant="outlined"
        width="25vw"
        hide-details="true"
        v-model="location"
        :error="locationError"
      ></v-combobox>
      <v-btn class="ps-2" height="60" color="indigo-darken-3" @click="requestWeatherData" >Submit</v-btn>
        </div>
      <div v-if="locationError" class="error">Location not found!</div>
    </div>

  </header>
  <main>
    <Transition name="slide-fade">
      <WeatherSummary v-if="dataPresent" :key="days" :weatherData/>
    </Transition>
  </main>
</div>
</template>

<style>
.error {
  color: rgb(207,102,121);
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  display: none;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>