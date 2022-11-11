<!-- Show all members of a group -->

<template>
    <aside>
        <header>
            <h3>Members</h3>
        </header>
        <ul class="member-list">
            <div v-for="user in members" :key="user._id">
                {{ user.username }}
                <MemberModerationComponent v-if="canRemove(user._id)" :groupId="groupId" :userId="user._id" />
            </div>
        </ul>
    </aside>

</template>
  
<script>
import MemberModerationComponent from '@/components/Group/MemberModerationComponent.vue'

export default {
    name: 'MemberListComponent',
    components: { MemberModerationComponent },
    props: {
        members: {
            type: Array,
            required: true
        },
        moderators: {
            type: Array,
            required: true
        },
        groupId: {
            type: String,
            required: true
        },
        showModeratorFunctions: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        canRemove(userId) {
            console.log(userId, this.moderators);
            console.log(this.moderators.some((moderator) => moderator._id === userId));
            return this.showModeratorFunctions && !this.moderators.some((moderator) => moderator._id === userId);
        }
    }
};
</script>
  
<style scoped>

</style>
  