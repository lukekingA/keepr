<template>
  <div class="keep">
    <div class="card">
      <img class="card-img-top" :src="keep.img" alt="Card image cap">
      <div class="card-body">
        <h4 class="card-title">{{keep.name}}</h4>
        <p class="card-text">
          {{keep.description}}
        </p>
        <button @click="viewKeep(keep)" class="btn btn-sm bg-dark text-light">View</button>
        <button @click="keepKeep(keep)" class="btn btn-sm bg-dark text-light">Keep</button>
        <button @click="shareKeep(keep)" class="btn btn-sm bg-dark text-light">Share</button>
      </div>
    </div>


  </div>
</template>


<script>
  export default {
    name: 'keep',
    data() {
      return {}
    },
    props: ['keep'],
    computed: {},
    methods: {},
    components: {}
  }
</script>


<style scoped>

</style>