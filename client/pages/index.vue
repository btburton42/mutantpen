
<template>
  <div>
    <h1>This is the Front Page.</h1>
    <h3>Random dog of the day:</h3>
    <img :src="dog.url" alt="">
    <button
      class="btn btn-primary btn-margin"
      @click="login()">
      Log In
    </button>
    <!-- <button
      class="btn btn-primary btn-margin"
      v-if="authenticated"
      @click="logout()">
        Log Out
    </button> -->
  </div>
</template>

<script>
import AuthService from "./../libs/AuthService";
const auth = new AuthService();
const { login } = auth;

import axios from "axios";
export default {
  async asyncData({ params }) {
    const { data } = await axios.get(
      "https://api.thedogapi.com/v1/images/search?limit=1"
    );
    return { dog: data[0] };
  },
  methods: {
    login
  }
};
</script>