<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>组件通信</h1>
    <child1></child1>
    <child2></child2>
  </div>
</template>

<script>
import Child1 from "@/components/Child1";
import Child2 from "@/components/Child2";

export default {
  name: 'App',
  components: {
    Child1,
    Child2
  },
  methods: {

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
  margin-top: 60px;
}
</style>
