<template>
  <div class="home">
    <main-header></main-header>
  </div>
</template>

<script>
  import MainHeader from '@/components/mainHeader.vue'
  export default {
    name: "home",
    beforeCreate() {
      this.$store.dispatch("authenticate");
    },
    mounted() {
      //blocks users not logged in
      if (!this.$store.state.user.id) {
        this.$router.push({
          name: "login"
        });
      }
    },
    methods: {
      logout() {
        this.$store.dispatch("logout")
      }
    },
    components: {
      MainHeader
    }
  };
</script>