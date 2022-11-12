<!-- Show all owner functionalities in group -->

<template>
    <section class="owner-component">
        <h3>Owner Actions</h3>
        <section class="actions">
            <section>
                <button v-if="editingName" @click="submitEditName">
                    ✅ Save changes
                </button>
                <button v-if="editingName" @click="stopEditingName">
                    🚫 Discard changes
                </button>
                <button v-if="!editingName" @click="startEditingName">
                    <i class="fa fa-solid fa-pencil"></i> Edit Group Name
                </button>
                <textarea v-if="editingName" class="content" :value="nameDraft"
                    @input="nameDraft = $event.target.value" />
            </section>
            <section>
                <button v-if="editingDescription" @click="submitEditDescription">
                    ✅ Save changes
                </button>
                <button v-if="editingDescription" @click="stopEditingDescription">
                    🚫 Discard changes
                </button>
                <button v-if="!editingDescription" @click="startEditingDescription">
                    <i class="fa fa-solid fa-pencil"></i> Edit Group Description
                </button>
                <textarea v-if="editingDescription" class="content" :value="descriptionDraft"
                    @input="descriptionDraft = $event.target.value" />
            </section>
            <section>
                <section v-if="showDeletionDialogue">
                    <p>Are you sure you want to delete the group?</p>
                    <div style="display:flex; justify-content:space-around">
                        <button @click="showDeletionDialogue = false">
                            <i class="fa fa-solid fa-x"></i> No
                        </button>
                        <button @click="deleteGroup" class="delete">
                            <i class="fa fa-regular fa-trash-can"></i> Yes
                        </button>
                    </div>
                </section>
                <button v-else @click="showDeletionDialogue = true" class="delete">
                    <i class="fa-regular fa-trash-can"></i> Delete Group
                </button>
            </section>
        </section>
        <section class="alerts">
            <article v-for="(status, alert, index) in alerts" :key="index" :class="status">
                <p>{{ alert }}</p>
            </article>
        </section>
    </section>
</template>
  
<script>

export default {
    name: 'OwnerComponent',
    props: {
        group: {
            type: Object, required: true
        },
        groupId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            editingDescription: false,
            editingName: false,
            showDeletionDialogue: false,
            alerts: {}
        }
    },
    methods: {
        startEditingDescription() {
            /**
             * Enables edit mode on the group description.
             */
            this.editingDescription = true; // Keeps track of whether group description is being edited
            this.descriptionDraft = this.group.description; // The content of our current "draft" while being edited
        },
        stopEditingDescription() {
            /**
             * Disables edit mode on the group description.
             */
            this.editingDescription = false;
            this.descriptionDraft = this.group.description;
        },
        submitEditDescription() {
            /**
             * Updates group description to have the submitted draft content.
             */
            if (this.group.description === this.descriptionDraft) {
                const error = 'Error: Edited description content should be different than current description content.';
                this.$set(this.alerts, error, 'error'); // Set an alert to be the error text, timeout of 3000 ms
                setTimeout(() => this.$delete(this.alerts, error), 3000);
                return;
            }

            const params = {
                method: 'PUT',
                message: 'Successfully edited description!',
                body: JSON.stringify({ description: this.descriptionDraft }),
                callback: () => {
                    this.editingDescription = false;
                    this.$set(this.alerts, params.message, 'success');
                    setTimeout(() => this.$delete(this.alerts, params.message), 3000);
                    this.$emit('refreshGroup');
                }
            };
            this.request(params);
        },
        startEditingName() {
            /**
             * Enables edit mode on the group name.
             */
            this.editingName = true; // Keeps track of whether group name is being edited
            this.nameDraft = this.group.name; // The content of our current "draft" while being edited
        },
        stopEditingName() {
            /**
             * Disables edit mode on the group name.
             */
            this.editingName = false;
            this.nameDraft = this.group.name;
        },
        submitEditName() {
            /**
             * Updates group description to have the submitted draft content.
             */
            if (this.group.name === this.nameDraft) {
                const error = 'Error: Edited name should be different than current group name.';
                this.$set(this.alerts, error, 'error'); // Set an alert to be the error text, timeout of 3000 ms
                setTimeout(() => this.$delete(this.alerts, error), 3000);
                return;
            }

            const params = {
                method: 'PUT',
                message: 'Successfully edited description!',
                body: JSON.stringify({ name: this.nameDraft }),
                callback: () => {
                    this.editingName = false;
                    this.$set(this.alerts, params.message, 'success');
                    setTimeout(() => this.$delete(this.alerts, params.message), 3000);
                    this.$emit('refreshGroup');
                }
            };
            this.request(params);
        },
        deleteGroup() {
            /**
             * Deletes this group.
             */
            const params = {
                method: 'DELETE',
                callback: () => {
                    this.$store.commit('alert', {
                        message: 'Successfully deleted group!', status: 'success'
                    });
                }
            };

            this.request(params);
        },
        transferOwnership(username) {
            /**
             * Transfers ownership of this group to another user.
             */
            const params = {
                method: 'PUT',
                body: JSON.stringify({ content: this.username }),
                callback: () => {
                    this.$store.commit('alert', {
                        message: 'Successfully deleted group!', status: 'success'
                    });
                }
            };

            this.transferOwnershipRequest(params);
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
                const r = await fetch(`/api/owner/groups/${this.groupId}`, options);
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

            // redirect if deleting group
            if (params.method === 'DELETE') {
                this.$router.push('/groups');
            }
        },
        async transferOwnershipRequest(params) {
            /**
             * Submits a request to transfer ownership
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
                const r = await fetch(`/api/owner/groups/${this.groupId}/newOwner`, options);
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
        },
        async moderatorRequest(params) {
            /**
             * Submits a request to owner router relating to moderator functions
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
                const r = await fetch(`/api/owner/groups/${this.groupId}/moderator`, options);
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
.owner-component {
    padding-bottom: 1em;
    border-bottom: 2px solid #0D0D0D;
}

.actions {
    display: flex;
    flex-direction: column;
    gap: 1em;
}

.delete {
    color: #cf0000;
}
</style>
  