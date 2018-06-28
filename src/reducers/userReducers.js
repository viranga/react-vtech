import {
    USER_LOGIN,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    CHANGE_PASSWORD,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAIL,
    CLOSE_CHANGE_PASS_MODAL,
    RESET_PASSWORD_EMAIL_SENT,
    RESET_PASSWORD_EMAIL_SENT_SUCCESS,
    RESET_PASSWORD_EMAIL_SENT_FAIL,
    RESET_PASSWORD_EMAIL_TOKEN_SENT,
    RESET_PASSWORD_EMAIL_TOKEN_SENT_SUCCESS,
    RESET_PASSWORD_EMAIL_TOKEN_SENT_FAIL,
} from '../constants/appConstants';

const initialState = {
    user_data: null,
    is_loading: null,
    login_fail: null,
    change_password: null,
    change_password_modal: null,
    change_password_req_sent: null,
    reset_password_email_valid: null,
    reset_password_success: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
      case USER_LOGIN:
        return {
          ...state,
          is_loading: true
        }
  
      case USER_LOGIN_SUCCESS:
        return {
          ...state,
          is_loading: true,
          login_fail: false,
          user_data: action.body.data.user,          
          reset_password_email_valid: false,
          reset_password_success: false,
        }
  
      case USER_LOGIN_FAIL:
        return {
          ...state,
          is_loading: false,
          login_fail: true
        }

      case CHANGE_PASSWORD:
        return {
          ...state,
          change_password_req_sent: true
        }
  
      case CHANGE_PASSWORD_SUCCESS:
        return {
          ...state,
          change_password_req_sent: false,
          change_password: true,
          change_password_modal: true,
        }
  
      case CHANGE_PASSWORD_FAIL:
        return {
          ...state,
          change_password_req_sent: false,
          change_password: false,
          change_password_modal: true,
        }

      case CLOSE_CHANGE_PASS_MODAL:
        return {
          ...state,
          change_password: null,
          change_password_modal: false,
        }

      case RESET_PASSWORD_EMAIL_SENT:
        return {
          ...state,
          is_loading: true,
        }

      case RESET_PASSWORD_EMAIL_SENT_SUCCESS:
        return {
          ...state,
          is_loading: false,
          reset_password_email_valid: true,
        }

      case RESET_PASSWORD_EMAIL_SENT_FAIL:
        return {
          ...state,
          is_loading: false,
        }

      case RESET_PASSWORD_EMAIL_TOKEN_SENT:
        return {
          ...state,
          is_loading: true,
        }

      case RESET_PASSWORD_EMAIL_TOKEN_SENT_SUCCESS:
        return {
          ...state,
          is_loading: false,
          reset_password_email_valid: true,
          reset_password_success: true,
        }

      case RESET_PASSWORD_EMAIL_TOKEN_SENT_FAIL:
        return {
          ...state,
          is_loading: false,
          reset_password_email_valid: false,
          reset_password_success: false,
        }
  
      default:
        return state
    }
  }