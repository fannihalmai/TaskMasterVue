<template>
  <div id="app">
    <AppBar />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import AppBar from './components/AppBar.vue';
export default {
  name: 'App',
  components: {
    AppBar,
  },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.container {
  display: flex; /* or inline-flex */
  justify-content: space-between;
  padding-top: 64px; /* Adjust this value to match the height of your app bar */
  align-items: stretch;

}
</style>
