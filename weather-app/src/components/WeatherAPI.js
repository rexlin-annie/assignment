import axios from 'axios';

export function getCurrentWeatherData(location){
    const key = '304835312fdd029d07c540a876ec147e';
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${key}`);
}

export function getHourlyForecastData(lat,long){
    const key = '304835312fdd029d07c540a876ec147e';
    //return axios.get(`https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${location}&units=metric&appid=${key}`).then(response => response.json());
    return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=${key}`);
}