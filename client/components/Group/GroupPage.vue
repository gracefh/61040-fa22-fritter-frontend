<!-- Reusable component representing a single group's page -->

<template>
    <article class="single-group">
        <div class="group-overall">
            <div class="group-info">
                <h3 class="group-name">
                    {{ group.name }}
                </h3>
                <div>{{ group.description }}</div>
            </div>
        </div>
        <section v-if="group.freets.length > 0">
            <FreetComponent v-for="freet in group.freets" :key="freet.id" :freet="freet" />
        </section>
        <section class="alerts">
            <article v-for="(status, alert, index) in alerts" :key="index" :class="status">
                <p>{{ alert }}</p>
            </article>
        </section>

    </article>

</template>
  
<script>
import FreetComponent from '@/components/Freet/FreetComponent.vue';

export default {
    name: 'GroupPage',
    components: { FreetComponent },
    data() {
        return {
            group: null,
            alerts: {}
        }
    },
    async beforeRouteEnter(to, from, next) {
        next(async vm => await vm.setData(to.params.groupId))
    },
    // when route changes and this component is already rendered,
    // the logic will be slightly different.
    async beforeRouteUpdate(to, from) {
        this.group = null
        await setData(to.params.groupId);
    },
    methods: {
        async setData(groupId) {
            const r = await fetch(`/api/groups?groupId=${groupId}`);
            const res = await r.json();
            if (!r.ok) {
                throw new Error(res.error);
            }
            this.group = res;
        },
        async request(params) {
            /**
             * Submits a request to the group's endpoint
             * @param params - Options for the request
             * @param params.body - Body for the request, if it exists
             * @param params.callback - Function to run if the the request succeeds
             */
            const options = {
                method: para
                    | ms.method, headers: { 'Content-Type': 'application/json' }
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
.group {
    border: 1px solid #111;
    padding: 20px;
    position: relative;
}

.group-overall {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.visit-group {
    padding: 5px 20px;
}
</style>
  