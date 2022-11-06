<!-- Default page that also displays freets -->

<template>
    <main>
        <section v-if="$store.state.username">
            <header>
                <h2>Welcome @{{ $store.state.username }}</h2>
            </header>
            <CreateFreetForm />
        </section>
        <section v-else>
            <header>
                <h2>Welcome to Fritter!</h2>
            </header>
            <article>
                <h3>
                    <router-link to="/login">
                        Sign in
                    </router-link>
                    to create, join, and leave groups.
                </h3>
            </article>
        </section>
        <section>
            <header>
                <div class="left">
                    <h2>
                        Viewing all groups
                        <span v-if="$store.state.filter">
                            by @{{ $store.state.filter }}
                        </span>
                    </h2>
                </div>
                <div class="right">
                    <GetGroupsForm ref="getGroupsForm" value="role" placeholder="🔍 Filter by role (optional)"
                        button="🔄 Get groups" />
                </div>
            </header>
            <section v-if="$store.state.groups.length">
                <GroupsComponent v-for="group in $store.state.groups" :key="group.id" :group="group" />
            </section>
            <article v-else>
                <h3>No groups found.</h3>
            </article>
        </section>
    </main>
</template>
  
<script>
import GroupsComponent from '@/components/Groups/GroupsComponent.vue';
import GetGroupsForm from '@/components/Groups/GetGroupsForm.vue';

export default {
    name: 'AllGroupsPage',
    components: { GroupsComponent, GetGroupsForm },
    mounted() {
        this.$refs.getGroupsForm.submit();
    }
};
</script>
  
<style scoped>
section {
    display: flex;
    flex-direction: column;
}

header,
header>* {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button {
    margin-right: 10px;
}

section .scrollbox {
    flex: 1 0 50vh;
    padding: 3%;
    overflow-y: scroll;
}
</style>
  