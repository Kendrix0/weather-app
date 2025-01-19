<script type="module">
import { createApp, ref } from 'vue'
</script>
<script setup>
import HelloWorld from './components/HelloWorld.vue'
import WeatherSummary from './components/WeatherSummary.vue'
import CurrentDay from './components/CurrentDay.vue'

const location = ref('');
const weatherData = ref('');
const APIkey = ref('FMNUWVMF27AJNG8P9WAECF8RS');
const days = ref([]);
const dataPresent = ref(false)
let startDate = new Date();
let endDate = new Date();

endDate = endDate.setDate(endDate.getDate() + 9);
startDate = startDate.toISOString().substring(0, 10);
endDate = new Date(endDate).toISOString().substring(0, 10);

async function requestWeatherData() {
  try {
    let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.value}/${startDate}/${endDate}?key=${APIkey.value}`);
    weatherData.value = await response.json();
    days.value = [];
    for (let day of weatherData.value.days) {
      days.value.push(day);
    }
    dataPresent.value = !dataPresent.value;
    console.log(days.value[0])
  } catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <button>Current Weather</button>
    <button>10-Day Forecast</button>
    <button>Radar</button>
  </header>

  <main>
    <div>
      <div>
        <input type="text" placeholder="Location" v-model="location">
        <button @click="requestWeatherData">Submit</button>
      </div>
    </div>
    <CurrentDay v-if="dataPresent" :days />
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
