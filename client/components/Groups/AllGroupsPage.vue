<!-- Default page that also displays freets -->

<template>
    <main>
        <section v-if="$store.state.username">
            <header>
                <h2>Welcome @{{ $store.state.username }}</h2>
            </header>
            <section>
                <CreateGroupForm @refreshGroups="setData" ref="createGroupForm" />
                <section v-if="$store.state.groups.length" class="groups-list">
                    <section v-if="this.ownedGroups.length > 0">
                        <h2>Groups You Own</h2>
                        <GroupsComponent v-for="group in this.ownedGroups" :key="group.id" :group="group"
                            :role="'owner'" />
                    </section>
                    <section v-if="this.moderatedGroups.length > 0">
                        <h2>Groups You Moderate</h2>
                        <GroupsComponent v-for="group in this.moderatedGroups" :key="group.id" :group="group"
                            :role="'moderator'" />
                    </section>
                    <section v-if="this.memberedGroups.length > 0">
                        <h2>Other Groups You're In</h2>
                        <GroupsComponent v-for="group in this.memberedGroups" :key="group.id" :group="group"
                            :role="'member'" />
                    </section>
                    <section v-if="this.otherGroups.length > 0">
                        <h2>Other Groups</h2>
                        <GroupsComponent v-for="group in this.otherGroups" :key="group.id" :group="group"
                            :role="'notJoined'" />
                    </section>
                </section>
                <section v-else>
                    <h3>No groups found.</h3>
                </section>
            </section>
        </section>
        <section v-else>
            <header>
                <h2>Welcome to Fritter!</h2>
            </header>
            <article>
                <h3>
                    <router-link class='sign-in' to="/login">
                        Sign in
                    </router-link>
                    to see, create, and join groups.
                </h3>
            </article>
        </section>
    </main>
</template>
  
<script>
import GroupsComponent from '@/components/Groups/GroupsComponent.vue';
import CreateGroupForm from '@/components/Groups/CreateGroupForm.vue';

export default {
    name: 'AllGroupsPage',
    components: { GroupsComponent, CreateGroupForm },
    data() {
        return {
            ownedGroups: [],
            moderatedGroups: [],
            memberedGroups: [],
            otherGroups: [],
            allGroups: this.$store.state.groups
        }
    },
    async beforeRouteEnter(to, from, next) {
        next(async vm => await vm.setData());
    },
    async beforeRouteUpdate(to, from) {
        await this.setData();
    },
    methods: {
        async setData() {
            const roles = ["member", "moderator", "owner"];
            const results = await Promise.all(roles.map((role) => fetch(`/api/groups/member?role=${role}`)));
            const res = await Promise.all(results.map(r => r.json()));

            for (let ind = 0; ind < roles.length; ind++) {
                if (!results[ind].ok) {
                    throw new Error(res[ind].error);
                }
            }
            // See if you can make this better :")
            this.ownedGroups = res[2];
            this.moderatedGroups = res[1].filter(o1 => !res[2].some(o2 => o1._id === o2._id));
            this.memberedGroups = res[0].filter(o1 => !res[1].some(o2 => o1._id === o2._id));
            this.otherGroups = this.$store.state.groups.filter(o1 => !res[0].some(o2 => o1._id === o2._id));

        },
        async request(params) {
            /**
             * Submits a request to the group's endpoint
             * @param params - Options for the request
             * @param params.body - Body for the request, if it exists
             * @param params.callback - Function to run if the the request succeeds
             */
            const options = {
                method: params.method, headers: { 'Content-Type': 'application/json' }
            };
            if (params.body) {
                options.body = params.body;
            }

            try {
                const r = await fetch(`/api/groups/${this.groups._id}`, options);
                if (!r.ok) {
                    const res = await r.json();
                    throw new Error(Object.keys(res.error).reduce((result, key) => `${result}\n${key}: ${res.error[key]}`, ""));
                }

                this.editing = false;
                this.$store.commit('refreshGroups');

                params.callback();
            } catch (e) {
                this.$set(this.alerts, e, 'error');
                setTimeout(() => this.$delete(this.alerts, e), 3000);
            }
        }
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

.groups-list {
    width: 70vw;
}
</style>
  