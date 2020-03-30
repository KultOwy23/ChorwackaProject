<template>
  <div id="app">
    <h1>Rachunki z Chorwackiej!</h1>
    <TodoList/>
    <BillForm/>
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue'
import BillForm from './components/BillForm.vue'
export default {
  components: {
    TodoList,
    BillForm
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
