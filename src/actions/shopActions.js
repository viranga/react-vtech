import {GET, POST, PUT, POSTFILE} from '../utils/apiService';
import { history } from '../store';
import Session from '../helpers/session';

import {
    LOAD_DASHBOARD,
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

// export function loadDashboard(data) {
//     return function(dispatch) {

//     dispatch({
//         type: LOAD_DASHBOARD
//         })

//     // GET('shop/list', data, true)
//     //     .then(response => {
//     //         dispatch(loadShopSuccess(response.data.data))
//     //     })
//     //     .catch(err => {
//     //         dispatch(loadShopFail(err))
//     //     });
//      }

// }

export function loadShop(data) {
    return function(dispatch) {

    dispatch({
        type: LOAD_SHOP
        })

    GET('shop/list', data, true)
        .then(response => {
            dispatch(loadShopSuccess(response.data.data))
        })
        .catch(err => {
            dispatch(loadShopFail(err))
        });
    }

}

export const loadShopSuccess = (res) => {
    return dispatch => {
        if(res.shops.total === 1){
            dispatch(selectShop(res.shops.data[0]))
        }else{
            history.push("/shop-select");
            Session.createSession('shopFlowIsMultipleShops', 'true');
            dispatch({
                type: LOAD_MULTIPLE_SHOP_SUCCESS,
                body: res
            })
        }
    }
}
  
export const loadShopFail = (data) => {
    return dispatch => {
        dispatch({
            type: LOAD_SHOP_FAIL,
            data
        })
    }
}

export const selectShop = (data) => {
    history.push("/dashboard");
    return dispatch => {
        Session.createSession('shopFlowActiveShop', data);
        dispatch({
            type: ACTIVE_SHOP,
            body: data
        })
    }
}

export const selectShopFromList = (data) => {
    history.push("/dashboard");
    return dispatch => {
        Session.createSession('shopFlowActiveShop', data);
        dispatch({
            type: ACTIVE_SHOP_FROM_LIST,
            body: data
        })
    }
}

export function loadShopForData(data, comp) {
    return function(dispatch) {

    dispatch({
        type: LOAD_SHOP
        })

    GET('shop/list', data, true)
        .then(response => {
            dispatch(loadShopForDataSuccess(response.data.data, comp))
        })
        .catch(err => {
            dispatch(loadShopForDataFail(err))
        });
    }

}

export const loadShopForDataSuccess = (res, comp, reqData) => {
    return dispatch => {
        if(res.shops.total === 1){
            dispatch(selectShopForData(res.shops.data[0], comp))
        }else{
            dispatch({
                type: LOAD_MULTIPLE_SHOP_SUCCESS,
                body: res
            })
        }
    }
}

export const selectShopForData = (data, comp) => {
    return dispatch => {
        if(comp != null){
            let reqData;
            switch (comp) {
                case "carOwners":
                    reqData = {
                        "shopId" : data.id
                    }
                    dispatch(loadCarOwners(reqData));
                break;
                case "getVehicles":
                    reqData = {
                        "shopId" : data.id
                    }
                    dispatch(getVehicles(reqData));
                break;
                case "getSyncToolKeys":
                    reqData = {
                        "shopId" : data.id
                    }
                    dispatch(getSyncToolKeys(reqData));
                break;
                default:
                return null;
            }
        }

        dispatch({
            type: ACTIVE_SHOP,
            body: data
        })
    }
}

export const loadShopForDataFail = (data) => {
    return dispatch => {
        dispatch({
            type: LOAD_SHOP_FAIL,
            data
        })
    }
}

export const loadCarOwners = (data) => {
    return dispatch => {
        dispatch({
            type: LOAD_CAR_OWNERS
        })

        GET('car-owner-subscription/list', data, true)
        .then(response => {
            dispatch(loadCarOwnersSuccess(response.data.data.subscriptions.data))
        })
        .catch(err => {
            dispatch(loadCarOwnersFail(err))
        });
    }
}

export const loadCarOwnersSuccess = (data) => {
    return dispatch => {
        dispatch({
            type: LOAD_CAR_OWNERS_SUCCESS,
            body: data
        })
    }
}

export const loadCarOwnersFail = (data) => {
    return dispatch => {
        dispatch({
            type: LOAD_CAR_OWNERS_FAIL,
            body: data
        })
    }
}

export const updateShopProfile = (shopID, data) => {
    return dispatch => {
        dispatch({
            type: UPDATE_SHOP_PROFILE
        })

        PUT('shop/'+shopID, data, true)
        .then(response => {
            dispatch(updateShopProfileSuccess(response, data))
        })
        .catch(err => {
            dispatch(updateShopProfileFail(err))
        });
    }
}

export const updateShopProfileSuccess = (data, formData) => {
    return dispatch => {
        Session.createSession('shopFlowActiveShop', formData);
        dispatch({
            type: UPDATE_SHOP_PROFILE_SUCCESS,
            body: data,
            submitFormData: formData
        })
    }
}

export const updateShopProfileFail = (data) => {
    return dispatch => {
        dispatch({
            type: UPDATE_SHOP_PROFILE_FAIL,
            body: data
        })
    }
}

export const uploadLogo = (data) => {
    return dispatch => {
        dispatch({
            type: UPLOAD_LOGO
        })

        POSTFILE('util/s3-upload', data, true)
        .then(response => {
            dispatch(uploadLogoSuccess(response.data))
        })
        .catch(err => {
            dispatch(uploadLogoFail(err))
        });
    }
}

export const uploadLogoSuccess = (data) => {
    return dispatch => {
        dispatch({
            type: UPLOAD_LOGO_SUCCESS,
            body: data.data
        })
    }
}

export const uploadLogoFail = (data) => {
    return dispatch => {
        dispatch({
            type: UPLOAD_LOGO_FAIL,
            body: data
        })
    }
}

export const uploadBanner = (data) => {
    return dispatch => {
        dispatch({
            type: UPLOAD_BANNER
        })

        POSTFILE('util/s3-upload', data, true)
        .then(response => {
            dispatch(uploadBannerSuccess(response.data))
        })
        .catch(err => {
            dispatch(uploadBannerFail(err))
        });
    }
}

export const uploadBannerSuccess = (data) => {
    return dispatch => {
        dispatch({
            type: UPLOAD_BANNER_SUCCESS,
            body: data.data
        })
    }
}

export const uploadBannerFail = (data) => {
    return dispatch => {
        dispatch({
            type: UPLOAD_BANNER_FAIL,
            body: data
        })
    }
}

export function getShopStats(id, data = null) {
    return function(dispatch) {

    dispatch({
        type: GET_DASHBOARD_STATS
        })

    GET(`dashboard/shop/${id}/statistics`, data, true)
        .then(response => {
            dispatch(getShopStatsSuccess(response.data.data))
        })
        .catch(err => {
            dispatch(getShopStatsFail(err))
        });
    }

}

export const getShopStatsSuccess = (data) => {
    return dispatch => {
        dispatch({
            type: GET_DASHBOARD_STATS_SUCCESS,
            body: data
        })
    }
}

export const getShopStatsFail = (data) => {
    return dispatch => {
        dispatch({
            type: GET_DASHBOARD_STATS_FAIL,
            body: data
        })
    }
}

export const closeProfileResModal = () => {
    return dispatch => {
        dispatch({
            type: CLOSE_PROFILE_UPDATE_MODAL
        })
    }
}

export function sendInvitation(id, data = null) {
    return function(dispatch) {

    dispatch({
        type: SEND_INVITE
        })

    POST('car-owner-subscription/'+id+'/invite-m1-user', data)
        .then(response => {
            dispatch(sendInvitationSuccess(response))
        })
        .catch(err => {
            dispatch(sendInvitationFail(err))
        });
    }
}

export function getVehicles(data) {
    return function(dispatch) {

    dispatch({
        type: GET_VEHICLES
        })

    GET('vehicle/list', data)
        .then(response => {
            dispatch(getVehiclesSuccess(response.data.data.vehicles.data))
        })
        .catch(err => {
            dispatch(getVehiclesFail(err))
        });
    }

}

export const sendInvitationSuccess = (data) => {
    return dispatch => {
        dispatch({
            type: SEND_INVITE_SUCCESS
        });
    }
}

export const getVehiclesSuccess = (data) => {
    return dispatch => {
        dispatch({
            type: GET_VEHICLES_SUCCESS,
            body: data
        })
    }
}

export const sendInvitationFail = () => {
    return dispatch => {
        dispatch({
            type: SEND_INVITE_FAIL
        })
    }
}

export const updateCarOwnerSub = (subID, data) => {
    return dispatch => {
        dispatch({
            type: UPDATE_SUBSCRIPTION
        })

        PUT('car-owner-subscription/'+subID, data, true)
        .then(response => {
            dispatch(updateCarOwnerSubSuccess(response))
        })
        .catch(err => {
            dispatch(updateCarOwnerSubFail(err))
        });
    }
}

export const updateCarOwnerSubSuccess = (data) => {
    return dispatch => {
        dispatch({
            type: UPDATE_SUBSCRIPTION_SUCCESS
        })
    }
}

export const updateCarOwnerSubFail = () => {
    return dispatch => {
        dispatch({
            type: UPDATE_SUBSCRIPTION_FAIL
        })
    }
}

export const closeSubUpdatedModal = (data) => {
    return dispatch => {
        dispatch({
            type: CLOSE_SUB_UPDATED_MODAL
        })
        dispatch(loadCarOwners(data))
    }
}

export const closeSubInvitedModal = (data) => {
    return dispatch => {
        dispatch({
            type: CLOSE_SUB_INVITE_MODAL
        })
        dispatch(loadCarOwners(data))
    }
}

export const getVehiclesFail = (data) => {
    return dispatch => {
        dispatch({
            type: GET_VEHICLES_FAIL,
            body: data
        })
    }
}

export const carownerFilterOpt = (opt) => {
    return dispatch => {
        dispatch({
            type: CAR_OWNER_FILTERED,
            body: opt
        })
    }
}

export function getSyncToolKeys(data) {
    return function(dispatch) {

    dispatch({
        type: GET_SYNC_TOOL_KEYS
        })

    POST('user/generate-sync-tool-user-keys', data)
        .then(response => {
            dispatch(getSyncToolKeysSuccess(response.data.data))
        })
        .catch(err => {
            dispatch(getSyncToolKeysFail(err))
        });
    }

}

export const getSyncToolKeysSuccess = (data) => {
    return dispatch => {
        dispatch({
            type: GET_SYNC_TOOL_KEYS_SUCCESS,
            body: data
        });
    }
}

export const getSyncToolKeysFail = (data) => {
    return dispatch => {
        dispatch({
            type: GET_SYNC_TOOL_KEYS_FAIL,
            body: data
        })
    }
}

export function getAppointments(data) {
    return function(dispatch) {

    dispatch({
        type: GET_APPOINTMENTS
        })

    GET('booking-request/list', data)
        .then(response => {
            dispatch(getAppointmentsSuccess(response.data.data))
        })
        .catch(err => {
            dispatch(getAppointmentsFail(err))
        });
    }

}

export const getAppointmentsSuccess = (data) => {
    return dispatch => {
        dispatch({
            type: GET_APPOINTMENTS_SUCCESS,
            body: data
        })
    }
}

export const getAppointmentsFail = (data) => {
    return dispatch => {
        dispatch({
            type: GET_APPOINTMENTS_FAIL,
            body: data
        })
    }
}

export function getBookingReq(data) {
    return function(dispatch) {

    dispatch({
        type: GET_BOOKING_REQ
        })

    GET('booking-request/list', data)
        .then(response => {
            dispatch(getBookingReqSuccess(response.data.data))
        })
        .catch(err => {
            dispatch(getBookingReqFail(err))
        });
    }

}

export const getBookingReqSuccess = (data) => {
    if(data.bookingRequests.total > 0){
        return dispatch => {
            dispatch({
                type: GET_BOOKING_REQ_SUCCESS,
                body: data
            })
        }
    }
}

export const getBookingReqFail = (data) => {
    return dispatch => {
        dispatch({
            type: GET_BOOKING_REQ_FAIL,
            body: data
        })
    }
}

export const appointmentReply = (id, data) => {
    return dispatch => {
        dispatch({
            type: SEND_APPOINTMENT_REPLY
        })

        PUT('booking-request/'+id, data, true)
        .then(response => {
            dispatch(appointmentReplySuccess(response, data))
        })
        .catch(err => {
            dispatch(appointmentReplyFail(err))
        });
    }
}

export const appointmentReplySuccess = (data) => {
    return dispatch => {
        dispatch({
            type: SEND_APPOINTMENT_REPLY_SUCCESS,
            body: data
        })
    }
}

export const appointmentReplyFail = (data) => {
    return dispatch => {
        dispatch({
            type: SEND_APPOINTMENT_REPLY_FAIL,
            body: data
        })
    }
}

export const closeAppointmentModal = (data) => {
    return dispatch => {
        dispatch({
            type: HIDE_APPOINTMENT_MODAL,
        })
        dispatch(getAppointments(data))
    }
}

export const resetCarOwnerFilter = () => {
    return dispatch => {
        dispatch({
            type: RESET_CAR_OWNER_FILTER
        })
    }
}

export const hideAndRedirectBookingReq = () => {
    history.push("/appointments");
    return dispatch => {
        dispatch({
            type: HIDE_BOOKING_REQ
        })
    }
}

export const hideBookingReq = () => {
    return dispatch => {
        dispatch({
            type: HIDE_BOOKING_REQ
        })
    }
}