<template>
  <div id="app">
    <SportsList />
  </div>
</template>

<style>
  @import 'assets/css/style.css';
</style>

<script>

import SportsList from './components/SportsList.vue';

export default {
  name: 'App',
  components: {
    SportsList
  }
};
</script>
