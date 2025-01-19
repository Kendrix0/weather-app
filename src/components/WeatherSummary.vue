<script setup>
const props = defineProps({
    days: Array
});

</script>

<template>
    <ul>
        <li v-for="day in days" :key="day.datetime">
            {{ day.datetime }}
        </li>
    </ul>
</template>

<style></style>