import {GET, POST} from '../utils/apiService';
import { history } from '../store';
import Session from '../helpers/session';
import {loadDashboard} from './shopActions';

import {
    USER_LOGIN,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
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

export function userLogin(data) {
    return function(dispatch) {

    dispatch({
        type: USER_LOGIN
        })

    POST('user/authenticate', data)
        .then(response => {
            Session.createSession('vtech', response.data.data.user);
            dispatch(userLoginSuccess(response.data.data.user))
        })
        .catch(err => {
            dispatch(userLoginFail(err))
        });
    }

}

export const userLoginSuccess = (data) => {

    let objData = {
        "vtech" : data.id
    }

    return dispatch => {        
        dispatch(history.push("/dashboard"));
        
    }
  }
  
export const userLoginFail = (data) => {
    return dispatch => {
    dispatch({
        type: USER_LOGIN_FAIL,
        data
    })
    }
}

export function changePassword(data) {
    return function(dispatch) {

    dispatch({
        type: CHANGE_PASSWORD
        })

    POST('user/change-password', data, true)
        .then(response => {
            dispatch(changePasswordSuccess(response))
        })
        .catch(err => {
            dispatch(changePasswordFail())
        });
    }

}

export const changePasswordSuccess = (data) => {
    return dispatch => {
        dispatch({
          type: CHANGE_PASSWORD_SUCCESS,
          data
        })
      }
  }
  
  export const changePasswordFail = () => {
      return dispatch => {
        dispatch({
          type: CHANGE_PASSWORD_FAIL
        })
      }
    }

export const closeChangePasswordModal = () => {
    return dispatch => {
        dispatch({
            type: CLOSE_CHANGE_PASS_MODAL
        })
    }
}

export function sendEmailToResetPassword(data) {
    return function(dispatch) {

    dispatch({
        type: RESET_PASSWORD_EMAIL_SENT
        })

    POST('user/forgot-password', data)
        .then(response => {
            dispatch(sendEmailToResetPasswordSuccess(response))
        })
        .catch(err => {
            dispatch(sendEmailToResetPasswordFail())
        });
    }

}

export const sendEmailToResetPasswordSuccess = (data) => {
    return dispatch => {
        dispatch({
          type: RESET_PASSWORD_EMAIL_SENT_SUCCESS,
          data
        })
      }
  }
  
  export const sendEmailToResetPasswordFail = () => {
      return dispatch => {
        dispatch({
          type: RESET_PASSWORD_EMAIL_SENT_FAIL
        })
      }
    }

export function sendPassResetToken(data) {
    return function(dispatch) {

    dispatch({
        type: RESET_PASSWORD_EMAIL_TOKEN_SENT
        })

    POST('user/reset-password', data)
        .then(response => {
            dispatch(sendPassResetTokenSuccess(response))
        })
        .catch(err => {
            dispatch(sendPassResetTokenFail())
        });
    }

}

export const sendPassResetTokenSuccess = (data) => {
    return dispatch => {
        dispatch({
          type: RESET_PASSWORD_EMAIL_TOKEN_SENT_SUCCESS,
          data
        })
      }
  }
  
  export const sendPassResetTokenFail = () => {
      return dispatch => {
        dispatch({
          type: RESET_PASSWORD_EMAIL_TOKEN_SENT_FAIL
        })
      }
    }

export const userLogout = () => {
    // history.push("/");
    Session.destroy("vtech");
    Session.destroy("vtechActiveShop");
    Session.destroy("vtechIsMultipleShops");
}