<template>
  <div>
    <div>
      <div class="row">
        <div class="col col-sm-4 offset-sm-4">
          <h1 class="text-dark font-weight-bold mt-3 title display-3">Keepr</h1>
        </div>
      </div>
    </div>
    <div class=" login row">
      <div class="col col-sm-4 offset-sm-4">
        <h5 class="modal-title" id="exampleModalCenteredLabel">Register or Login Here</h5>
        <h5 v-if="loginFailed" class="text-danger"> Login Failed. Username or Password Incorrect</h5>
        <h5 v-if="registrationFailed" class="text-danger">Registration Failed. Please Try Again</h5>
        <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button> -->
        <div class="modal-body">
          <div class="">
            <form v-if="loginForm" @submit.prevent="loginUser" class="d-flex flex-column ">
              <input class="form-control mb-1" type="email" v-model="creds.email" placeholder="email">
              <input class="form-control mb-1" type="password" v-model="creds.password" placeholder="password">
              <button class="btn btn-sm bg-dark text-light" type="submit">Login</button>
            </form>
            <form v-else @submit.prevent="register">
              <input class="form-control mb-1" type=" text" v-model="newUser.username" placeholder="name">
              <input class="form-control mb-1" type=" email" v-model="newUser.email" placeholder="email">
              <input class="form-control mb-1" type=" password" v-model="newUser.password" placeholder="password">
              <button class="btn btn-sm bg-dark text-light" type="submit" ">Create
                      Account</button>
            </form>
            <div @click=" loginForm=!loginForm">
                <p class="pointer" v-if="loginForm">No account Click to Register</p>
                <p class="pointer" v-else>Already have an account click to Login</p>
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
    name: "login",
    mounted() {
      //checks for valid session
      this.$store.dispatch("authenticate");
      $(".modal").modal({
        show: true,
        backdrop: 'static',
        keyboard: false
      })
    },
    data() {
      return {
        loginForm: true,
        creds: {
          email: "",
          password: ""
        },
        newUser: {
          email: "",
          password: "",
          username: ""
        },
        loginFailed: false,
        registrationFailed: false,
        showModal: false,
      };
    },
    methods: {
      register() {
        this.$store.dispatch("register", this.newUser);
      },
      loginUser() {
        this.$store.dispatch("login", this.creds);
      },
      // toggleLoginModal() {
      //   let dict = {
      //     false: "hide",
      //     true: "show"
      //   }
      //   $(".modal").modal(`${dict[this.showModal]}`)
      //   this.showModal = !this.showModal
      // }
    }
  };
</script>
<style scoped>
  .title {
    font-family: 'Cute Font', cursive;
  }

  .login {
    margin-top: 25vh;
  }
</style>