<!-- eslint-disable vue/max-attributes-per-line -->
<script type="module">
import { ref } from 'vue'
</script>
<script setup>
const props = defineProps({
    days: Array,
    currentConditions: Object
});

const tempUnit = ref(false);
const weekday = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]; 
const weekdayFull = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const selectedDay = ref(0);

function setConversion(temp, convert) {
  return convert ? ((temp - 32) / (1.8)) : temp
};

function setDay(num) {
  selectedDay.value = num
};
</script>

<template>
  <div class="v-container v-locale--is-ltr">
    <div class="v-row d-flex justify-space-between">
      <h1>10-DAY FORECAST</h1>
      <div class="d-flex align-center ga-2">°F<v-switch
    color="primary"
    v-model="tempUnit"
    hide-details
    inset
  ></v-switch>°C</div>
    </div>
      <div class="v-row">
          <div class="v-col v-col-3">
          <div class="v-sheet rounded-lg">
            <div
              class="v-list v-list--density-default v-list--one-line rounded-lg"
              tabindex="0"
              role="listbox"
            >
              <div v-for="day in days" :key="day.datetime"
                class="border-t border-b v-list-item v-list-item--link v-list-item--density-default v-list-item--one-line rounded-0 v-list-item--variant-text"
                tabindex="-2"
                @click="setDay(days.indexOf(day))"
              >
                <span class="v-list-item__overlay"></span>
                <div class="v-list-item__content" data-no-activator="">
                  <div class="v-list-item-title">{{ day == days[0] ? "Today" : weekdayFull[(new Date(day.datetime)).getDay()] }}</div>
                  <div class="v-list-item-subtitle">{{ Math.round(setConversion(day.tempmin,tempUnit)) }}° - {{ Math.round(setConversion(day.tempmax,tempUnit)) }}°</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <TransitionGroup name="slide-fade">
        <div class="v-col" :key="selectedDay">
          <div class="v-sheet rounded-lg" style="min-height: 70vh; padding: 3%;">
            <div class="d-flex justify-space-between">
              <h1 class="mb-6">{{ weekdayFull[(new Date(days[selectedDay].datetime)).getDay()] }}</h1>
              <div v-if="selectedDay == 0">
                <h1>{{ `Currently: ${Math.round(setConversion(currentConditions.temp,tempUnit))}` }}°</h1>
                <div>{{ `Feels Like: ${Math.round(setConversion(currentConditions.feelslike,tempUnit))}` }}°</div>
              </div>
            </div>
            <h2>{{ days[selectedDay].conditions }}</h2>
            <h2>High: {{ Math.round(setConversion(days[selectedDay].tempmax,tempUnit)) }}°</h2>
            <h2>Low: {{ Math.round(setConversion(days[selectedDay].tempmin,tempUnit)) }}°</h2>
            <div></div>
          </div>
        </div>
        </TransitionGroup>
      </div>
    </div>

</template>

<style>
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