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
  font-family: Verdana, Arial, Helvetica, sans-serif;
}

body {
  height: 100vh;
  flex-direction: column;
  display: flex;
  margin: 0;
  font-size: 1.2em;
  background-color: #A9D9D0;
  color: black;
  font-family: Verdana, Arial, Helvetica, sans-serif;
}

main {
  padding: 0 5vw 5vw;
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
  color: #F2E7DC;
}

.alerts p {
  margin: 0;
}

.alerts .error {
  background-color: #730202;
}

.alerts .success {
  background-color: #038C7F;
}

input {
  border-radius: 5px;
  border-width: 1px;
}

textarea {
  border-radius: 5px;
  border-width: 1px;
}

button {
  border-radius: 5px;
  padding: .4em;
  background-color: #F2E7DC;
  border: 1px solid #0D0D0D;
  font-family: Verdana, Arial, Helvetica, sans-serif
}

button:hover {
  background-color: #038C7F;
  cursor: pointer;
  -webkit-transition: all ease 1s;
  -moz-transition: all ease 1s;
  transition: all ease 1s;
}

nav .router-link-exact-active {
  color: #027373;

}

a {
  text-decoration: none;
  color: #0D0D0D;
}

a:hover {
  color: #027373;
  -webkit-transition: all ease 1s;
  -moz-transition: all ease 1s;
  transition: all ease 1s;
}

.sidebar {
  width: 15vw;
  padding: 0 0 2vw;
  text-align: center;
  min-height: 100vh;
  border-left: 2px solid #0D0D0D
}

.sign-in:not(:hover) {
  color: #038C7F;
}
</style>
