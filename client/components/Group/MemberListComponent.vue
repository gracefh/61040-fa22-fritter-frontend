<!-- Show all members of a group -->

<template>
    <aside class="all-members">
        <header>
            <h3>Members</h3>
        </header>
        <ul class="member-list">
            <li v-for="user in members" :key="user._id">
                <p>{{ user.username }}</p>
                <MemberModerationComponent v-if="canRemove(user._id)" :groupId="groupId" :userId="user._id"
                    @refreshGroup="$emit('refreshGroup')" />
                <MemberOwnerComponent v-if="showOwnerComponent(user.username)" :groupId="groupId" :userId="user._id"
                    :isUserModerator="isModerator(user._id)" @refreshGroup="$emit('refreshGroup')" />
            </li>
        </ul>
    </aside>

</template>
  
<script>
import MemberModerationComponent from '@/components/Group/MemberModerationComponent.vue'
import MemberOwnerComponent from '@/components/Group/MemberOwnerComponent.vue'

export default {
    name: 'MemberListComponent',
    components: { MemberModerationComponent, MemberOwnerComponent },
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
        },
        showOwnerFunctions: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        canRemove(userId) {
            return this.showModeratorFunctions && !this.isModerator(userId);
        },
        showOwnerComponent(username) {
            return this.showOwnerFunctions && username !== this.$store.state.username;
        },
        isModerator(userId) {
            return this.moderators.some((moderator) => moderator._id === userId);
        }
    }
};
</script>
  
<style scoped>
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

.all-members {
    padding: 0em 1em 1em;
    border-bottom: 2px solid #0D0D0D;
}
</style>
  