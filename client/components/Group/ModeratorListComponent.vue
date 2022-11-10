<!-- Show all moderators of a group -->

<template>
    <aside>
        <header>
            <h3>Moderators</h3>
        </header>
        <ul class="moderator-list">
            <div v-for="user in moderators">
                {{ user.username }}
            </div>
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

</style>
  