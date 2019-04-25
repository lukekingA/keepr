<template>
  <div class="vault-view">
    <top-header>
      <button @click="goHome" class="btn btn-sm my-2 bg-dark text-light">My Vaults</button>
    </top-header>
    <h1 class="text-center">{{vault.name}}</h1>
    <p class="text-center">{{vault.description}}</p>
    <div class="row">
      <div class="col col-sm-6" v-for="(keep) in curKeeps">
        <keep :keep="keep" :user="user" :currentRouteName="currentRouteName" :userVaults="userVaults"></keep>
        <button v-if="vault.name == 'General'" class="bg-dark text-light btn btn-sm m-1 shadow-sm">Remove From
          Vault</button>
      </div>
    </div>

  </div>
</template>


<script>
  import TopHeader from '@/components/topHeader.vue'
  import Keep from '@/components/keep.vue'

  export default {
    name: 'vault-view',
    data() {
      return {}
    },
    beforeCreate() {
      this.$store.dispatch("authenticate");
    },
    mounted() {
      this.$store.dispatch('getUserVaults')
      let data = {
        vaultId: this.$route.params.vaultId,
        user: this.$route.params.userId
      }
      this.$store.dispatch('getKeepsByVault', data)
    },
    props: ['currentRouteName'],
    computed: {
      curKeeps() {
        return this.$store.state.curKeepsByVault
      },
      userVaults() {
        return this.$store.state.vaults
      },
      vault() {
        return this.userVaults.filter(v => v.id = this.$route.params.vaultId)
      },
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      goHome() {
        this.$router.push({
          name: 'home'
        })
      }
    },
    components: {
      TopHeader,
      Keep
    }
  }
</script>


<style scoped>

</style>