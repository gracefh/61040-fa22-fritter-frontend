<!-- Form for creating freets in group -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
    name: 'CreateGroupFreetForm',
    mixins: [BlockForm],
    prop: { groupId: { type: String, required: true } },
    data() {
        return {
            url: `/api/groups/${this.$attrs.groupId}/freets`,
            method: 'POST',
            hasBody: true,
            fields: [
                { id: 'content', label: 'Content', value: '' }
            ],
            title: 'Create a Freet In the Group',
            refreshFreets: true,
            callback: () => {
                const message = 'Successfully created a freet in the group!';
                this.$emit('refreshGroup');
                this.$set(this.alerts, message, 'success');
                setTimeout(() => this.$delete(this.alerts, message), 3000);
            }
        };
    }
};
</script>
