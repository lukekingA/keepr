<template>
  <div class="keep">
    <div class="card m-1">
      <img class="card-img-top" :src="keep.img" alt="Card image cap">
      <div class="card-body">
        <h4 class="card-title">{{keep.name}}</h4>
        <p class="card-text">
          {{keep.description}}
        </p>
        <a v-if="keep.contentUrl" :href="keep.contentUrl">article</a>
        <button @click="viewKeep(keep)" class="btn btn-sm bg-dark text-light mx-1">View</button>
        <span>{{keep.views}}</span>
        <button @click="keepKeep(keep)" class="btn btn-sm bg-dark text-light mx-1">Keep</button>
        <span>{{keep.keeps}}</span>
        <button @click="shareKeep(keep)" class="btn btn-sm bg-dark text-light mx-1">Share</button>
        <span>{{keep.shares}}</span>
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