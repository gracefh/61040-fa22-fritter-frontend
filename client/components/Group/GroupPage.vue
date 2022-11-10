<!-- Reusable component representing a single group's page -->

<template>
    <main class="single-group">
        <div class="group-overall">
            <div class="group-info">
                <h2 class="group-name">
                    {{ group.name }}
                </h2>
                <div>{{ group.description }}</div>
                <section v-if="role === 'owner'">
                    <OwnerComponent class="ownerActions" :groupId="groupId" />
                </section>
                <MemberComponent :groupId="groupId" :role="role" />
                <div>
                    {{ role }}
                </div>
            </div>
        </div>
        <section class="group-content">
            <section v-if="role !== 'notJoined'">
                <CreateGroupFreetForm @refreshGroup="refreshGroupFreets" :groupId="group._id" />
            </section>
            <section class="freets" v-if="group.freets.length > 0">
                <GroupFreetComponent v-for="freet in reverseFreets" :key="freet.id" :freet="freet"
                    :showModeratorFunctions="role === 'owner' || role === 'moderator'" />
            </section>
        </section>
        <aside>
            <section class="sidebar">
                <MemberListComponent :members="group.members" />
            </section>
            <section class="sidebar">
                <ModeratorListComponent :moderators="group.moderators" />
            </section>
        </aside>
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
        role: {
            type: String,
            required: true
        }
    },
    mounted() {
        this.setData(this.groupId);
    },
    data() {
        return {
            group: null,
            alerts: {}
        }
    },
    computed: {
        reverseFreets: function() {
            return this.group.freets.slice().reverse();
        }
    },
    async beforeRouteEnter(to, from, next) {
        next(async vm => await vm.setData(to.params.groupId));
    },
    // when route changes and this component is already rendered,
    // the logic will be slightly different.
    async beforeRouteUpdate(to, from) {
        await setData(to.params.groupId);
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

            console.log(this.group);
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
                    throw new Error(res.error);
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
.single-group {
    width: 85vw;
    padding: 0 0 0 5em;
}

.group {
    border: 1px solid #111;
    position: relative;
}

.group-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.group-overall {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.visit-group {
    padding: 5px 20px;
}

.group-content {
    display: flex;
    flex-direction:column;
}

.freets {
    width: 70vw;
}

.group-name {
    padding-bottom: 0;
}
</style>
  