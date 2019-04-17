<template>
  <div class="front">
    <top-header></top-header>
    <div class="row mt-3">
      <div v-for="keep in pubKeeps" class="col col-md-4">
        <keep :keep="keep" :user="user" :currentRouteName="currentRouteName" :userVaults="userVaults"></keep>
      </div>
    </div>

  </div>
</template>


<script>
  import TopHeader from '@/components/topHeader.vue'
  import Keep from '@/components/keep.vue'
  export default {
    name: 'front',
    data() {
      return {}
    },
    beforeCreate() {
      this.$store.dispatch("authenticate")
      this.$store.dispatch('getPublicKeeps')
      this.$store.dispatch('setLastUrl', this.$route.name)
    },
    computed: {
      pubKeeps() {
        return this.$store.state.pubKeeps
      },
      userVaults() {
        return this.$store.state.vaults
      },
      user() {
        return this.$store.state.user
      },
      currentRouteName() {
        return this.$route.name
      },
    },
    methods: {},
    components: {
      TopHeader,
      Keep
    }
  }
</script>


<style scoped>

</style>