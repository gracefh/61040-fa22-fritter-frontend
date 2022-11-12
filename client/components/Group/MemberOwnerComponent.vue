<!-- Show owner functionalities for each member -->

<template>
    <aside>
        <button v-if="!isUserModerator" @click="makeModerator">
            Make User Moderator
        </button>
        <button @click="transferGroupOwnership">
            Transfer Group Ownership
        </button>
    </aside>
</template>
  
<script>

export default {
    name: 'MemberOwnerComponent',
    props: {
        groupId: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        isUserModerator: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            alerts: []
        }
    },
    methods: {
        makeModerator() {
            /**
             * make user moderator of group
             */
            const params = {
                method: 'POST',
                body: JSON.stringify({ userId: this.userId }),
                callback: () => {
                    this.$emit('refreshGroup');
                    this.$store.commit('alert', {
                        message: 'Successfully added user as moderator in group', status: 'success'
                    });
                }
            };

            const path = `/api/owner/groups/${this.groupId}/moderators`;
            this.request(path, params);
        }, transferGroupOwnership() {
            /**
             * transfer ownership of group to another user
             */
            const params = {
                method: 'PUT',
                body: JSON.stringify({ userId: this.userId }),
                callback: () => {
                    this.$emit('refreshGroup');
                    this.$store.commit('alert', {
                        message: 'Successfully transferred group ownership to user', status: 'success'
                    });
                }
            };

            const path = `/api/owner/groups/${this.groupId}/newOwner`;
            this.request(path, params);
        },
        async request(path, params) {
            /**
             * Submits a request to the moderator's endpoint
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