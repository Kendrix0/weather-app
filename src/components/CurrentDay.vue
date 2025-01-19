<script setup>
const props = defineProps({
    days: Array
});

const weekday = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]; 
</script>

<template>
    <h1>CURRENT CONDITIONS</h1>
    <div>{{ days[0] }}</div>
</template>

<style>
ul {
    list-style: none;
}
</style>