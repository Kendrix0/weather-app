<!-- eslint-disable vue/max-attributes-per-line -->
<script setup>
const props = defineProps({
    days: Array
});

const weekday = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]; 
const weekdayFull = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
</script>

<template>
  <div class="v-container v-locale--is-ltr">
    <div class="v-row">
      <h1>10-DAY FORECAST</h1>
    </div>
      <div class="v-row">
        <div class="v-col v-col-3">
          <div class="v-sheet v-theme--light rounded-lg">
            <div
              class="v-list v-theme--light v-list--density-default v-list--one-line rounded-lg"
              tabindex="0"
              role="listbox"
            >
              <div v-for="day in days" :key="day.datetime"
                class="v-list-item v-list-item--link v-theme--light v-list-item--density-default v-list-item--one-line rounded-0 v-list-item--variant-text"
                tabindex="-2"
              >
                <span class="v-list-item__overlay"></span>
                <span class="v-list-item__underlay"></span>
                <div class="v-list-item__content" data-no-activator="">
                  <div class="v-list-item-title">{{ day == days[0] ? "Today" : weekday[(new Date(day.datetime)).getDay()] }}: {{ day.tempmin }} - {{ day.tempmax }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
          <div class="v-col">
          <div class="v-sheet v-theme--light rounded-lg" style="min-height: 70vh">
            <div>{{ weekdayFull[(new Date(days[0].datetime)).getDay()] }}</div>
            <div>Currently: {{ days[0].temp }}</div>
            <div>{{ days[0].conditions }}</div>
            <div>High: {{ days[0].tempmax }} Low: {{ days[0].tempmin }}</div>
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