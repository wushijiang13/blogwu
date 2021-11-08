<template>
  <div class="add-bytemd">
    <Editor
            :locale="zh_Hans"
            :value="makedownValue"
            :plugins="plugins"
            placeholder="开始创作！"
            :uploadImages="uploadImages"
            @change="handleChange"
    />
  </div>
</template>

<script>
  import zh_Hans from 'bytemd/lib/locales/zh_Hans.json'
  import { Editor } from '@bytemd/vue'
  import gfm from '@bytemd/plugin-gfm'
  import highlight from '@bytemd/plugin-highlight'
  import zoom from '@bytemd/plugin-medium-zoom'

  const plugins = [
    gfm(),
    highlight(),
    zoom(),
  ]
  export default {
    name: "add-bytemd",
    components: { Editor },
    data() {
      return {
        makedownValue: '',
        plugins,
        zh_Hans
      }
    },
    methods: {
      handleChange(v) {
        this.value = v
      },
      uploadImages(){
        //转成base64存储
      }
    }
  }
</script>

<style lang="less" scoped>
  .bytemd {
    height:calc(100vh - 100px);
  }
  /deep/.bytemd-split{
    height: calc(100vh - 100px);
  }
</style>
