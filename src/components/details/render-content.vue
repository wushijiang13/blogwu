<script>
import {wuCode,wuImg} from '@/components/utlis/details'
export default {
  name: "render-content",
  props:['articleInfo','generateHTML'],
  components:{
    wuCode,
    wuImg
  },
  data(){
      return {
        specialList:['code','img'],//需要特殊处理的标签
        specialMap: {
          'code':'wuCode',
          'img':'wuImg'
        },
        prohibitList:[] //不解析的标签
      }
  },
  methods:{
    /***
     * 生成item 的html 模板
     */
    getItemDomTree(item,h){
      //如果不是标签的话，else是文本
      if (typeof item == 'object' &&   Object.keys(item).length) {
        //是需要特殊处理的标签
        if (this.specialList.includes(item.tag)) {
          return h(
            this.specialMap[item.tag],
            {props:{params:item}}
          )
        } else if(this.prohibitList.includes(item.tag)){
          return;
        } else{
          return h(
            item.tag,
            this.forAttrs(item.attrs),
            this.cycleForArrayGenerateTemplate(item.children,h)
          )
        }
      }else{
        return h(
          'span',
          {
            domProps:{
              innerHTML:item,
            }
          }
        )
      }
    },
    /**
     * 循环attrs 参数
     * @param info
     */
    forAttrs(info){
      let attrsList=['class','style']
      let attrsMap={
        'class':``,
        style:{},
        attrs:{},
      };
      if (info && info.length) {
        info.forEach(item=>{
          if(attrsList.includes(item.name)){
            attrsMap[item.name]+=`${item.value} `;
          }else{
            attrsMap.attrs[item.name]=`${item.value}`;
          }
        })
      }
      return attrsMap;
    },
    /**
     * 循环遍历数组生成模板
     * @param info
     */
    cycleForArrayGenerateTemplate(children,h){
      let elementList=[];
      //用于遍历 标签嵌套的子项 ,递归循环遍历
      console.log(children);
      if (children && children.length && Array.isArray(children)) {
        children.forEach(item=>{
          elementList.push(this.getItemDomTree(item,h));
        })
      }
      return elementList;
    }
  },
  render(){
    var h = arguments[0];
    const {articleInfo} = this.$props;
    return h('div',this.cycleForArrayGenerateTemplate(articleInfo.article_json,h))
  }
}
</script>
<style lang="less" scoped>
  h1, h2, h3, h4, h5, h6{
    color: @theme-font-1-color;
  }
  pre{
    border-radius: @theme-boder-radius-width;
    margin-top: 10px;
    width: 100%;
  }
  pre > code {
    padding: 16px;
    font-size: 13px;
    user-select: text;
  }
  p{
    margin: 10px 0px;
  }
  hr{
    margin: 10px 0px;
  }
  a{
    color: @primary-color;
  }

  @media screen and (max-width: 960px) {
    /deep/ pre {
      width: 87vw;
    }
  }
</style>
