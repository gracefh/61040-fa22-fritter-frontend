<!-- Reusable component representing a single group's page -->

<template>
    <main class="single-group">
        <section class="group-overall">
            <section class="group-content">
                <header class="group-info">
                    <h2 class="group-name">
                        {{ group.name }}
                    </h2>
                    <div class="group-description">{{ group.description }}</div>
                    <MemberComponent :groupId="groupId" :role="role" />
                </header>
                <section v-if="role !== 'notJoined'">
                    <CreateGroupFreetForm class="createGroupFreetForm" @refreshGroup="refreshGroup"
                        :groupId="groupId" />
                </section>
                <section class="freets" v-if="group.freets.length > 0">
                    <GroupFreetComponent v-for="freet in reverseFreets" :key="freet.id" :groupId="groupId"
                        :freet="freet" :showModeratorFunctions="role === 'owner' || role === 'moderator'"
                        @refreshGroup="refreshGroup" />
                </section>
            </section>
            <section class="sidebar">
                <OwnerComponent v-if="role === 'owner'" class="ownerActions" :group="group" :groupId="groupId"
                    @refreshGroup="refreshGroup" />
                <MemberListComponent :members="group.members" :groupId="groupId" :showOwnerFunctions="role === 'owner'"
                    :showModeratorFunctions="role === 'owner' || role === 'moderator'" :moderators="group.moderators"
                    @refreshGroup="refreshGroup" />
                <ModeratorListComponent :moderators="group.moderators" :groupId="groupId"
                    :showOwnerFunctions="role === 'owner'" @refreshGroup="refreshGroup"/>
            </section>
        </section>
        <section class="alerts">
            <article v-for="(status, alert, index) in alerts" :key="index" :class="status">
                <p>{{ alert }}</p>
            </article>
        </section>
    </main>

</template>
  
<script>
import GroupFreetComponent from '@/components/Group/GroupFreetComponent.vue';
import MemberListComponent from '@/components/Group/MemberListComponent.vue';
import ModeratorListComponent from '@/components/Group/ModeratorListComponent.vue';
import OwnerComponent from '@/components/Group/OwnerComponent.vue';
import MemberComponent from '@/components/Group/MemberComponent.vue';
import CreateGroupFreetForm from '@/components/Group/CreateGroupFreetForm.vue';

export default {
    name: 'GroupPage',
    components: { GroupFreetComponent, MemberListComponent, OwnerComponent, MemberComponent, ModeratorListComponent, CreateGroupFreetForm },
    props: {
        groupId: {
            type: String,
            required: true
        },
    },
    mounted() {
        this.setData(this.groupId);
    },
    data() {
        return {
            group: null,
            role: "notJoined",
            alerts: {}
        }
    },
    computed: {
        reverseFreets: function () {
            return this.group.freets.slice().reverse();
        }
    },
    async beforeRouteEnter(to, from, next) {
        next(async vm => await vm.setData(to.params.groupId));
    },
    // when route changes and this component is already rendered,
    // the logic will be slightly different.
    async beforeRouteUpdate(to, from) {
        await this.setData(to.params.groupId);
    },
    methods: {
        async refreshGroup() {
            await this.setData(this.groupId);
        },
        async setData(groupId) {
            const r = await fetch(`/api/groups?groupId=${groupId}`);
            const res = await r.json();
            if (!r.ok) {
                throw new Error(res.error);
            }
            this.group = { ...res };
            if (this.group.owner.username === this.$store.state.username) {
                this.role = 'owner';
            }
            else if (this.group.moderators.some((moderator) => moderator.username === this.$store.state.username)) {
                this.role = 'moderator';
            }
            else if (this.group.members.some((member) => member.username === this.$store.state.username)) {
                this.role = 'member';
            }
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
.single-group {
    width: 85vw;
    padding: 0;
}

/* .group {
    border: 1px solid #111;
    position: relative;
} */

.group-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 1em;
}

.group-overall {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
}

.visit-group {
    padding: 5px 20px;
}

.group-content {
    display: flex;
    flex-direction: column;
    width: 60vw;
    padding: 0 5vw;
}

.freets {
    width: 60vw;
}

.group-name {
    margin-bottom: .1em;
}

.group-description {
    font-size: 18px;
}

.createGroupFreetForm {
    width: 60vw;
}
</style>
  