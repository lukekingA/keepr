<template>
  <div class="vault">
    <div @click="getKeeps" class="border rounded shadow p-1" data-toggle="modal" data-target=".vault-keep-modal">
      <div class="p-1 border border-secondary rounded">
        <h3>{{vault.name}}</h3>
        <p>{{vault.description}}</p>
      </div>
    </div>
    <!-- <vault-keeps v-if="modalOpen" :modalOpen="modalOpen"></vault-keeps> -->
    <div class="modal fade vault-keep-modal" tabindex="-1" role="dialog" aria-labelledby="vaultKeepsModal"
      aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="row">
            <div class="col col-sm-6" v-for="keep in curKeeps">
              <keep :keep="keep"></keep>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import Keep from '@/components/keep.vue'
  export default {
    name: 'vault',
    data() {
      return {
        modalOpen: false
      }
    },
    props: ['vault'],
    mounted() {

    },
    computed: {
      curKeeps() {
        return this.$store.state.curKeepsByVault
      }
    },
    methods: {
      getKeeps() {
        let data = {
          vaultId: this.vault.id,
          user: this.$store.state.user.id
        }
        this.$store.dispatch('getKeepsByVault', data)
        this.modalOpen = true
      }
    },
    components: {
      Keep
    }
  }
</script>


<style scoped>

</style>