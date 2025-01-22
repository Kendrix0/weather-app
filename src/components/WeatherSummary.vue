<!-- eslint-disable vue/max-attributes-per-line -->
<script type="module">
import { ref } from 'vue'
</script>
<script setup>
const props = defineProps({
    days: Array
});

const weekday = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]; 
const weekdayFull = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const selectedDay = ref(props.days[0]);
function setDay(num) {
  selectedDay.value = props.days[num]
}
</script>

<template>
  <div class="v-container v-locale--is-ltr">
    <div class="v-row">
      <h1>10-DAY FORECAST</h1>
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
                  <div class="v-list-item-subtitle">{{ day.tempmin }} - {{ day.tempmax }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
          <div class="v-col">
          <div class="v-sheet rounded-lg" style="min-height: 70vh; padding: 3%;">
            <h1>{{ weekdayFull[(new Date(selectedDay.datetime)).getDay()] }}</h1>
            <div>Currently: {{ selectedDay.temp }}</div>
            <div>{{ selectedDay.conditions }}</div>
            <div>High: {{ selectedDay.tempmax }} Low: {{ selectedDay.tempmin }}</div>
            <div></div>
          </div>
        </div>
      </div>
    </div>

</template>

<style>
ul {
    list-style: none;
}
</style>