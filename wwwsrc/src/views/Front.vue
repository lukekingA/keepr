<template>
  <div class="front">
    <top-header></top-header>
    <div class="row mt-3">
      <div v-for="keep in pubKeeps" class="col col-sm-4">
        <keep :keep="keep"></keep>
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
      }
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