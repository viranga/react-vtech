/**
 * This class Will Handle browser sessions
 */

// import Cookies from 'js-cookie';
const Cookies = require('js-cookie');

Cookies.defaults = {
  path: '/'
};

class Session {
  constructor() {
    this.expires = null;
    this.exdays = 30;
  }

  isSessionSet(key) {
    if (this.getSession(key) != null) {
      return true;
    }
    return false;
  }

  updateSession(cookie, key, value) {
    const oSession = this.getSession(cookie);
    oSession[key] = value;
    this.createSession(cookie, oSession);
  }

  createSession(key, value, rememberMe = false) {
    const expires = rememberMe ? Infinity : 36000; // 10 hours
    value = JSON.stringify(value);
    Cookies.set(key, value, {expires});
  }

  getSession(key) {

    const _session = Cookies.get(key);
    // console.log("_session ... ", _session)
    return _session ? JSON.parse(_session) : '';
    // const _session = getCookie(key);
    // console.log("_session ... ", _session)
    // return _session;
  }

  destroy(key) {
    console.log('destroy');
    Cookies.remove(key);
    // expireCookie(key)

    // this.exdays = -1;
    // this.createSession(key, "");
    let url = window.location.protocol+'//'+window.location.hostname+(window.location.port ? ':'+window.location.port: '') + "/";

    window.location = url;
  }

}

export default new Session();
