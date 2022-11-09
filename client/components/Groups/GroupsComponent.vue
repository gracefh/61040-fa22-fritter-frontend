<!-- Reusable component representing a single group's information on the main groups page -->
<!-- We've tagged some elements with classes; consider writing CSS using those classes to style them... -->

<template>
    <main class="group">
        <div class="group-overall">
            <div class="group-info">
                <h3 class="group-name">
                    {{ group.name }}
                </h3>
                <div>{{ group.description }}</div>
            </div>

            <router-link :to="{ name: 'Group', params: { groupId: group._id, role: role } }">
                <button class="visit-group"> Visit</button>
            </router-link>

        </div>
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
        //   startEditing() {
        //     /**
        //      * Enables edit mode on this freet.
        //      */
        //     this.editing = true; // Keeps track of if a freet is being edited
        //     this.draft = this.group.content; // The content of our current "draft" while being edited
        //   },
        //   stopEditing() {
        //     /**
        //      * Disables edit mode on this freet.
        //      */
        //     this.editing = false;
        //     this.draft = this.group.content;
        //   },
        //   deleteFreet() {
        //     /**
        //      * Deletes this freet.
        //      */
        //     const params = {
        //       method: 'DELETE',
        //       callback: () => {
        //         this.$store.commit('alert', {
        //           message: 'Successfully deleted freet!', status: 'success'
        //         });
        //       }
        //     };
        //     this.request(params);
        //   },
        //   submitEdit() {
        //     /**
        //      * Updates freet to have the submitted draft content.
        //      */
        //     if (this.freet.content === this.draft) {
        //       const error = 'Error: Edited freet content should be different than current freet content.';
        //       this.$set(this.alerts, error, 'error'); // Set an alert to be the error text, timeout of 3000 ms
        //       setTimeout(() => this.$delete(this.alerts, error), 3000);
        //       return;
        //     }

        //     const params = {
        //       method: 'PATCH',
        //       message: 'Successfully edited freet!',
        //       body: JSON.stringify({content: this.draft}),
        //       callback: () => {
        //         this.$set(this.alerts, params.message, 'success');
        //         setTimeout(() => this.$delete(this.alerts, params.message), 3000);
        //       }
        //     };
        //     this.request(params);
        //   },
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
  