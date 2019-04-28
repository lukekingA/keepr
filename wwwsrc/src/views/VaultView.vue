<template>
  <div class="vault-view">
    <top-header>
      <button @click="goHome" class="btn btn-sm my-2 bg-dark text-light">My Vaults</button>
    </top-header>
    <div v-if="vault">
      <h1 class="text-center">{{vault.name}}</h1>
      <p class="text-center">{{vault.description}}</p>
    </div>
    <div v-else class="spinner-border text-secondary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div class="row">
      <div class="col col-sm-6" v-for="(keep) in curKeeps">
        <keep :keep="keep" :user="user" :currentRouteName="currentRouteName" :userVaults="userVaults"></keep>
        <button @click="removeFromVault(vault.id,keep.id)" v-if="vault.name != 'General'"
          class="bg-dark text-light btn btn-sm m-1 shadow-sm">Remove From
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
    props: [],
    computed: {
      currentRouteName() {
        return this.$route.name
      },
      curKeeps() {
        return this.$store.state.curKeepsByVault
      },
      userVaults() {
        return this.$store.state.vaults
      },
      vault() {
        return this.userVaults.filter(v => v.id == this.$route.params.vaultId)[0]
      },
      user() {
        return this.$store.state.user
      },
      generalVault() {
        return this.userVaults.filter(v => v.name == 'General')[0]
      }
    },
    methods: {

      goHome() {
        this.$router.push({
          name: 'home'
        })
      },
      removeFromVault(vaultId, keepId) {
        let data = {
          vaultId: vaultId,
          keepId: keepId,
          userId: this.user.id,
          generalVaultId: this.generalVault.id
        }
        this.$store.dispatch('removeVaultKeep', data)
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