<template>
  <div @click="keepView = true" class="keep" data-toggle="modal" data-target="#exampleModalCenter">
    <div class="card m-1">
      <img class="card-img-top" :src="keep.img" alt="Card image cap">
      <div class="card-body">
        <h4 class="card-title">{{keep.name}}</h4>
        <a v-if="keep.contentUrl" :href="keep.contentUrl">article</a>
        <button @click="viewKeep(keep)" class="btn btn-sm bg-dark text-light mx-1">View</button>
        <span>{{keep.views}}</span>
        <button @click="keepKeep(keep)" class="btn btn-sm bg-dark text-light mx-1">Keep</button>
        <span>{{keep.keeps}}</span>
        <button @click="shareKeep(keep)" class="btn btn-sm bg-dark text-light mx-1">Share</button>
        <span>{{keep.shares}}</span>
      </div>
    </div>


    <!-- Modal -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>

  </div>



  </div>
</template>


<script>
  import $ from 'jquery'
  export default {
    name: 'keep',
    data() {
      return {
        keepView: false
      }
    },
    props: ['keep'],
    computed: {},
    methods: {
      closeModal() {

      }

    },
    components: {}
  }
</script>


<style scoped>
  }
</style>