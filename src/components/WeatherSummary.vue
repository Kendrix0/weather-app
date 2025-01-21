<!-- eslint-disable vue/max-attributes-per-line -->
<script setup>
const props = defineProps({
    days: Array
});

const weekday = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]; 
</script>

<template>
  <h1>10-DAY FORECAST</h1>
  <div class="v-container v-locale--is-ltr">
      <div class="v-row">
        <div class="v-col v-col-2">
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
                  <div class="v-list-item-title">{{ weekday[(new Date(day.datetime)).getDay()] }}:</div>
                </div>
              </div>
            </div>
          </div>
        </div>
          <div class="v-col">
            {{ days[0] }}
          <div class="v-sheet v-theme--light rounded-lg" style="min-height: 70vh"></div>
        </div>
      </div>
    </div>

</template>

<style>
ul {
    list-style: none;
}
</style>