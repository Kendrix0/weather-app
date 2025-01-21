<script type="module">
import { ref } from 'vue'
</script>
<script setup>
import WeatherSummary from './components/WeatherSummary.vue'

const location = ref('')
const weatherData = ref('')
const APIkey = ref('FMNUWVMF27AJNG8P9WAECF8RS')
const days = ref([])

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
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.value}/${startDate}/${endDate}?key=${APIkey.value}`
    )
    weatherData.value = await response.json()
    days.value = []
    for (let day of weatherData.value.days) {
      days.value.push(day)
    }
    dataPresent.value = !!days.value
    console.log(days.value[0])
  } catch (err) {
    console.log(err)
  }
}

function setActiveComp(comp) {
  displayedComp.value = comp
  console.log(`Set ${comp}!`)
}
</script>

<template>
  <header class="d-flex justify-center align-center mt-10">
    <div class="d-flex ga-md-2">
      <v-combobox
        label="Enter Location"
        :items="['Athens', 'Dallas', 'Little Rock', 'Madrid', 'Philadelphia']"
        variant="outlined"
        width="25vw"
        v-model="location"
      ></v-combobox>
      <button @click="requestWeatherData">Submit</button>
    </div>
  </header>
  <main>
    <WeatherSummary v-if="dataPresent" :days />
  </main>
</template>