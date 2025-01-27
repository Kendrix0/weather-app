<script setup>
const props = defineProps({
  days: Object,
  selectedDay: Number,
  tempUnit: Boolean
})
import { ref, computed } from 'vue'
import { Tooltip } from 'vuetify/directives'

const days = ref(props.days)
const selectedDay = ref(props.selectedDay)
const tempUnit = ref(props.tempUnit)

const hourTemps = computed(() => {
  let temperatures = []
  for (let hour of days.value[selectedDay.value].hours) {
    temperatures.push([(hour.datetimeEpoch+7200)*1000,Math.round(setConversion(hour.temp,tempUnit.value))])
  }
  return temperatures
})

const hourFeels = computed(() => {
  let feels = []
  for (let hour of days.value[selectedDay.value].hours) {
    feels.push([(hour.datetimeEpoch+7200)*1000,Math.round(setConversion(hour.feelslike,tempUnit.value))])
  }
  return feels
})

const hourPrecip = computed(() => {
  let feels = []
  for (let hour of days.value[selectedDay.value].hours) {
    feels.push([(hour.datetimeEpoch+7200)*1000,hour.precipprob])
  }
  return feels
})

function setConversion(temp, convert) {
  return convert ? (temp - 32) / 1.8 : temp
}

let chartOptions = {
    theme: {
      mode: 'dark', 
        palette: 'palette1', 
        monochrome: {
            enabled: false,
            shadeTo: 'light',
            shadeIntensity: 0.65
        },
    },
    chart: {
        type: 'area'
    },
    series: [
        {
            name: 'Temp',
            data: hourTemps.value
        },
        {
            name: 'Feels Like',
            data: hourFeels.value,
            hidden: true
        },
        {
            name: 'Chance of Precipitation',
            data: hourPrecip.value,
            hidden: true
        }
    ],
    xaxis: {
        type: 'datetime',
        labels:{
            format: 'HH:mm',
        }
    },
    yaxis: {
        show: false,
    },
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            type: "vertical",
            shadeIntensity: 0.5,
            gradientToColors: ['#f72047'],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 0.9,
            stops: [0, 50, 100],
            colorStops: []
        }
    },
    dataLabels: {
        formatter: function(val, opt) {
            return val + '°'
        },
    },
    legend: {
        labels: {
          colors: ['#FFF'],
          useSeriesColors: false
      },
    },
    tooltip: {
        x: {
            format: 'HH:mm'
        }
    }
}

</script>

<template>
    <div>
      <apexchart  width="90%" :v-model="tempUnit" :options="chartOptions" :series="chartOptions.series"></apexchart>
    </div>
</template>