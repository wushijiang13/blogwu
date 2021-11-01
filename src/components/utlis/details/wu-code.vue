<template>
    <span class="wu-code" v-html="generateHTML">

    </span>
</template>

<script>
  /**
   * 根据br 去截取判断是一行，然后加入 li 标签 并自动计算行号
   */
  // import 'highlight.js/styles/agate.css'
    import 'highlight.js/styles/androidstudio.css'
    export default {
      name: "wu-code",
      props:{
        'params':{
          default:()=>{},
          type:Object
        }
      },
      data(){
        return {
          generateHTML:``,
        }
      },
      methods:{
          /**
           * 生成dom树
           */
          initTemplate(json){
            this.generateHTML=``;//生成的html模板
            if (json) {
              this.generateHTML=this.getItemDomTree(json);
              console.log(this.generateHTML);
            }
          },
          /***
           * 生成item 的html 模板
           */
          getItemDomTree(item_info) {
            //如果不是标签的话，else是文本
            if (typeof item_info == 'object' && Object.keys(item_info).length) {
              return `<${item_info.tag} ${this.forAttrs(item_info.attrs)}>${this.cycleForArrayGenerateTemplate(item_info.children)}</${item_info.tag}>`;
            } else {
              return `${item_info}`
            }
          },
          /**
           * 循环attrs 参数
           * @param info
           */
          forAttrs(info){
            let attrsDomTree=``;
            if (info && info.length) {
              info.forEach(item=>{
                attrsDomTree+=`${item.name}='${item.value}'`
              })
            }
            return attrsDomTree;
          },
          /**
           * 循环遍历数组生成模板
           * @param info
           */
          cycleForArrayGenerateTemplate(children){
            let generateTemplate=``;
            //用于遍历 标签嵌套的子项 ,递归循环遍历
            if (children.length) {
              children.forEach(item=>{
                generateTemplate+=this.getItemDomTree(item);
              })
            }
            return generateTemplate;
          }
      },
      mounted() {
        this.$nextTick(()=>{
          console.log(document.querySelectorAll('div.code'));
          // this.generateHTML = hljs.highlight(this.generateHTML, {language: 'JavaScript'}).value;
          // document.querySelectorAll('code.xmp').forEach(el => {
          //   // then highlight each
          //   hljs.highlightElement(el);
          // });
        })
      },
      watch:{
        'params':{
          handler(newValue){
            if (newValue && Object.keys(newValue).length) {
              this.initTemplate(newValue);
            }
          },
          deep:true,
          immediate: true,
        }
      }
    }
</script>

<style lang="less" scoped>
  .wu-code{
    width: 100%;
  }
  @media screen and (max-width: 960px) {
    .wu-code{
      width: 87vw;
    }
  }
</style>
