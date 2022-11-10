<!-- Show all owner functionalities in group -->

<template>
    <aside>
        <!-- <button v-if="editing" @click="submitEdit">
            ✅ Save changes
        </button>
        <button v-if="editing" @click="stopEditing">
            🚫 Discard changes
        </button>
        <button v-if="!editing" @click="startEditing">
            ✏️ Edit
        </button> -->
        <button @click="removeFreet">
            🗑️ Remove Freet
        </button>
    </aside>

</template>
  
<script>

export default {
    name: 'ModeratorComponent',
    props: {
        groupId: {
            type: String,
            required: true
        },
        freetId: {
            type: String,
            required: true
        }
    },
    methods: {
        removeFreet() {
            /**
             * remove freet.
             */
            const params = {
                method: 'DELETE',
                callback: () => {
                    this.$store.commit('alert', {
                        message: 'Successfully removed freet!', status: 'success'
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
                const r = await fetch(`/api/moderation/groups/${this.groupId}`, options);
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

</style>
  