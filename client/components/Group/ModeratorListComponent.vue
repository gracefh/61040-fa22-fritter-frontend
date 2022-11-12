<!-- Show all moderators of a group -->

<template>
    <section class="all-moderators">
        <header>
            <h3>Moderators</h3>
        </header>
        <ul class="moderator-list">
            <li v-for="user in moderators">
                <p>{{ user.username }}</p>
                <button v-if="showOwnerFunctions && user.username !== $store.state.username"
                    @click="removeUserFromModerator(user._id)">
                    Remove User From Moderators
                </button>
            </li>
        </ul>
    </section>
</template>
  
<script>

export default {
    name: 'ModeratorListComponent',
    props: {
        moderators: {
            type: Array,
            required: true
        },
        groupId: {
            type: String,
            required:true
        },
        showOwnerFunctions: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        removeUserFromModerator(userId) {
            /**
             * remove user from moderator position in group
             */
            const params = {
                method: 'DELETE',
                callback: () => {
                    this.$emit('refreshGroup');
                    this.$store.commit('alert', {
                        message: 'Successfully removed user from moderator position in group', status: 'success'
                    });
                }
            };

            const path = `/api/owner/groups/${this.groupId}/moderators/${userId}`;
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
  
<style scoped>
ul {
    list-style-type: none;
    padding-left: 0;
}

aside {
    padding: 1em;
    border-bottom: 2px solid #0D0D0D;
}


ul {
    list-style-type: none;
    padding-left: 0;
}

p {
    margin: 0;
}

p:not(:last-child) {
    margin: .2em 0;
}

li {
    padding: .3em;
}

li:not(:last-child) {
    border-bottom: 1px solid #0D0D0D;
}

.all-moderators {
    padding: 0em 1em 1em;
    border-bottom: 2px solid #0D0D0D;
}

.button {
    color:#cf0000;
}
</style>
  