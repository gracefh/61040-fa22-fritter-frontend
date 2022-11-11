<template>
  <div id="app">
    <header>
      <NavBar />
    </header>
    <div class="pageContent">
      <SideNavBar class="sideNav" />
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar.vue';
import SideNavBar from '@/components/common/SideNavBar.vue'

export default {
  name: 'App',
  components: { NavBar, SideNavBar },
  beforeCreate() {
    // Sync stored username to current session
    fetch('/api/users/session', {
      credentials: 'same-origin' // Sends express-session credentials with request
    }).then(res => res.json()).then(res => {
      const user = res.user;
      this.$store.commit('setUsername', user ? user.username : null);
    });

    // Clear alerts on page refresh
    this.$store.state.alerts = {};
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  height: 100vh;
  flex-direction: column;
  display: flex;
  margin: 0;
  font-size: 1.2em;
  background-color: #9cc8ef;
  color: black;
  font-family: Verdana, Arial, Helvetica, sans-serif;
}

main {
  padding: 0 5em 5em;
  width: 70vw;
}


.pageContent {
  display: flex;
}

.sideNav {
  float: left;
}

.alerts {
  position: absolute;
  z-index: 99;
  bottom: 0;
  top: 100%;
  left: 50%;
  transform: translate(-50%, 10%);
  width: 100%;
  text-align: center;
}

.alerts article {
  border-radius: 5px;
  padding: 10px 20px;
  color: #fff;
}

.alerts p {
  margin: 0;
}

.alerts .error {
  background-color: rgb(166, 23, 33);
}

.alerts .success {
  background-color: rgb(45, 135, 87);
}

button {
  border-radius: 5px;
  border: 1px solid black;
}

button:hover {
  background-color: #55A9F2;
  cursor: pointer;
  -webkit-transition: all ease 1s;
  -moz-transition: all ease 1s;
  transition: all ease 1s;
}
nav .router-link-exact-active {
  border: 2px solid black;
  border-radius: 5px;
  
}

a {
  text-decoration: none;
  color: black;
}

a:hover {
  color: #495E70;
  -webkit-transition: all ease 1s;
  -moz-transition: all ease 1s;
  transition: all ease 1s;
}



.sidebar {
  width: 15vw;
  padding: 0 0 2vw;
  text-align:center;
  min-height:100vh;
  border-left:1px solid black
}
</style>
