<template>
  <div>
    <h3>Child1</h3>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: "Child1",
  props: ['msg'],

}
</script>

<style scoped>

</style>