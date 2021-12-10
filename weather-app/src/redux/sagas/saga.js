import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_HOURLY_WEATHER_DATA, GET_WEATHER_DATA_SUCCESS } from '../actions/actionType';
import { getHourlyForecastData } from '../../components/WeatherAPI';

function* mySaga(){
    yield takeEvery(GET_HOURLY_WEATHER_DATA,fetchWeatherAPI);
}
function* fetchWeatherAPI(action){
    const { lat, long } = action.payload;
    const hourlyData = yield call(getHourlyForecastData,lat,long);
    yield put({type: GET_WEATHER_DATA_SUCCESS, hourlyData});
}
export default mySaga;