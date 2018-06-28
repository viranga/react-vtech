import axios from 'axios';
import {BASE_URL, API_KEY, API_SECRET} from '../config/app.config';
import Session from '../helpers/session';

let config = {
  headers: {
    "api-key" : API_KEY,
    "api-secret" : API_SECRET,
    "Content-Type" : "application/json"
  }
}

export function GET(url, data = null, auth = false) {
  config.headers["Authorization"] = Session.getSession('vtech').accessToken;
  config["params"] = data;

  return axios.get(`${BASE_URL}${url}`, config);
};

export function POST(url, data, auth = false) {
  return axios.post(`${BASE_URL}${url}`, data, config);
};

export function POSTFILE(url, data, auth = false) {
  var req = new FormData();
  req.append('fileData', data);
  return axios.post(`${BASE_URL}${url}?public=1`, req, config);
};

export function PUT(url, data, auth = false) {
  return axios.put(`${BASE_URL}${url}`, data, config);
};