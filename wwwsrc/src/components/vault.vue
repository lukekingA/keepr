<template>
  <div class="vault">
    <h3>{{vault.name}}</h3>

  </div>
</template>


<script>
  import Keep from '@/components/keep.vue'

  export default {
    name: 'vault',
    data() {
      return {}
    },
    props: ['vault'],
    mounted() {
      let data = {
        vaultId: this.vault.id,
        user: this.$store.state.user.id
      }
      this.$store.dispatch('getKeepsByVault', data)
    },
    computed: {},
    methods: {},
    components: {
      Keep
    }
  }
</script>


<style scoped>

</style>