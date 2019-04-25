<template>
  <div class="vault">
    <div @click="getKeeps" class="border rounded shadow p-1">
      <div class="p-1 border border-secondary rounded">
        <h3>{{vault.name}}</h3>
        <p>{{vault.description}}</p>
      </div>
    </div>
    <!-- <vault-keeps v-if="modalOpen" :modalOpen="modalOpen"></vault-keeps> -->
    <!-- <div class="modal fade" :id="vault.id" tabindex="-1" role="dialog" aria-labelledby="vaultKeepsModal"
      aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="row">
            <div class="col col-sm-6" v-for="(keep) in curKeeps">
              <keep :keep="keep" :user="user" :currentRouteName="currentRouteName" :userVaults="userVaults"></keep>
              <button v-if="generalVault" class="bg-dark text-light btn btn-sm m-1 shadow-sm">Remove From
                Vault</button>
            </div>
          </div>
          <button @click="deleteVault(vault)" v-show="generalVault" class="bg-dark text-light btn btn-sm m-1">Delete
            Vault</button>
        </div>
      </div>
    </div> -->
  </div>
</template>


<script>
  import Keep from '@/components/keep.vue'
  import $ from 'jquery'
  export default {
    name: 'vault',
    data() {
      return {
        modalOpen: false
      }
    },
    props: ['vault', 'user', 'currentRouteName', 'userVaults'],
    mounted() {},
    computed: {
      // curKeeps() {
      //   return this.$store.state.curKeepsByVault
      // },
      usrIsUsr() {
        return this.vault.userId == this.user.id
      },
      generalVault() {
        console.log(this.vault.name == 'General')
        return !(this.vault.name == 'General')
      }
    },
    methods: {
      showModal(id) {
        $(id).modal('show')
      },
      hideModal(id) {
        $(id).modal('hide')
      },
      getKeeps() {
        let data = {
          vaultId: this.vault.id,
          user: this.$store.state.user.id
        }
        this.$store.dispatch('getKeepsByVault', data)
        this.$router.push({
          name: 'vaultview',
          params: {
            vaultId: this.vault.id,
            userId: this.user.id
          }

        })
        //this.showModal('#' + this.vault.id)
      },
      deleteVault(vault) {
        this.$store.dispatch('deleteVault', vault)
      }
    },
    components: {
      Keep
    }
  }
</script>


<style scoped>

</style>