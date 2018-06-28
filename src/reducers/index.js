import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userReducers from './userReducers';
import shopReducers from './shopReducers';
import notificationReducers from './notificationReducers';
import vehicleReducers from './vehicleReducers';

export default combineReducers({
  routing: routerReducer,
  user: userReducers,
  shop: shopReducers,
  notifications: notificationReducers,
  vehicles: vehicleReducers,
})