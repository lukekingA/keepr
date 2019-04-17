<template>
  <div class="keep-form">
    <div class="row">
      <div class="col col-sm-8 offset-sm-2">
        <form action="" class="d-flex flex-column border rounded shadow-sm p-2">
          <input type="text" class="mb-1 form-control pl-1" placeholder="name - required" v-model="curKeep.name"
            required>
          <input type="text" class="mb-1 form-control pl-1" placeholder="description - required"
            v-model="curKeep.description" required>
          <input type="url" class="mb-1 form-control pl-1" placeholder="img url" v-model="curKeep.img">
          <input type="url" class="mb-1 form-control pl-1" placeholder="article url" v-model="curKeep.contentUrl">
          <input type="text" class="mb-1 form-control pl-1" placeholder="enter search tags here" v-model="curKeep.tags">
          <div class="d-flex align-items-baseline">
            <input type="checkbox" id="isPriv" class="mb-1 mr-3 rounded pl-1" placeholder=""
              v-model="curKeep.isPrivate">
            <label for="#isPriv">Uncheck for public keep</label>
          </div>
          <div class="dropdown mb-2">
            <button class="btn btn-sm bg-dark text-light dropdown-toggle" type="button" id="dropdownMenu1"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Vaults
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
              <li v-for="vault in vaults" class="pl-1 border-top" @click="setVault(vault)">{{vault.name}}</li>
            </ul>
          </div>
          <button @click="makeKeep" class="btn btn-sm bg-dark text-light">Make Keep</button>
        </form>
      </div>
    </div>

  </div>
</template>


<script>
  import {
    Drag,
    Drop
  } from 'vue-drag-drop'
  export default {
    name: 'keep-form',
    data() {
      return {
        curKeep: {
          name: '',
          description: '',
          img: '',
          tags: '',
          contentUrl: '',
          isPrivate: true
        },
        vaultPick: {},
      }
    },
    props: ['vaults'],
    mounted() {},
    computed: {

    },
    methods: {
      makeKeep() {
        let data = {
          keep: this.curKeep,
          vaultId: this.vaultPick.id
        }
        data.userId = this.$store.state.user.id
        this.$store.dispatch('makeKeep', data)
        curKeep = {
          name: '',
          description: '',
          img: '',
          tags: '',
          contentUrl: '',
          isPrivate: true
        }
      },
      setVault(vault) {
        debugger
        this.vaultPick = vault
      }
    },
    components: {
      Drag,
      Drop
    }
  }
</script>


<style scoped>

</style>