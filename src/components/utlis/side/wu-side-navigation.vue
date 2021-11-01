<!--导航-->
<template>
  <div>
    <div class="wu-side-navigation">
      <p class="side-label">目录</p>
      <ul class="side-ul" v-show="treeList.length">
        <li v-for="(item,index) in treeList"
            :key="generateKey(item,index)"
            @click="jumpTitle(item)">
          <span class="side-title">{{item.title}}</span>
          <template v-if="item.children">
            <wuSideChildrenComponent  :childrenList="item.children"/>
          </template>
        </li>
      </ul>
      <p class="side-no-data" v-show="!treeList.length">暂无目录</p>
    </div>
  </div>

</template>

<script>
    import wuSideChildrenComponent from './wu-side-children-component'
    export default {
      name: "wu-side-navigation",
      data(){
        return {
          pickedList:['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
          treeList:[
            {
              title:"正在生成标题..",
              children:[]
            }
          ],
          virtualDom:'',//虚拟dom 侧边导航树
        }
      },
      props:{
        queryDom:{
          default:".article-content",
          type:String
        }
      },
      components:{
        wuSideChildrenComponent,
      },
      methods:{
        //1.查找content 所有的dom节点
        //2.查找下面所有H开头的标签，然后获取到，最后 在每个H开头的标签上面加上class 方便跳转
        init(){
            let levelList=document.querySelectorAll(this.pickedList);
            this.treeList=[];//数组值
            let currentMaxDom=null;
            for (let i = 0; i < levelList.length; i++) {
              let current={
                id:`head-${i}-${this.getLevel(levelList[i].tagName)}`,
                level:this.getLevel(levelList[i].tagName),
                title: levelList[i].innerText,
                children:[],
              }
              levelList[i].id= current.id;
              //是否有当前最大的值了
              if (currentMaxDom) {
                if (current.level > currentMaxDom.level) {
                  currentMaxDom = this.insertTree(current,currentMaxDom);
                }else {
                  this.treeList.push(currentMaxDom);
                  currentMaxDom=current;
                }
              }else{
                //没有的话，证明这是第一次循环
                currentMaxDom=current;
              }
              if (i == levelList.length -1 ){
                this.treeList.push(currentMaxDom);
              }
            }
        },
        /**
         * 获取传入dom的等级
         * @param tagName H1 截取数字
         * @returns {*}
         */
        getLevel(tagName) {
          return tagName ? tagName.slice(1) : 0
        },
        /**
         * 递归查找对应位置并插入
         * @param currentDom 当前dom
         * @param currentMaxDom 目前最大层级的dom
         * @returns {*} 返回插入完成值的currentMaxDom
         */
        insertTree(currentDom,currentMaxDom) {
          let newCurrentMaxDom=currentMaxDom;
          if (currentMaxDom.children.length) {
            if (currentDom.level > currentMaxDom.children[0].level) {
              //如果当前值 大于 当前子集内容
              let childFinally=newCurrentMaxDom.children[newCurrentMaxDom.children.length-1];
              newCurrentMaxDom.children[currentMaxDom.children.length-1] = insertTree(currentDom,childFinally);
            }else{
              //如果不大于内部等级 那就是 当前值 == 当前层级 直接push 到当前子集中
              newCurrentMaxDom.children.push(currentDom);
            }
          }else{
            //如果找到子集没有的话 ，就证明找到层级了
            newCurrentMaxDom.children.push(currentDom);
          }

          return newCurrentMaxDom;
        },
        /**
         * 跳转标题
         * @param dom
         */
        jumpTitle(dom){
          document.querySelector(`#${dom.id}`).scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest"});
        },
        /**
         * 生成key
         */
        generateKey(item,index){
          return `${item.title}-${index}`;
        }
      }
    }
</script>

<style lang="less" scoped>
  .wu-side-navigation {
    position: sticky;
    top: 80px;
    padding: 0.8rem;
    width: 200px;
    color: @theme-font-1-color;
    .side-label{
      font-size: @theme-title-size;
      margin-bottom: 10px;
      font-weight: 600;
      margin-left: 16px;
    }
  }
  .side-title{
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    cursor: pointer;
    line-height: 24px;
    font-weight: 600;
  }
  .side-title:hover{
    text-decoration: underline;
  }
  .side-title::before{
    content: "*";
    display: inline-block;
    font-size: 12px;
    margin-right: 5px;
  }
  .side-ul{
    list-style: none;
  }
  .side-no-data{
    text-align: center;
  }
</style>
