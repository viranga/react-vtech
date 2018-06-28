import {
  SEND_NOTIFICATION_SUCCESS,
  SEND_NOTIFICATION_FAIL,
  SEND_NOTIFICATION,
  CLOSE_NOTIFY_RES_MODAL,
  CAR_OWNER_FILTERED,
  RESET_CAR_OWNER_FILTER,  
  LOAD_NOTIFICATIONS_HISTORY,
  LOAD_NOTIFICATIONS_HISTORY_SUCCESS,
  LOAD_NOTIFICATIONS_HISTORY_FAIL,
} from '../constants/notificationConstants';

const initialState = {
    notification_response: null,
    is_loading: false,
    notification_Sent: false,
    filter_opt: "",
    notification_history: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
      case SEND_NOTIFICATION:
        return {
          ...state,
          is_loading: true
        }
  
      case SEND_NOTIFICATION_SUCCESS:
        return {
          ...state,
          is_loading: false,
          notification_Sent: true,
          notification_response: action.body
        }

      case SEND_NOTIFICATION_FAIL:
        return {
          ...state,
          is_loading: false
        }
      
      case CLOSE_NOTIFY_RES_MODAL:
        return {
          ...state,
          notification_Sent: false
        }

      case CAR_OWNER_FILTERED:
        return {
            ...state,
            filter_opt: action.body
        }

      case RESET_CAR_OWNER_FILTER:
          return {
              ...state,
              filter_opt: ""
          }

      case LOAD_NOTIFICATIONS_HISTORY:
        return {
          ...state,
          is_loading: true,
          notification_history: null
        }

      case LOAD_NOTIFICATIONS_HISTORY_SUCCESS:
        return {
            ...state,
            is_loading: false,
            notification_history: action.body
        }

      case LOAD_NOTIFICATIONS_HISTORY_FAIL:
          return {
              ...state,
              is_loading: false,
              notification_history: null
          }
  
      default:
        return state
    }
  }