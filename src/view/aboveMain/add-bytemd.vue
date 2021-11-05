<template>
  <div class="add-bytemd">
    <Editor :value="value" :plugins="plugins" @change="handleChange" />
  </div>
</template>

<script>

  import { Editor } from '@bytemd/vue'
  import gfm from '@bytemd/plugin-gfm'

  const plugins = [
    gfm(),
    // Add more plugins here
  ]
  export default {
    name: "add-bytemd",
    components: { Editor },
    data() {
      return { value: '', plugins }
    },
    methods: {
      handleChange(v) {
        this.value = v
      },
    }
  }
</script>

<style scoped>
  .bytemd {
    height: calc(100vh - 200px);
  }
</style>
