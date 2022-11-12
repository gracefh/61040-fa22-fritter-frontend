<!-- Show member functionalities of a group -->

<template>
    <aside>
        <button v-if="role === 'notJoined' && $store.state.username" @click="joinGroup">
            <i class="fa fa-solid fa-arrow-right-to-bracket"></i> Join Group
        </button>
        <button v-else-if="role !== 'owner' && $store.state.username" @click="leaveGroup">
            <i class="fa fa-solid fa-arrow-right-from-bracket"></i> Leave Group
        </button>
    </aside>

</template>
  
<script>

export default {
    name: 'MemberComponent',
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
    methods: {
        joinGroup() {
            /**
             * joins this group.
             */
            const params = {
                method: 'POST',
                callback: () => {
                    this.$emit('refreshGroup');
                    this.$store.commit('alert', {
                        message: 'Successfully joined group', status: 'success'
                    });
                }
            };

            this.request(params);
        },
        leaveGroup() {
            /**
             * leaves this group.
             */
            const params = {
                method: 'DELETE',
                callback: () => {
                    this.$emit('refreshGroup');
                    this.$store.commit('alert', {
                        message: 'Successfully left group', status: 'success'
                    });
                }
            };
            this.request(params);
        },
        async request(params) {
            /**
             * Submits a request to the owner's endpoint
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
                const r = await fetch(`/api/groups/${this.groupId}/member`, options);
                if (!r.ok) {
                    const res = await r.json();
                    throw new Error(JSON.stringify(res.error));
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

</style>
  