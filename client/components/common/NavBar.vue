<!-- A basic navigation bar component -->
<!-- Example of a component which is included on all pages (via App.vue) -->
<!-- This navbar takes advantage of both flex and grid layouts for positioning elements; feel free to redesign as you see fit! -->

<template>
  <nav>
    <div class="left">
      <img src="../../public/logo.svg">
        <router-link to="/" class="title-link">
          <h1 class="title">Fritter</h1>
        </router-link>
    </div>
    <section class="alerts">
      <article v-for="(status, alert, index) in $store.state.alerts" :key="index" :class="status">
        <p>{{ alert }}</p>
      </article>
    </section>
  </nav>
</template>

<style scoped>
nav {
  padding: 1vw 2vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-bottom:1px solid;
}

.title {
  font-size: 32px;
  margin: 0 5px;
  color: #0D0D0D;

}

.title-link {
  border: none;
}

img {
  height: 32px;
}

.left {
  display: flex;
  align-items: center;
  border:0px;
}

.right {
  font-size: 20px;
  font-weight:600;
  display: grid;
  gap: 16px;
  grid-auto-flow: column;
  align-items: center;
}

.right a {
  margin-left: 5px;
  padding: 0 5px;
}

.alerts {
  width: 25%;
}
</style>
