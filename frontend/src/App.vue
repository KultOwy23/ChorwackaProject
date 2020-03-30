<template>
  <div id="app">
    <h1>Rachunki z Chorwackiej!</h1>
    <BillForm/>
  </div>
</template>

<script>
import BillForm from './components/BillForm.vue'
export default {
  components: {
    BillForm
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  text-align: center;
}
</style>
