<template>
  <div class="vault-form">
    <div class="row">
      <div class="col col-sm-8 offset-sm-2">
        <form action="" class="d-flex flex-column">
          <input type="text" class="mb-1 form-control pl-1" placeholder="name" v-model="curKeep.name">
          <input type="text" class="mb-1 form-control pl-1" placeholder="description" v-model="curKeep.description">

          <button @click="makeKeep" class="btn btn-sm bg-dark text-light">Make Vault</button>
        </form>
      </div>
    </div>

  </div>
</template>


<script>
  export default {
    name: 'vault-form',
    data() {
      return {
        curKeep: {
          name: '',
          description: '',
          img: '',
          tags: '',
          contentUrl: '',
          isPrivate: true
        }
      }
    },
    computed: {},
    methods: {
      makeKeep() {

      }
    },
    components: {}
  }
</script>


<style scoped>

</style>