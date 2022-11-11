<!-- Show all members of a group -->

<template>
    <aside>
        <header>
            <h3>Members</h3>
        </header>
        <ul class="member-list">
            <li v-for="user in members" :key="user._id">
                {{ user.username }}
                <MemberModerationComponent v-if="canRemove(user._id)" :groupId="groupId" :userId="user._id" @refreshGroup="$emit('refreshGroup')"/>
            </li>
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
ul {
    list-style-type: none;
    padding-left:0;
}

aside {
    padding:1em;
    border-bottom: 2px solid #0D0D0D;
}
</style>
  