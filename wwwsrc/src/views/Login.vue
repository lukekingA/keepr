<template>

  <div>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#loginModal">
      Login
    </button>

    <!-- Modal -->
    <div class="modal" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenteredLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenteredLabel">Register or Login Here</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="login">
              <form v-if="loginForm" @submit.prevent="loginUser">
                <input type="email" v-model="creds.email" placeholder="email">
                <input type="password" v-model="creds.password" placeholder="password">
                <button type="submit" @click="dismissLoginModal">Login</button>
              </form>
              <form v-else @submit.prevent="register">
                <input type="text" v-model="newUser.username" placeholder="name">
                <input type="email" v-model="newUser.email" placeholder="email">
                <input type="password" v-model="newUser.password" placeholder="password">
                <button type="submit">Create Account</button>
              </form>
              <div @click="loginForm = !loginForm">
                <p v-if="loginForm">No account Click to Register</p>
                <p v-else>Already have an account click to Login</p>
              </div>
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
        }
      };
    },
    methods: {
      register() {
        this.$store.dispatch("register", this.newUser);
      },
      loginUser() {
        this.$store.dispatch("login", this.creds);
      },
      dismissLoginModal() {
        $(".modal").modal("hide")
      }
    }
  };
</script>