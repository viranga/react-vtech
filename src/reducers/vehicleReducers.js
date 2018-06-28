import {
    GET_VEHICLE_HISTORY,
    GET_VEHICLE_HISTORY_SUCCESS,
    GET_VEHICLE_HISTORY_FAIL,
    GET_VEHICLE_RECOMMENDATION,
    GET_VEHICLE_RECOMMENDATION_SUCCESS,
    GET_VEHICLE_RECOMMENDATION_FAIL,
} from '../constants/vehicleConstants';

const initialState = {
  is_loading: null,
  vehicle_history: null,
  vehicle_recommendation: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
      case GET_VEHICLE_HISTORY:
        return {
          ...state,
          is_loading: true
        }
  
      case GET_VEHICLE_HISTORY_SUCCESS:
        return {
          ...state,
          is_loading: false,
          vehicle_history: action.body.data
        }
  
      case GET_VEHICLE_HISTORY_FAIL:
        return {
          ...state,
          is_loading: false,
        }
      case GET_VEHICLE_RECOMMENDATION:
        return {
          ...state,
          is_loading: true
        }
  
      case GET_VEHICLE_RECOMMENDATION_SUCCESS:
        return {
          ...state,
          is_loading: false,
          vehicle_recommendation: action.body.data
        }
  
      case GET_VEHICLE_RECOMMENDATION_FAIL:
        return {
          ...state,
          is_loading: false,
        }
  
      default:
        return state
    }
  }