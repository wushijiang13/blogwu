<template>
  <!--文档-->
  <div class="documentation">
    <wuExpand
      v-for="typeInfo in dataList"
      :key="typeInfo.type_id"
      :currentId="typeInfo.type_id"
      :title="typeInfo.type_name"
    >
      <template slot="expand-head-left">
        <span class="documentation-title">{{typeInfo.type_name}}</span>
        <span>({{typeInfo.data.length}})</span>
      </template>
      <template slot="expand-main">
        <div class="documentation-cell">
          <ul class="documentation-ul">
            <li
              class="documentation-item"
              v-for="item in typeInfo.data"
              :key="item.documentation_id"
              @click="getOpenDocumentation(item)"
            >
              <img :src="item.documentation_icon" alt=""/>
              <span>{{item.documentation_title}}</span>
            </li>
          </ul>
        </div>
      </template>
    </wuExpand>
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
  import {wuExpand} from '@/components/utils'
    export default {
      name: "documentation",
      data() {
        return {
          dataList: [],
          isDrawer:false,
          iframeSrc:"",
        }
      },
      components:{
        wuExpand,
      },
      methods: {
        init() {
          this.$https.post(getDocumentationList).then(({code, data}) => {
            if (code == 200) {
              if (isNullCheck(data)) {
                this.dataList=[];
                data.forEach(item=>{
                  if (!this.dataList[item.documentation_type]) {
                    this.dataList[item.documentation_type]={
                        type_id:item.documentation_type_id,
                        type_name:item.documentation_type_name,
                        type_weight:item.documentation_weight,
                        data:[]
                    }
                  }
                  this.dataList[item.documentation_type].data.push(item);
                })
                this.dataList.splice(0,1);
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
    flex-direction: column;
    margin-bottom: 20px;
    .expand{
      margin-bottom: 20px;
    }
  }
  .documentation-cell{
    width: 100%;
  }
  .documentation-ul{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .documentation-title{
    position: relative;
    margin-left:14px;
  }
  .documentation-title::before{
    content: "";
    display: inline-block;
    position: absolute;
    width: 4px;
    top: 3px;
    left:-10px;
    height:  @theme-emphasize-size;
    background-color: @primary-color;
  }
  .documentation-item{
    width: 12.5%;
    height: 80px;
    overflow: hidden;
    margin:0px 0.8%;
    margin-bottom: 15px;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: @theme-boder-radius-width;
    border: 1px solid @theme-boder-color;
    color: @theme-font-1-color;
    font-weight: 600;
    cursor: pointer;
  }
  .documentation-item > img {
     width: 2.9rem;
  }
  .documentation-item > span{
    margin-top: 4px ;
  }
  .iframe-box{
    width: 100%;
    height: 92vh;
  }
  /**
   * 计算公式
   * 总共需要展示几个 然后在展示的数量上多加一个 去做除法
   * 用总宽度 处于 上面计算出来的结果 如：我页面需要展示 4 个而我的总宽度是100 那就用 100/5
   * 计算出来的结果 再除以需要展示的数量 如： 20/4
   * 计算出的结果 在除以左右间距 也就是：5/2
   * 最后的出来的就是 每个快的宽度 25% 每个左右边距 是2.5% 需要记住 如果嫌弃间隙过大 可以减少 左右边距大小
   * 最后快需要 加上 左右边距 减去的值 乘 2 如 ： 2.5 边距 变成 1.5 那 块的宽度按需要加 2
   */
  @media screen and (max-width: 950px) {
    .documentation-item{
      width:22%;
      margin:0px 1.5%;
      margin-bottom: 15px;
    }
  }
  @media screen and (max-width: 750px) {
    .documentation-item{
      width: 29%;
      margin:0px 2.16%;
      margin-bottom: 15px;
    }
  }
</style>
