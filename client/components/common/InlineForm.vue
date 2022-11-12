<!-- Reusable component for a form in an inline style (input and button on same line) -->
<!-- This is just an example; feel free to define any reusable components you want! -->

<template>
  <form @submit.prevent="submit">
    <i class='fa fa-solid fa-magnifying-glass'></i>
    <input v-model="value" type="text" :placeholder="placeholder">
    <button type="submit">
      <slot>Submit</slot>
    </button>
    <section class="alerts">
      <article v-for="(status, alert, index) in alerts" :key="index" :class="status">
        <p>{{ alert }}</p>
      </article>
    </section>
  </form>
</template>

<script>
export default {
  name: 'InlineForm',
  props: {
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return { value: '', alerts: {} };
  }
};
</script>

<style scoped>
form {
  display: flex;
  position: relative;
  align-items: stretch;
  gap: .2em;
}

.fa-magnifying-glass {
  align-self: center;
}

input {
  padding: 0 5px;
  min-width: 200px;
}
</style>
