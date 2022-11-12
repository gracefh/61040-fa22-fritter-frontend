<!-- Reusable component representing a single group's information on the main groups page -->
<!-- We've tagged some elements with classes; consider writing CSS using those classes to style them... -->

<template>
    <main class="group">
        <router-link class="link" :to="{ name: 'Group', params: { groupId: group._id } }">
            <div class="group-info">
                <h3 class="group-name">
                    {{ group.name }}  <i class="fa fa-solid fa-square-arrow-up-right"></i>
                </h3>
                <p>{{ group.description }}</p>
            </div>
        </router-link>
        <section class="alerts">
            <article v-for="(status, alert, index) in alerts" :key="index" :class="status">
                <p>{{ alert }}</p>
            </article>
        </section>
    </main>
</template>
  
<script>
export default {
    name: 'GroupsComponent',
    props: {
        // Data from the stored group
        group: {
            type: Object,
            required: true
        },
        role: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            alerts: {}
        };
    },
    methods: {
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
.group {
    border: 1px solid #0D0D0D;
    padding: 20px;
    position: relative;
    color:#0D0D0D;
}

.group:hover {
    
    background-color: #027373;
    -webkit-transition: all ease 1s;
    -moz-transition: all ease 1s;
    transition: all ease 1s;
}

p {
    margin-top: 0;
}

a {
    color: #0D0D0D;
}
</style>
  