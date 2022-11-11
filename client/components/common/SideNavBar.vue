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
    padding: 2vh 2vw;
    width: 15vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 2em;
    align-items: center;
    position: relative;
    border-right: 2px solid #0D0D0D;
    
}

nav a {
    padding: 0 5px;
    font-size: 20px;
    font-weight:600;
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
  