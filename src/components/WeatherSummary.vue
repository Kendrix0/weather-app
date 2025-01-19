<script setup>
const props = defineProps({
    days: Array
});

const weekday = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]; 
</script>

<template>
    <h1>10-DAY FORECAST</h1>
    <ul>
        <li v-for="day in days" :key="day.datetime">
            <div>
                <div>{{ weekday[(new Date(day.datetime)).getDay()] }}:</div>
                <p>{{ day.conditions }}</p>
                {{ day.tempmin }} - {{ day.tempmax }}
            </div><br>
        </li>
    </ul>
</template>

<style>
ul {
    list-style: none;
}
</style>