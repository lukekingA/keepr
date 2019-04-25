<template>
  <div class="top-header bg-secondary mb-3">
    <div class="d-flex justify-content-between mx-3">
      <div class="d-flex align-items-baseline">
        <h1 class="mr-3 header-font font-weight-bold">Keepr</h1>
        <h6><small class="font-weight-bold">ALL YOUR FAVORITE CONTENT IN ONE SPOT</small></h6>
      </div>
      <slot></slot>
      <button v-if="currentUrl != 'front'" @click="goFront" class="btn btn-sm my-2 bg-dark text-light">All
        Keeps</button>
      <button v-if="currentUrl == 'front' && user.id" @click="goHome" class="btn btn-sm my-2 bg-dark text-light">My
        Keeps</button>
      <h6 v-if="user.id" class="align-self-center">Hello {{user.username}}</h6>
      <button v-if="user.id" class="btn btn-sm my-2 bg-dark text-light" @click="logout">Logout</button>

      <div v-else class="d-flex align-items-end">
        <h6 class="mr-2">To see your content</h6>
        <button @click="login" class="btn btn-sm my-2 bg-dark text-light">Login</button>
      </div>
    </div>

  </div>
</template>


<script>
  export default {
    name: 'top-header',
    data() {
      return {}
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      currentUrl() {
        return this.$route.name
      }
    },
    created() {
      // var currentUrl = window.location.pathname;
      // var anotherUrl = this.$route.name
      // console.log(currentUrl, anotherUrl);
    },
    methods: {
      login() {
        this.$router.push({
          name: 'login'
        })
      },
      logout() {
        this.$store.dispatch("logout")
      },
      goFront() {
        this.$router.push({
          name: 'front'
        })
      },
      goHome() {
        this.$router.push({
          name: 'home'
        })
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