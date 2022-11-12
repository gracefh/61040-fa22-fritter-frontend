<!-- Remove freet functionality for moderators -->

<template>
    <aside>
        <section v-if="showDeletionDialogue" class="deletion-dialogue">
            <p>Are you sure you want to remove the freet?</p>
            <div class="options">
                <button @click="showDeletionDialogue = false">
                    <i class="fa fa-solid fa-x"></i> No
                </button>
                <button @click="removeFreet" class="delete">
                    <i class="fa fa-regular fa-trash-can"></i> Yes
                </button>
            </div>
        </section>
        <button v-else @click="showDeletionDialogue = true" class="main-button delete">
            <i class="fa-regular fa-trash-can"></i> Remove Freet From Group
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
            showDeletionDialogue: false
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
                        message: 'Successfully removed freet from group', status: 'success'
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
.main-button {
    margin-top:1em;
    margin-right:1em;
}
.delete {
    color: #cf0000;
}

.deletion-dialogue {
    padding:1em;
    background-color: #F2E7DC;
    opacity:.8;
    
}

.deletion-dialogue > p {
    margin:0;
    padding-bottom:.2em;
}

.options {
    display:flex;
    justify-content:center;
    align-items:center;
    gap:1em;
}
</style>
  