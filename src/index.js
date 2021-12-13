import './style.css';
import { geocodeByName, oneCallWeather } from './apiFunctions';

const city = document.querySelector('#city');
const state = document.querySelector('#state');
const country = document.querySelector('#country');
const units = document.querySelector('#units');
const submitBtn = document.querySelector('#submit');

submitBtn.onclick = () => {
    if (units.checked) {
        oneCallWeather('imperial', city.value, state.value, country.value);
    } else {
        oneCallWeather('metric', city.value, state.value, country.value);
    }
    city.value = '';
    state.value = '';
    country.value = '';
};