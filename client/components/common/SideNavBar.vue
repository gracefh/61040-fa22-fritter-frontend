<!-- Side Nav Bar -->

<template>
    <nav>
        <router-link to="/">
            Home
        </router-link>
        <router-link to="/groups">
            Groups
        </router-link>
        <router-link v-if="$store.state.username" to="/account">
            Account
        </router-link>
        <router-link v-else to="/login">
            Login
        </router-link>
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
    width: 15vw;
    height:100vw;
    background-color: #ccc;
    display: flex;
    flex-direction: column;
    gap:2em;
    align-items: center;
    position: relative;
}

.title {
    font-size: 32px;
    margin: 0 5px;
}

img {
    height: 32px;
}

.left {
    display: flex;
    align-items: center;
}

.right {
    font-size: 20px;
    display: grid;
    gap: 16px;
    grid-auto-flow: column;
    align-items: center;
}

.right a {
    margin-left: 5px;
}

.alerts {
    width: 25%;
}
</style>
  