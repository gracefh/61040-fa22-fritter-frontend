<!-- Remove freet functionality for moderators -->

<template>
    <aside>
        <button @click="removeFreet">
            Remove Freet
        </button>
    </aside>
</template>
  
<script>

export default {
    name: 'FreetModerationComponent',
    props: {
        groupId: {
            type: String,
            required: true
        },
        freet: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            alerts: []
        }
    },
    methods: {
        removeFreet() {
            /**
             * remove freet from group.
             */
            const params = {
                method: 'DELETE',
                callback: () => {
                    this.$emit('refreshGroup');
                    this.$store.commit('alert', {
                        message: 'Successfully removed freet', status: 'success'
                    });
                }
            };

            const path = `/api/moderation/groups/${this.groupId}/freets/${this.freet._id}`;
            this.request(path, params);
        },
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
  