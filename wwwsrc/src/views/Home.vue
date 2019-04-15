<template>
  <div class="home">
    <top-header></top-header>
    <div class="d-flex justify-content-around mb-2">
      <button v-if="formselect" @click="formselect = !formselect" class="btn bg-dark text-light">Keep</button>
      <button v-else @click="formselect = !formselect" class="btn bg-dark text-light">Vault</button>
    </div>
    <keep-form v-if="formselect"></keep-form>
    <vault-form v-else></vault-form>

  </div>
  </div>
</template>

<script>
  import TopHeader from '@/components/topHeader.vue'
  import KeepForm from '@/components/keepForm.vue'
  import VaultForm from '@/components/vaultForm.vue'

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
      //blocks users not logged in
      // if (!this.$store.state.user.id) {
      //   this.$router.push({
      //     name: "login"
      //   });
      // }
      this.$store.dispatch('getUserKeeps')
      this.$store.dispatch('getUserVaults')
    },
    computed: {

    },
    methods: {

    },
    components: {
      TopHeader,
      KeepForm,
      VaultForm
    }
  };
</script>