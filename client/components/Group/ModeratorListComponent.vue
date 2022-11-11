<!-- Show all moderators of a group -->

<template>
    <aside>
        <header>
            <h3>Moderators</h3>
        </header>
        <ul class="moderator-list">
            <li v-for="user in moderators">
                {{ user.username }}
            </li>
        </ul>
    </aside>
</template>
  
<script>

export default {
    name: 'ModeratorListComponent',
    props: {
        moderators: {
            type: Array,
            required: true
        }
    }
};
</script>
  
<style scoped>
ul {
    list-style-type: none;
    padding-left:0;
}

aside {
    padding:1em;
    border-bottom: 2px solid #0D0D0D;
}
</style>
  