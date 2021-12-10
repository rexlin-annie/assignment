import * as type from '../actions/actionType';

const initialState = {
    HourlyDataResponse :[],
}

const HourlyDataReducer = (state = initialState, action) => {
    switch(action.type){
        case type.GET_WEATHER_DATA_SUCCESS:
            return {
                ...state,
                HourlyDataResponse : action.hourlyData
            }
        default:
            return state;
    }
}
export default HourlyDataReducer;