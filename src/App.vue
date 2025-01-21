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
  <header class="d-flex justify-center">
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    <div >
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
    <div></div>
    <WeatherSummary v-if="dataPresent" :days />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
