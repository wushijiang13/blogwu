<template>
  <div class="wu-side-children-component">
    <template v-if="childrenList">
      <ul class="sub-ul">
        <li v-for="item in childrenList"
          :key="item.title"
        >
          <span class="side-title"  @click.stop="jumpTitle(item)"> <wu-icon type="icon-dian"  :size="20" />{{item.title}}</span>
          <template v-if="item.childrenList">
            <wu-side-children-component  :data-list="item.children"></wu-side-children-component>
          </template>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
    export default {
        name: "wu-side-children-component",
        props:{
          'childrenList':{
            default:function () {
              return [];
            },
            type:Array
          }
        },
        methods:{
          /**
           * 跳转标题
           * @param dom
           */
          jumpTitle(dom){
            scrollTo(0, document.querySelector(`#${dom.id}`).offsetTop);
          },
        }
    }
</script>

<style scoped>
  .side-title{
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    /* 弹性伸缩盒子模型显示 */
    display: -webkit-box;
    /* 限制在一个块元素显示的文本的行数 */
    -webkit-line-clamp: 1;
    /* 设置或检索伸缩盒对象的子元素的排列方式 */
    -webkit-box-orient: vertical;
    cursor: pointer;
    line-height: 24px;
    font-weight: 600;
  }
  .side-title:hover{
    text-decoration: underline;
  }
  .sub-ul{
    list-style: none;
    margin-left: 15px;
  }
</style>
