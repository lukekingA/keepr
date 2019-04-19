<template>
  <div class="home">
    <top-header></top-header>
    <div class="d-flex justify-content-around mb-2">
      <button @click="formselect = !formselect" class="btn bg-dark text-light" :disabled="formselect">Keep</button>
      <button @click="formselect = !formselect" class="btn bg-dark text-light" :disabled="!formselect">Vault</button>
    </div>
    <keep-form v-if=" formselect" :vaults="userVaults"></keep-form>
    <vault-form v-else></vault-form>
    <div v-if=" formselect" class="row mt-3">
      <div v-for="keep in userKeeps" class="col col-sm-4">
        <keep :keep="keep" :user="user" :currentRouteName="currentRouteName" :userVaults="userVaults"></keep>

      </div>
    </div>
    <div v-else class="row mt-3">
      <div v-for="vault in userVaults" class="col col-sm-4">
        <vault :vault="vault" :user="user" :currentRouteName="currentRouteName" :userVaults="userVaults"></vault>
      </div>
    </div>

  </div>
  </div>
</template>

<script>
  import TopHeader from '@/components/topHeader.vue'
  import KeepForm from '@/components/keepForm.vue'
  import VaultForm from '@/components/vaultForm.vue'
  import Keep from '@/components/keep.vue'
  import Vault from '@/components/vault.vue'

  export default {
    name: "home",
    data() {
      return {
        formselect: true,

      }
    },
    beforeCreate() {
      this.$store.dispatch("authenticate");
    },
    mounted() {
      this.$store.dispatch('getUserKeeps')
      this.$store.dispatch('getUserVaults')
    },
    computed: {
      userVaults() {
        return this.$store.state.vaults
      },
      userKeeps() {
        return this.$store.state.userKeeps
      },
      user() {
        return this.$store.state.user
      },
      currentRouteName() {
        return this.$route.name
      },

    },
    methods: {

    },
    components: {
      TopHeader,
      KeepForm,
      VaultForm,
      Keep,
      Vault
    }
  };
</script>