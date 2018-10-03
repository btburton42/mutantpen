<template>
  <nav class="nav">
    <ul>
      <li>
        <nuxt-link to="/">Home</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/dogs">Dogs</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/dogs/shepherd">Only Shepherds</nuxt-link>
      </li>
      <li>
        <button
          class="btn btn-primary btn-margin"
          v-if="!authenticated"
          v-bind="$attrs"
          @click="login()">
            Log In
        </button>
      </li>
      <li>
        <button
          class="btn btn-primary btn-margin"
          v-if="authenticated"
          v-bind="$attrs"
          @click="logout()">
            Log Out
        </button>
      </li>
      <li>
        {{$store.state.hasToken}}
          <button @click="$store.commit('increment')">{{ $store.state.counter }}</button>
      </li>
    </ul>
  </nav>
</template>
<script>
import AuthService from "./../libs/AuthService";
const auth = new AuthService();
const { login, logout, authenticated, authNotifier } = auth;

export default {
  data() {
    if (this.$store.state.hasToken) {
      console.log('here')
      auth.handleAuthentication()
    }
    authNotifier.on('authChange', authState => {
      this.authenticated = authState.get('authenticated');
    })
    return {
      auth,
      authenticated
    }
  },
  methods: {
    login,
    logout
  }
}
</script>
