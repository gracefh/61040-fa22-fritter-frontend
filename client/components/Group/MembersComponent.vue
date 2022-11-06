<!-- Show all members of a group -->

<template>
    <aside>
        <header>
            <h3>Members</h3>
        </header>
        <ul class="member-list">
            <div v-for="user in members">
                {{ user.username }}
            </div>
        </ul>
    </aside>

</template>
  
<script>

export default {
    name: 'MembersComponent',
    props: {
        members: Array,
        required: true
    }
};
</script>
  
<style scoped>

</style>
  