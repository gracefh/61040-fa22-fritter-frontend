<!-- Freet display for group, with freet moderation functionality included if necessary -->

<template>
  <section>
    <section class="main-info">
      <aside class="moderatorFunctions" v-if="showModeratorFunctions">
        <FreetModerationComponent ref="moderator" @refreshGroup="refreshGroup" :groupId="groupId" :freet="freet" />
      </aside>
      <FreetComponent ref="freet" @changedFreet="$emit('refreshGroup')" class="freet" :freet="freet" />
    </section>
  </section>
</template>


<script>
import FreetComponent from '@/components/Freet/FreetComponent.vue';
import FreetModerationComponent from '@/components/Group/FreetModerationComponent.vue'

export default {
  name: 'GroupFreetComponent',
  components: { FreetComponent, FreetModerationComponent },
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
  },
  data() {
    return {
      alerts: []
    };
  },
  methods: {
    refreshGroup() {
      this.$emit('refreshGroup');
    }

  }
};
</script>

<style scoped>
.main-info {
  border: 1px solid black;
}

.freet {
  border: none;
}

.moderatorFunctions {
  position: relative;
  float: right;
  z-index: 2;
}
</style>
