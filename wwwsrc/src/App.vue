<template>
  <div id="app" class="container-fluid">

    <div class="row">
      <div class="col">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style>
  @import url('https://fonts.googleapis.com/css?family=Cute+Font|Varela+Round');


  #app {
    font-family: 'Varela Round', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>