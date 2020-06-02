<template>
  <div id="app">
    <Head></Head>
    <router-view/>

  </div>

</template>

<script>
import Head from "./components/public/Head";
export default {
  name: 'App',
  components: {Head}
}
</script>

<style>
#app {

}

</style>
