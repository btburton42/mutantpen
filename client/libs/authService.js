import auth0 from 'auth0-js'
// import EventEmitter from 'eventemitter3'
// import router from './../router'
import {
  AUTH_VARS
} from './../../secrets.json'

export default class AuthService {

  constructor() {
    this.login = this.login.bind(this)
    // this.setSession = this.setSession.bind(this)
    // this.logout = this.logout.bind(this)
    // this.isAuthenticated = this.isAuthenticated.bind(this)
    this.auth0 = new auth0.WebAuth({
      domain: AUTH_VARS.DOMAIN,
      clientID: AUTH_VARS.CLIENT_ID,
      redirectUri: AUTH_VARS.REDIRECT_URI,
      responseType: AUTH_VARS.RESPONSE_TYPE,
      scope: AUTH_VARS.SCOPE
    })
    console.log(this);
  }

  login() {
    this.auth0.authorize()
  }
}