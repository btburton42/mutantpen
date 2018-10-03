import auth0 from 'auth0-js'
import EventEmitter from 'eventemitter3'

import {
  AUTH_CONFIG
} from './../../secrets.json'

export default class AuthService {
  constructor() {
    this.login = this.login.bind(this)
    // this.setSession = this.setSession.bind(this)
    // this.logout = this.logout.bind(this)
    // this.isAuthenticated = this.isAuthenticated.bind(this)
    // console.log(layout)
    this.auth0 = new auth0.WebAuth({
      domain: AUTH_CONFIG.DOMAIN,
      clientID: AUTH_CONFIG.CLIENT_ID,
      redirectUri: AUTH_CONFIG.REDIRECT_URI,
      responseType: AUTH_CONFIG.RESPONSE_TYPE,
      scope: AUTH_CONFIG.SCOPE
    })
  }

  get authenticated() {
    return this.isAuthenticated();
  }
  get authNotifier() {
    return new EventEmitter();
  }

  login() {
    this.auth0.authorize()
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        console.warn(err);
      }
    })
  }

  setSession(authResult) {
    if (process.server) return
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    window.localStorage.setItem('access_token', authResult.accessToken)
    window.localStorage.setItem('id_token', authResult.idToken)
    window.localStorage.setItem('expires_at', expiresAt)
    this.authNotifier.emit('authChange', {authenticated:true})
  }

  logout() {
    if (process.server) return
    window.localStorage.removeItem('access_token')
    window.localStorage.removeItem('id_token')
    window.localStorage.removeItem('expires_at')
    this.userProfile = null
    this.authNotifier.emit('authChange', false)
  }

  isAuthenticated() {
    if (process.server) return
    let expiresAt = JSON.parse(window.localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }
}