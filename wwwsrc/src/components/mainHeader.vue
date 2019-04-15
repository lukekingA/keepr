<template>
  <div class="header">
    <div class="d-flex justify-content-around">
      <div class="d-flex align-items-baseline">
        <h1 class="mr-2 header-font font-weight-bold">Keepr</h1>
        <h6><small class="font-weight-bold">ALL YOUR FAVORITE CONTENT IN ONE SPOT</small></h6>
      </div>
      <button class="btn btn-sm my-2 bg-dark text-light" @click="logout">Logout</button>
    </div>

  </div>
</template>


<script>
  export default {
    name: 'header',
    data() {
      return {}
    },
    computed: {},
    methods: {
      logout() {
        this.$store.dispatch("logout")
      }
    },
    components: {}
  }
</script>


<style scoped>
  .header-font {
    font-family: 'Cute Font', cursive;
  }
</style>