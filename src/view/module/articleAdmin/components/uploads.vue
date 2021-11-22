<template>
  <div class="uploads">
    <a-upload-dragger
      v-if="imgList.length <= 0"
      name="avatar"
      list-type="picture-card"
      class="avatar-uploader"
      :show-upload-list="false"
      accept="image/png,image/jpg"
      :custom-request="upLoadImg"
      :file-list="imgList"
      limit="1"
      drag>
      <template>
        <p class="ant-upload-icon">
          <a-icon :type="loading ? 'loading' : 'plus'"/>
        </p>
        <p class="ant-upload-text">
          文件拖到此处，或<em>点击上传</em>
        </p>
        <p class="ant-upload-hint">
          只能上传jpg/png文件，且不超过2MB
        </p>
      </template>
    </a-upload-dragger>
    <template v-else>
      <img  class="upload_img" v-for="item in imgList" :key="item" :src="item" alt="avatar"/>
    </template>
  </div>
</template>

<script>
  export default {
    name: "uploads",
    model: {
      prop: "imgList",
      event: "update",
    },
    watch: {
      imgList() {
        this.$emit('update', this.imgList);
      }
    },
    data() {
      return {
        loading: false,
        imgList: [],//图片list
      }
    },
    methods: {
      upLoadImg(option) {
        return new Promise(resolve => {
          this.$https.uploads(option.file).then(({code, data}) => {
            if (code == 200) {
              this.imgList=[];
              this.imgList.push(data[0].file_url);
              resolve(data);
            }
          })
        })
      }
    }
  }
</script>

<style scoped>
  .upload_img{
    width: 200px;
  }
</style>
