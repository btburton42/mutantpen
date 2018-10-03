<template>
  <div class="spinner">
    <img src="https://media.giphy.com/media/xUPGcKg2zgJoS4TBWo/giphy.gif" alt="">
  </div>
</template>

<script>
export default {
  name: 'callback',
  data() {
    this.$store.commit('toggleOn');
    return {}
  }

}
</script>