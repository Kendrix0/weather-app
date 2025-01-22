<script type="module">
import { ref } from 'vue'
</script>
<script setup>
import WeatherSummary from './components/WeatherSummary.vue'

const location = ref('')
const weatherData = ref('')
const APIkey = ref('FMNUWVMF27AJNG8P9WAECF8RS')
const days = ref([])
const currentConditions = ref({})
const dataPresent = ref(false)
const displayedComp = ref('')
let startDate = new Date()
let endDate = new Date()

endDate = endDate.setDate(endDate.getDate() + 9)
startDate = startDate.toISOString().substring(0, 10)
endDate = new Date(endDate).toISOString().substring(0, 10)

async function requestWeatherData() {
  try {
    let response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.value}/${startDate}/${endDate}?key=${APIkey.value}&include=current`
    )
    weatherData.value = await response.json()
    currentConditions.value = weatherData.value.currentConditions;
    days.value = weatherData.value.days
    console.log(weatherData.value)
    dataPresent.value = !!days.value
  } catch (err) {
    console.log(err)
  }
}
</script>

<template>
<div class="h-screen d-flex flex-column justify-center">
  <header class="d-flex justify-center align-center mt-10">
    <div class="d-flex ga-md-2">
      <v-combobox
        label="Enter Location"
        :items="['Athens', 'Dallas', 'Little Rock', 'Madrid', 'Philadelphia']"
        variant="outlined"
        width="25vw"
        v-model="location"
      ></v-combobox>
      <button class="pb-5 ps-2" @click="requestWeatherData">Submit</button>
    </div>
  </header>
  <main>
    <Transition name="slide-fade">
      <WeatherSummary v-if="dataPresent" :key="days" :days :currentConditions/>
    </Transition>
  </main>
</div>
</template>

<style>
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