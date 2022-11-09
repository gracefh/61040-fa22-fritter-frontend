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
    height: 100vw;
    font-size: 30;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    gap: 2em;
    align-items: center;
    position: relative;
    border-right: 1px solid black;
    
}

nav a {
    padding: 0 5px;
}

.title {
    font-size: 32px;
    margin: 0 5px;
}

img {
    height: 32px;
}


.alerts {
    width: 25%;
}
</style>
  