import React from "react";
import { connect } from 'react-redux';
import '../assets/HourlyForecast.css';

class HourlyForecast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hourlyData: [],
        }
    }
    componentDidMount() {
        const { lat, long } = this.props;
        const request = {
            lat: lat,
            long: long
        }
        this.props.getHourlyData(request);
    }
    componentDidUpdate(prevProps) {
        if (this.props.hourlyData !== prevProps.hourlyData) {
            if (this.props.hourlyData) {
                this.handleHourlyData(this.props.hourlyData);
            }
        }
    }
    handleHourlyData = res => {
        const hourlyData = res.data.hourly;
        this.setState({ hourlyData });
    }
    extractTime = dt => {
        let timeStr = ':00 AM';
        let dateObj = new Date(dt * 1000);
        let timeHr = dateObj.getHours();
        return (timeHr > 12 ? timeHr = (timeHr - 12) + ':00 PM' : timeHr = timeHr + timeStr);
    }
    render() {
        const { hourlyData } = this.state;
        return (
            hourlyData.length > 0 ?
                <React.Fragment>
                    <div className='forecast-container'>
                        <h3 className='forecast-heading'>{'Hourly Forecast'}</h3>
                        <div className='forecast-items'>
                            {hourlyData.map((item, i) => {
                                const url = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
                                return (
                                    <div className='forecast-item' key={i}>
                                        <p className='forecast-hour'>{this.extractTime(item.dt)}</p>
                                        <p className='forecast-temp'>{`${Math.round(item.temp)}°C`}</p>
                                        <img src={url} alt={item.weather[0].description} />
                                        <p className='forecast-title'>{item.weather[0].main}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </React.Fragment> : ''
        )
    }
}
const mapStateToProps = state => {
    return {
        hourlyData: state.HourlyDataReducer.HourlyDataResponse,
    };
};

const mapDispatchToProps = dispatch => ({
    getHourlyData: request => dispatch({ type: 'GET_HOURLY_WEATHER_DATA', payload: request }),
});


export default connect(mapStateToProps, mapDispatchToProps)(HourlyForecast);