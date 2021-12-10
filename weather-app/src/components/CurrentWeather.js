import React from 'react';
import HourlyForecast from './HourlyForecast';
import { getCurrentWeatherData } from './WeatherAPI';
import '../assets/CurrentWeather.css'

class CurrentWeather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: '',
            longitude: '',
            showData: false,
        }
    }
    dateBuilder = d => {
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let day = days[d.getDay()];
        let month = months[d.getMonth()];
        let date = d.getDate();
        let year = d.getFullYear();
        return `${day} ${date} ${month} ${year}`;
    }
    async componentDidMount() {
        try {
            let response = await getCurrentWeatherData(this.props.location);
            const longitude = response.data.coord.lon;
            const latitude = response.data.coord.lat;
            const temp = Math.round(response.data.main.temp);
            const cityName = response.data.name;
            const title = response.data.weather[0].main;
            const icon = response.data.weather[0].icon;
            this.setState({
                latitude,
                longitude,
                temp,
                cityName,
                title,
                icon,
                showData: true //flag to display the final data to prevent showing undefined
            });
        } catch (error) {
            if(error.message.indexOf('404')){ // resource not found
                alert('City not found. Please enter a valid city!');
            }else{
                alert(error.message);// displays network error or any other error
            }
        }

    }
    render() {
        const { latitude, longitude, cityName, temp, title, showData, icon } = this.state;
        const url = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        return (
            showData && <React.Fragment>
                <div className='current-weather'>
                    <div className='current-weather-block'>
                        <p className='current-weather-city'>{cityName}</p>
                        <div className='current-weather-main'>
                            <img src={url} alt={title} />
                            <div className='current-weather-col'>
                                <p className='current-weather-temp'>{`${temp}°C`}</p>
                                <p className='current-weather-title'>{title}</p>
                            </div>
                        </div>
                        <p className='current-weather-date'>{this.dateBuilder(new Date())}</p>
                    </div>
                </div>
                <HourlyForecast lat={latitude} long={longitude} />
            </React.Fragment>
        )

    }
}
export default CurrentWeather;