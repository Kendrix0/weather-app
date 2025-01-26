<!-- eslint-disable vue/max-attributes-per-line -->
<script type="module">
import { ref, computed } from 'vue'
import clearDay from './icons/clear-day.vue'
import clearNight from './icons/clear-night.vue'
import cloudy from './icons/cloudy.vue'
import fog from './icons/fog.vue'
import hail from './icons/hail.vue'
import partlyCloudyDay from './icons/partly-cloudy-day.vue'
import partlyCloudyNight from './icons/partly-cloudy-night.vue'
import rain from './icons/rain.vue'
import snow from './icons/snow.vue'
import wind from './icons/wind.vue'
</script>
<script setup>
const props = defineProps({
  weatherData: Object,
})

const days = ref(props.weatherData.days)
const currentConditions = ref(props.weatherData.currentConditions)
const icons = {
  snow: snow,
  rain: rain,
  fog: fog,
  wind: wind,
  hail: hail,
  cloudy: cloudy,
  'partly-cloudy-day': partlyCloudyDay,
  'partly-cloudy-night': partlyCloudyNight,
  'clear-day': clearDay,
  'clear-night': clearNight,
}
const tempGradient = ['#f72047', '#ffd200', '#1feaea']
const timeLabels = [
  '12am',
  ' ',
  ' ',
  '3am',
  ' ',
  ' ',
  '6am',
  ' ',
  ' ',
  '9am',
  ' ',
  ' ',
  '12pm',
  ' ',
  ' ',
  '3pm',
  ' ',
  ' ',
  '6pm',
  ' ',
  ' ',
  '9pm',
  ' ',
  ' ',
]

const tempUnit = ref(false)
const weekdayFull = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const selectedDay = ref(0)

const hourTemps = computed(() => {
  let temperatures = []
  for (let hour of days.value[selectedDay.value].hours) {
    temperatures.push(hour.temp)
  }
  return temperatures
})

const hourPrecips = computed(() => {
  let precipprobs = []
  for (let hour of days.value[selectedDay.value].hours) {
    precipprobs.push(hour.precipprob)
  }
  return precipprobs
})

function setConversion(temp, convert) {
  return convert ? (temp - 32) / 1.8 : temp
}

function setDay(num) {
  selectedDay.value = num
}
</script>

<template>
  <v-container>
    <v-sheet class="pa-5 rounded-xl" color="blue-grey-darken-4">
      <v-row>
        <v-col class="d-flex justify-space-between">
          <h1>{{ weatherData.resolvedAddress }}</h1>
          <div class="d-flex align-center ga-2">
            °F<v-switch color="primary" v-model="tempUnit" hide-details inset></v-switch>°C
          </div>
        </v-col>
        <v-divider></v-divider>
      </v-row>
      <v-row>
        <v-col class="v-col-3" style="min-width: 180px">
          <h1>FORECAST</h1>
          <v-sheet class="rounded-lg">
            <v-list class="rounded-lg" role="listbox" activatable="true" bg-color="blue-grey-darken-4" >
              <v-list-item
                v-for="day in days"
                :key="day.datetime"
                @click="setDay(days.indexOf(day))"
                color="white"
                :title="day == days[0] ? 'Today' : weekdayFull[new Date(day.datetime).getDay()]"
                :subtitle="Math.round(setConversion(day.tempmin, tempUnit))+'° - '+Math.round(setConversion(day.tempmax, tempUnit))+'°'"
                :append-icon="icons[day.icon]"
              >
              </v-list-item>
            </v-list>
          </v-sheet>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col>
          <TransitionGroup name="slide-fade">
            <v-sheet :key="selectedDay" class="rounded-lg pa-0" style="min-height: 60vh; padding: 3%" color="blue-grey-darken-4">
              <div class="d-flex justify-space-between">
                <h1 class="mb-6">
                  {{ weekdayFull[new Date(days[selectedDay].datetime).getDay()] }}
                </h1>
                <div v-if="selectedDay == 0 && !!currentConditions">
                  <h1>
                    {{
                      `Currently: ${Math.round(setConversion(currentConditions.temp, tempUnit))}`
                    }}°
                  </h1>
                  <div>
                    {{
                      `Feels Like: ${Math.round(
                        setConversion(currentConditions.feelslike, tempUnit)
                      )}`
                    }}°
                  </div>
                </div>
                <div v-else>Current data not available.</div>
              </div>
              <h2 class="d-flex ga-2 align-center">
                <component
                  class="big-icon"
                  v-if="icons[days[selectedDay].icon]"
                  :is="icons[days[selectedDay].icon]"
                />
                <div>{{ days[selectedDay].conditions }}</div>
              </h2>
              <h2>High: {{ Math.round(setConversion(days[selectedDay].tempmax, tempUnit)) }}°</h2>
              <h2>Low: {{ Math.round(setConversion(days[selectedDay].tempmin, tempUnit)) }}°</h2>
              <v-sparkline
                :model-value="hourTemps"
                color="rgba(255, 255, 255, 1)"
                height="80"
                padding="4"
                :line-width="0"
                :gradient="tempGradient"
                :labels="timeLabels"
                stroke-linecap="round"
                smooth
                fill="fill"
              ></v-sparkline>
            </v-sheet>
          </TransitionGroup>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<style>
@import '../assets/svgStyles.css';

.big-icon {
  max-width: 80px;
}

ul {
  list-style: none;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;

}

.slide-fade-leave-active {
  display: none;
  opacity: 0;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
