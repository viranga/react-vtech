import Session from '../helpers/session';

import {
    LOAD_SHOP,
    LOAD_SHOP_FAIL,
    ACTIVE_SHOP,
    ACTIVE_SHOP_FROM_LIST,
    LOAD_CAR_OWNERS,
    LOAD_CAR_OWNERS_SUCCESS,
    LOAD_CAR_OWNERS_FAIL,
    LOAD_MULTIPLE_SHOP_SUCCESS,
    UPDATE_SHOP_PROFILE,
    UPDATE_SHOP_PROFILE_SUCCESS,
    UPDATE_SHOP_PROFILE_FAIL,
    UPLOAD_LOGO,
    UPLOAD_LOGO_SUCCESS,
    UPLOAD_LOGO_FAIL,
    UPLOAD_BANNER,
    UPLOAD_BANNER_SUCCESS,
    UPLOAD_BANNER_FAIL,
    GET_DASHBOARD_STATS,
    GET_DASHBOARD_STATS_SUCCESS,
    GET_DASHBOARD_STATS_FAIL,
    CLOSE_PROFILE_UPDATE_MODAL,
    SEND_INVITE,
    SEND_INVITE_SUCCESS,
    SEND_INVITE_FAIL,
    UPDATE_SUBSCRIPTION,
    UPDATE_SUBSCRIPTION_SUCCESS,
    UPDATE_SUBSCRIPTION_FAIL,
    CLOSE_SUB_UPDATED_MODAL,
    CLOSE_SUB_INVITE_MODAL,
    GET_VEHICLES,
    GET_VEHICLES_SUCCESS,
    GET_VEHICLES_FAIL,
    CAR_OWNER_FILTERED,
    GET_SYNC_TOOL_KEYS,
    GET_SYNC_TOOL_KEYS_SUCCESS,
    GET_SYNC_TOOL_KEYS_FAIL,
    GET_APPOINTMENTS,
    GET_APPOINTMENTS_SUCCESS,
    GET_APPOINTMENTS_FAIL,
    SEND_APPOINTMENT_REPLY,
    SEND_APPOINTMENT_REPLY_SUCCESS,
    SEND_APPOINTMENT_REPLY_FAIL,
    HIDE_APPOINTMENT_MODAL,
    RESET_CAR_OWNER_FILTER,
    GET_BOOKING_REQ,
    GET_BOOKING_REQ_SUCCESS,
    GET_BOOKING_REQ_FAIL,
    HIDE_BOOKING_REQ,
} from '../constants/shopConstants';

const initialState = {
    shop_list_data: null,
    shop_data: (Session.getSession('vtechActiveShop') != "")? Session.getSession('vtechActiveShop') : null ,
    is_loading: true,
    is_uploading_logo: null,
    is_uploading_banner: null,
    profile_updated: false,
    car_owners_list: null,
    is_multiple_shops: (Session.getSession('vtechIsMultipleShops') != "")? Session.getSession('vtechIsMultipleShops') : null,
    profile_data: null,
    uploadedLogo: null,
    uploadedBanner: null,
    redirectToDashboard: null,
    uploadedLogoName: null,
    uploadedBannerName: null,
    is_stat_loading: null,
    shopStats: null,
    sub_updated: false,
    sub_invited: false,
    vehicle_list: null,
    filter_opt: "",
    syncToolKeys: null,
    is_appointment_loading: true,
    appointment_list: null,
    is_appointment_modal_visible: null,
    isBookingReqVisible: null
}

export default (state = initialState, action) => {
    switch (action.type) {
      case LOAD_SHOP:
        return {
          ...state,
          is_loading: true
        }
  
      case LOAD_MULTIPLE_SHOP_SUCCESS:
        return {
          ...state,
          is_loading: false,
          is_multiple_shops: true,
          shop_list_data: action.body.shops
        }
  
      case ACTIVE_SHOP:
        return {
          ...state,
          is_loading: false,
          shop_data: action.body,
          redirectToDashboard : false,
          shopStats : null,
        }
        
        case ACTIVE_SHOP_FROM_LIST:
        return {
          ...state,
          is_loading: false,
          shop_data: action.body,
          redirectToDashboard: true,
          shopStats : null,
        }

      case LOAD_SHOP_FAIL:
        return {
          ...state,
          is_loading: false
        }
      
      case LOAD_CAR_OWNERS:
        return {
          ...state,
          is_loading: true
        }

      case LOAD_CAR_OWNERS_SUCCESS:
        return {
          ...state,
          is_loading: false,
          car_owners_list: action.body
        }

      case LOAD_CAR_OWNERS_FAIL:
        return {
          ...state,
          is_loading: false
        }
      
      case UPDATE_SHOP_PROFILE:
        return {
          ...state,
          is_loading: true,
          profile_updated: false,
        }

      case UPDATE_SHOP_PROFILE_SUCCESS:
        return {
          ...state,
          is_loading: false,
          profile_data : action.body,
          shop_data: action.submitFormData,
          profile_updated: true,
        }
        
        case UPDATE_SHOP_PROFILE_FAIL:
        return {
          ...state,
          is_loading: false,
          profile_updated: false,
        }
      
      case CLOSE_PROFILE_UPDATE_MODAL:
        return {
          ...state,
          profile_updated: false,
        }
      
      case UPLOAD_LOGO:
        return {
          ...state,
          is_uploading_logo: true,
        }

      case UPLOAD_LOGO_SUCCESS:
        return {
          ...state,
          is_uploading_logo: false,
          uploadedLogo: action.body.location,
          uploadedLogoName: action.body.fileName
        }

      case UPLOAD_LOGO_FAIL:
        return {
          ...state,
          is_uploading_logo: false,
        }
      
      case UPLOAD_BANNER:
        return {
          ...state,
          is_uploading_banner: true,
        }

      case UPLOAD_BANNER_SUCCESS:
        return {
          ...state,
          is_uploading_banner: false,
          uploadedBanner: action.body.location,
          uploadedBannerName: action.body.fileName,
        }

      case UPLOAD_BANNER_FAIL:
        return {
          ...state,
          is_uploading_banner: false,
        }
      
      case GET_DASHBOARD_STATS:
        return {
          ...state,
          is_stat_loading: true,
        }
        
      case GET_DASHBOARD_STATS_SUCCESS:
        return {
          ...state,
          is_stat_loading: false,
          is_loading: false,
          shopStats : action.body
        }

      case GET_DASHBOARD_STATS_FAIL:
        return {
          ...state,
          is_stat_loading: false,
          is_loading: false,
        }
      
      case UPDATE_SUBSCRIPTION:
        return {
          ...state,
          is_loading: true,
        }
        
      case UPDATE_SUBSCRIPTION_SUCCESS:
        return {
          ...state,
          is_loading: false,
          sub_updated: true
        }

      case UPDATE_SUBSCRIPTION_FAIL:
        return {
          ...state,
          is_loading: false,
        }
      
      case CLOSE_SUB_UPDATED_MODAL:
        return {
          ...state,
          sub_updated: false
        }
        
      case SEND_INVITE:
        return {
          ...state,
          is_loading: true,
        }      
        
      case SEND_INVITE_SUCCESS:
        return {
          ...state,
          is_loading: false,
          sub_invited: true
        }

      case SEND_INVITE_FAIL:
        return {
          ...state,
          is_loading: false,
        }

      case GET_VEHICLES:
        return {
          ...state,
          is_loading: true,
        }

      case GET_VEHICLES_SUCCESS:
        return {
          ...state,
          is_loading: false,
          vehicle_list: action.body,
        }

      case GET_VEHICLES_FAIL:
        return {
          ...state,
          is_loading: false,
        }
      
      case CLOSE_SUB_INVITE_MODAL:
        return {
          ...state,
          sub_invited: false
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

      case GET_SYNC_TOOL_KEYS:
        return {
          ...state,
          is_loading: true,
        }
      
      case GET_SYNC_TOOL_KEYS_SUCCESS:
        return {
          ...state,
          is_loading: false,
          syncToolKeys: action.body
        }

      case GET_SYNC_TOOL_KEYS_FAIL:
        return {
          ...state,          
          is_loading: false,
        }

      case GET_APPOINTMENTS:
        return {
          ...state,
          is_appointment_loading: true,
        }
      
      case GET_APPOINTMENTS_SUCCESS:
        return {
          ...state,
          is_appointment_loading: false,
          appointment_list: action.body.bookingRequests.data
        }

      case GET_APPOINTMENTS_FAIL:
        return {
          ...state,          
          is_appointment_loading: false,
        }

      case SEND_APPOINTMENT_REPLY:
        return {
          ...state,
          is_appointment_loading: true,
        }
      
      case SEND_APPOINTMENT_REPLY_SUCCESS:
        return {
          ...state,
          is_appointment_loading: false,
          is_appointment_modal_visible: true
        }

      case SEND_APPOINTMENT_REPLY_FAIL:
        return {
          ...state,          
          is_appointment_loading: false,
        }

      case HIDE_APPOINTMENT_MODAL:
        return {
          ...state,          
          is_appointment_modal_visible: false,
        }
        
      case GET_BOOKING_REQ:
        return {
          ...state,          
          isBookingReqVisible: false,
        }
        
      case GET_BOOKING_REQ_SUCCESS:
        return {
          ...state,          
          isBookingReqVisible: true,
          numberOfAppointments: action.body.bookingRequests.total
        }
        
      case GET_BOOKING_REQ_FAIL:
        return {
          ...state,          
          isBookingReqVisible: false,
        }

      case HIDE_BOOKING_REQ:
        return {
          ...state,          
          isBookingReqVisible: false,
        }
  
      default:
        return state
    }
  }