<template>
  <div class="home">
    <main-header></main-header>
    <div class="row">
      <div v-for="keep in keeps" class="col col-sm-4">
        <keep :keep="keep"></keep>
      </div>
    </div>
  </div>
</template>

<script>
  import MainHeader from '@/components/mainHeader.vue'
  import Keep from '@/components/keep.vue'

  export default {
    name: "home",
    beforeCreate() {
      this.$store.dispatch("authenticate");
    },
    mounted() {
      //blocks users not logged in
      // if (!this.$store.state.user.id) {
      //   this.$router.push({
      //     name: "login"
      //   });
      // }
      this.$store.dispatch('getPublicKeeps')
    },
    computed: {
      keeps() {
        return this.$store.state.keeps
      }
    },
    methods: {
      logout() {
        this.$store.dispatch("logout")
      }
    },
    components: {
      MainHeader,
      Keep
    }
  };
</script>