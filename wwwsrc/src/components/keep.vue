<template>
  <div @click="showModal(keep.id);incrementView(keep);" class="keep" data-toggle="modal" :data-target="'#'+keep.id">
    <div class="card m-1 p-1 shadow pointer">
      <img v-if="keep.img" class="card-img-top rounded shadow-sm" :src="keep.img" alt="Card image cap">
      <div class="card-body">
        <h4 class="card-title">{{keep.name}}</h4>
        <a v-if="keep.contentUrl" :href="keep.contentUrl">article</a>

        <!-- <button v-if="currentRouteName == 'home'" class="bg-dark w-100 text-light btn btn-sm mt-1">Delete</button> -->
      </div>
    </div>


    <!-- Modal -->
    <div class="modal fade" :id="keep.id" tabindex="-1" role="dialog" aria-labelledby="keep.id + 'Title'"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="keep.id + 'Title'">{{keep.name}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img v-if="keep.img" class="img-fluid" :src="keep.img" alt="">
            <p>{{keep.description}}</p>
            <a v-if="keep.contentUrl" :href="keep.contentUrl"></a>
          </div>
          <div class="modal-footer">
            <div class="d-flex flex-column w-100">
              <div class="d-flex justify-content-between">
                <div class="w-100 d-flex ">
                  <div class="w-50 d-flex align-items-baseline">
                    <button @click="shareKeep(keep)" class="btn btn-sm bg-dark text-light mx-1">Share</button>
                    <span>{{keep.shares}}</span>
                  </div>
                  <div class="d-flex align-self-left align-items-baseline">
                    <span class="mr-1">Views</span>
                    <span>{{keep.views}}</span>
                  </div>

                </div>
                <div v-show="user.id" class="d-flex align-items-baseline">
                  <button @click="setVaultKeep(keep)" class="btn btn-sm bg-dark text-light mx-1">Keep</button>
                  <span>{{keep.keeps}}</span>
                </div>
              </div>
              <button @click="deleteKeep(keep)" data-dismiss="modal" v-if="currentRouteName == 'home' && usrIsUsr"
                class="bg-dark w-100 text-light btn btn-sm mt-1">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- select vault modal -->
    <div class="modal fade vault-select" :id="keep.id + 'v'" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-center" id="exampleModalLabel">Select the Vault to store the Keep</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <ul>
              <li @click="keepKeep(vault)" class="pointer" v-for="vault in userVaults" data-dismiss="modal">
                {{vault.name}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" :id="keep.id + 's'" tabindex="-1">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-center" id="exampleModalLabel">Share this Keep</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            share
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
        selectedKeep: {},
      }
    },
    // mounted() {
    //   console.log(this.$route.name)
    // },
    props: ['keep', 'user', 'currentRouteName', 'userVaults'],
    computed: {
      usrIsUsr() {
        return this.keep.userId == this.user.id
      }
    },
    methods: {
      showModal(id) {
        $(`#${id}`).modal('show')
      },
      deleteKeep(keep) {
        this.$store.dispatch('deleteKeep', keep.id)
      },
      setVaultKeep(keep) {
        this.selectedKeep = keep
        $(`#${keep.id}v`).modal('show')
      },
      keepKeep(vault) {
        let data = {
          userId: this.user.id,
          keepId: this.selectedKeep.id,
          vaultId: vault.id
        }
        this.$store.dispatch('makeVaultKeep', data)
        if (this.user.id != this.selectedKeep.userid) {
          this.selectedKeep.keeps++
          this.$store.dispatch('editKeep', this.selectedKeep)
        }
        this.selectedKeep = {}
      },
      incrementView(keep) {
        if (this.user.id != this.keep.userid) {
          this.keep.views++
          this.$store.dispatch('editKeep', this.keep)
        }
      },
      shareKeep(keep) {
        $(`#${keep.id}s`).modal('show')
        this.keep.share++
        this.$store.dispatch('editKeep', this.keep)
      }
    },
    components: {}
  }
</script>


<style scoped>
  li {
    list-style: none;
  }
</style>