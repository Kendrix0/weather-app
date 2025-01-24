<!-- eslint-disable vue/max-attributes-per-line -->
<script type="module">
import { ref } from 'vue'
import clearDay from './icons/clear-day.vue';
import clearNight from './icons/clear-night.vue';
import cloudy from './icons/cloudy.vue';
import fog from './icons/fog.vue';
import hail from './icons/hail.vue';
import partlyCloudyDay from './icons/partly-cloudy-day.vue';
import partlyCloudyNight from './icons/partly-cloudy-night.vue';
import rain from './icons/rain.vue';
import snow from './icons/snow.vue';
import wind from './icons/wind.vue';

</script>
<script setup>
const props = defineProps({
  days: Array,
  currentConditions: Object,
})
const icons = {'snow':snow, 'rain':rain, 'fog':fog, 'wind':wind, 'hail':hail, 'cloudy':cloudy, 'partly-cloudy-day':partlyCloudyDay, 'partly-cloudy-night':partlyCloudyNight, 'clear-day':clearDay, 'clear-night':clearNight}
const tempUnit = ref(false)
const weekdayFull = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const selectedDay = ref(0)

function setConversion(temp, convert) {
  return convert ? (temp - 32) / 1.8 : temp
}

function setDay(num) {
  selectedDay.value = num
}
</script>

<template>
  <v-container>
    <v-row class="d-flex justify-space-between">
      <h1>10-DAY FORECAST</h1>
      <div class="d-flex align-center ga-2">
        °F<v-switch color="primary" v-model="tempUnit" hide-details inset></v-switch>°C
      </div>
    </v-row>
    <v-row>
      <v-col class="v-col-3">
        <v-sheet class="rounded-lg">
          <v-list
            class="rounded-lg"
            tabindex="0"
            role="listbox"
          >
            <v-list-item
              v-for="day in days"
              :key="day.datetime"
              class="border-t border-b"
              tabindex="-2"
              @click="setDay(days.indexOf(day))"
            >
              <div class="v-list-item__content d-flex justify-space-between">
                <div>
                <div class="v-list-item-title">
                  {{ day == days[0] ? 'Today' : weekdayFull[new Date(day.datetime).getDay()] }}
                </div>
                <div class="v-list-item-subtitle">
                  {{ Math.round(setConversion(day.tempmin, tempUnit)) }}° -
                  {{ Math.round(setConversion(day.tempmax, tempUnit)) }}°
                </div>
              </div>
                <component class="icon" v-if="icons[day.icon]" :is="icons[day.icon]"/>
              </div>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-col>
      <TransitionGroup name="slide-fade">
        <v-col :key="selectedDay">
          <v-sheet class="rounded-lg" style="min-height: 70vh; padding: 3%">
            <div class="d-flex justify-space-between">
              <h1 class="mb-6">{{ weekdayFull[new Date(days[selectedDay].datetime).getDay()] }}</h1>
              <div v-if="selectedDay == 0 && !!currentConditions">
                <h1>
                  {{ `Currently: ${Math.round(setConversion(currentConditions.temp, tempUnit))}` }}°
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
            <h2 class="d-flex ga-2"><component class="big-icon" v-if="icons[days[selectedDay].icon]" :is="icons[days[selectedDay].icon]"/><div>{{ days[selectedDay].conditions }}</div></h2>
            <h2>High: {{ Math.round(setConversion(days[selectedDay].tempmax, tempUnit)) }}°</h2>
            <h2>Low: {{ Math.round(setConversion(days[selectedDay].tempmin, tempUnit)) }}°</h2>
            <div></div>
          </v-sheet>
        </v-col>
      </TransitionGroup>
    </v-row>
  </v-container>
</template>

<style>
@import '../assets/svgStyles.css';

.big-icon {
  max-width: 50px;
}

.icon {
  max-width: 30px;
}
ul {
  list-style: none;
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
