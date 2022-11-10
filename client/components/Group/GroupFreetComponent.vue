<!-- Form for getting freets (all, from user) (inline style) -->

<template>
  <section>
    <FreetComponent :freet="freet" />
    <ModeratorComponent v-if="showModeratorFunctions" :groupId="groupId" :freetId="freet._id" />
  </section>
</template>


<script>
import FreetComponent from '@/components/Freet/FreetComponent.vue';
import ModeratorComponent from '@/components/Group/ModeratorComponent.vue'

export default {
  name: 'GroupFreetComponent',
  components: {FreetComponent, ModeratorComponent},
  props: {
    freet: {
      type: Object,
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
  }
};
</script>
