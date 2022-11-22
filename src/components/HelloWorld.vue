<template>
  <div class="hello">
    <router-view></router-view>
    <router-link to="/">222</router-link>
    <hr>
    <router-link to="logon">111</router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
