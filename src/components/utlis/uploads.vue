<template>
    <div class="uploads">
      <a-upload
        name="avatar"
        list-type="picture-card"
        class="avatar-uploader"
        :show-upload-list="false"
        accept="image/png,image/jpg"
        @change="uploadChange">
        <slot name="showImg">

        </slot>
        <div v-if="imgList.length > 0">
          <img  v-for="item in imgList" :key="item.src"  :src="item.src" alt="avatar" />
        </div>
        <div v-else>
          <a-icon :type="loading ? 'loading' : 'plus'" />
          <div class="ant-upload-text">
            上传
          </div>
        </div>
      </a-upload>
    </div>
</template>

<script>
import {upLoad} from '../../config/request/currency/utils'
export default {
  name: "uploads",
  model:{
    prop:"imgList",
    event:"update",
  },
  watch:{
    imgList(){
      this.$emit('update',this.imgList);
    }
  },
  data(){
    return {
      loading:false,
      imgList:[],//图片list
    }
  },
  methods:{
    uploadChange(info){
      console.log(info);
      if(info.file.status=="uploading"){
        this.upLoadImg(info.file);
      }
    },
    upLoadImg(file){
      return new Promise(resolve => {
        this.$post(upLoad,{img_file:file}).then((res)=>{
          if(res.code == 0){
            this.imgList=file;
            resolve(res);
          }
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
