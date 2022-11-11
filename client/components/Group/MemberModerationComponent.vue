<!-- Show all owner functionalities in group -->

<template>
    <aside>
        <button @click="removeUser">
            Remove User
        </button>
    </aside>
</template>
  
<script>

export default {
    name: 'MemberModerationComponent',
    props: {
        groupId: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            alerts: []
        }
    },
    methods: {

        removeUser() {
            /**
             * remove user from group.
             */
            const params = {
                method: 'DELETE',
                callback: () => {
                    this.$emit('refreshGroups');
                    this.$store.commit('alert', {
                        message: 'Successfully removed user from group', status: 'success'
                    });
                }
            };

            const path = `/api/moderation/groups/${this.groupId}/users/${this.freet.authorId}`;
            this.request(path, params);
        },
        async request(path, params) {
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
                const r = await fetch(path, options);

                if (!r.ok) {
                    const res = await r.json();
                    console.log(res);
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
button {
    color: red;
}
</style>
  