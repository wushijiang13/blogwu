<template>
  <!--文档-->
  <div class="documentation">
    <div class="documentation-details">
      <div class="documentation-cell">
        <ul class="documentation-ul">
          <li
            class="documentation-item"
            @click="getOpenDocumentation(item)"
            v-for="item in dataList"
            :key="item.documentation_id">
            <img :src="item.documentation_icon" alt=""/>
            <span>{{item.documentation_title}}</span>
          </li>
        </ul>
      </div>
    </div>
    <a-drawer
      :title="`iframe加载官方文档，侵权删   当前链接：${iframeSrc}`"
      placement="right"
      :visible="isDrawer"
      @close="hiddenDrawer"
      :width="'100%'"
      :zIndex="10001"
      :maskClosable="false"
    >
      <iframe class="iframe-box" :src="iframeSrc"></iframe>
    </a-drawer>
  </div>
</template>

<script>
  import {getDocumentationList} from '@/config/request/requestUrl'
  import {isNullCheck} from '@/utils/utils'
    export default {
      name: "documentation",
      data() {
        return {
          dataList: [],
          isDrawer:false,
          iframeSrc:"",
        }
      },
      methods: {
        init() {
          this.$https.post(getDocumentationList).then(({code, data}) => {
            if (code == 200) {
              if (isNullCheck(data)) {
                this.dataList = data;
              }
            }
          })
        },
        hiddenDrawer(){
          this.isDrawer=false;
        },
        getOpenDocumentation(item){
          this.isDrawer=true;
          this.iframeSrc=item.documentation_href;
        }
      },
      created() {
        this.init();
      }
    }
</script>

<style lang="less" scoped>
  .documentation{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  .documentation-details{
    width: 95vw;
    padding: 1rem;
    background-color: @theme-bubble-bg-color;
    word-break: break-all;
    display: inline-block;
    border-radius: @theme-boder-radius-width;
    padding-bottom: 20px;
  }
  .documentation-cell{
    width: 100%;
    height: 200px;
  }
  .documentation-ul{
    width: 100%;
    height: 100%;
  }
  .documentation-item{
    width: 5rem;
    padding: 0.5rem;
    margin: 0 5px;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: @theme-boder-radius-width;
    border: 1px solid @theme-boder-color;
    color: @theme-font-1-color;
    font-weight: 600;
    cursor: pointer;
    line-height: 30px;
  }
  .documentation-item > img {
     width: 3rem;
  }
  .iframe-box{
    width: 100%;
    height: 92vh;
  }
</style>
