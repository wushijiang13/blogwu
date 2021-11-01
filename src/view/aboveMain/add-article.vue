<template>
  <div class="add-article">
    <div class="add-article-mian">
      <div class="add-mian-div" v-show="pageStatus">
        <p class="head-title-p">添加文章</p>
        <div class="content-write">
          <div class="content-editor">
            <a-form-model  :rules="rules" :model="articleInfo" ref="ruleForm" >
              <a-form-model-item  ref="article_title" prop="article_id">
                <a-input placeholder="请输入文章id"  v-model="articleInfo.article_id" @keydown.enter="getArticleById(articleInfo.article_id)"/>
              </a-form-model-item>
              <a-form-model-item   ref="article_title" prop="article_title">
                <a-input placeholder="请输入文章标题"  v-model="articleInfo.article_title"/>
              </a-form-model-item>
              <a-form-model-item >
                <uploads v-model="articleInfo.article_cover"/>
              </a-form-model-item>
              <a-form-model-item  ref="article_type" prop="article_type">
                <a-select
                  placeholder="请选择文章分类"
                  show-search
                  :allowClear="true"
                  v-model="articleInfo.article_type"
                  option-filter-prop="children"
                  :dropdownStyle="{zIndex:99999}"
                >
                  <a-select-option
                    v-for="(item,index) in articleTypeList"
                    :key="index"
                    :value="item.article_types_id">
                    {{item.article_types_name}}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item  ref="article_technology_type" prop="article_technology_type">
                <a-select
                  placeholder="请选择文章系列分类"
                  show-search
                  :allowClear="true"
                  option-filter-prop="children"
                  v-model="articleInfo.article_technology_type"
                  :dropdownStyle="{zIndex:99999}"
                >
                  <a-select-option value="单文">
                    单文
                  </a-select-option>
                  <a-select-option value="系列">
                    系列
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <input type="text" style="opacity: 0;position: absolute;" v-model="copyInput" ref="copyInput">
              <p style="padding-bottom: 40px"></p>
            </a-form-model>
            <div ref="editor" class="editor"></div>
          </div>
          <detailsContent :articleInfo="articleInfo" class="content-render"/>
        </div>

        <a-button type="primary" class="copyHtml" style="float: right; margin-top: 20px" @click="copyText(2)">
          copy-TEXT代码
        </a-button>
        <a-button type="primary" class="copyHtml" style="float: right;margin-right: 10px; margin-top: 20px"
                  @click="copyText(1)">copy-HTML代码
        </a-button>
        <a-button type="primary" class="copyHtml" style="float: right;margin-right: 10px; margin-top: 20px"
                  @click="copyText(3)">copy-JSON代码
        </a-button>
        <a-button class="submit-btn" @click="submitArticleBtn" type="primary">提交文章</a-button>
      </div>

      <div class="result" v-show="!pageStatus">
        <a-result
          status="success"
          :title="'操作《'+articleInfo.article_title+'》成功!'"
        >
          <template #extra>
            <a-button key="console" @click="carryAdd" type="primary">
              继续操作
            </a-button>
            <a-button @click="()=>{$router.push('/')}" key="buy">
              去博客
            </a-button>
          </template>
        </a-result>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   * 这个页面的规划
   * 1.如果加入一个抽离好的文章详情页展示效果
   * 2.需要整体调整一下ui效果
   * 3.确认下是否在这里初始化行号 因为代码高亮 是使用编辑器内置加入的class 所以需要确认下。
   * highlightjs-line-numbers.js
   */
import Editor from "wangeditor"
import uploads from "../../components/utlis/uploads";
import detailsContent from '@/components/details/details-content.vue'
import {getArticleTypeList,insertArticle,getArticleById,updateArticle} from '../../config/request/requestUrl'
import {isNullCheck} from "../../utils/utils";
import hljs from 'highlight.js'

export default {
  name: "addArticle",
  data() {
    return {
      editor: "",
      copyInput: "",
      articleTypeList:[],//文章技术分类
      rules: {
        article_title: [
          { required: true, message: '文章标题不能为空', trigger: 'blur' }
        ],
        article_type: [
          { required: true, message: '文章分类不能为空', trigger: 'blur' },
        ],
        article_technology_type: [
          { required: true, message: '文章系列分类不能为空', trigger: 'change' }
        ],
      },
      articleInfo:{
        article_id:'',
        article_title:'',
        article_type:undefined,//技术分类
        article_technology_type:undefined,//文章系列分类
        article_json:'',
        article_html:'',
        article_cover:"",//封面
      },//添加参数对象
      pageStatus:true//是否操作成功
    }
  },
  mounted() {
    this.$https.asyncFunQueue.call(this,[this.getArticleTypeList])
    this.editor = new Editor(".editor")
    this.editor.highlight = hljs;
    this.editor.config.height = 600;
    this.editor.config.uploadImgShowBase64 = true;
    this.editor.config.onchange = () =>{
      this.articleInfo.article_json=this.editor.txt.getJSON();
    };
    this.editor.create();
  },
  methods: {
    //-------网络请求---------
    /***
     * 获取所有文章技术分类列表
     */
    getArticleTypeList(){
      return new Promise(resolve => {
        this.$https.post(getArticleTypeList,{}).then((res)=>{
            if(res.code == 200){
              this.articleTypeList=res.data;
              resolve(res);
            }
        })
      })
    },
    /***
     * 添加文章
     */
    instrtArticleTypeList(){
      return new Promise(resolve => {
        this.$https.post(insertArticle,this.articleInfo).then((res)=>{
          if(res.code == 200){
            this.pageStatus=false;
            resolve(res);
          }
        })
      })
    },
    /***
     * 修改文章
     */
    updateArticle(){
      return new Promise(resolve => {
        this.$https.post(updateArticle,this.articleInfo).then((res)=>{
          if(res.code == 200){
            this.pageStatus=false;
            resolve(res);
          }
        })
      })
    },
    /**
     * 查询的文章
     */
    getArticleById(id){
      if(id){
        this.$https.post(getArticleById,{article_id:id}).then(({code,data})=> {
          this.isCloseInit = true;
          if (code == 200) {
            if (isNullCheck(data.article_info)) {
              this.articleInfo = data.article_info;
              this.articleInfo.article_html = this.escapeReplace(unescape(this.articleInfo.article_html));
              this.articleInfo.article_json = JSON.parse(unescape(this.articleInfo.article_json));
              console.log(this.articleInfo.article_json);
              this.editor.txt.setJSON(this.articleInfo.article_json);
            }
          }
        })
      }
    },
    //---------点击按钮-----------
    /**
     * copy代码
     * @param status 1 == html 2 text
     */
    copyText(status) {
      this.copyInput = '';
      let messageText;
      if (status == 1) {
        messageText='HTML'
        this.copyInput = this.editor.txt.html();
      } else if (status == 2) {
        messageText='TEXT'
        this.copyInput = this.editor.txt.text();
      }else {
        this.copyInput = this.editor.txt.getJSON()
      }
      let copyValue = this.$refs.copyInput;
      copyValue.select(); // 选择对象
      document.execCommand("copy"); // 执行浏览器复制命令用户定义的代码区域用户定义的代码区域
      this.$message.success("copy-"+messageText+"成功")
    },
    submitArticleBtn(){
      this.$refs.ruleForm.validate(valid => {
        if (isNullCheck(this.editor.txt.html()) && valid) {
          console.log(`${this.editor.txt.html()}`);
          this.articleInfo.article_html=escape(`${  this.checkCode() }`);
          this.articleInfo.article_json=escape(JSON.stringify(this.editor.txt.getJSON()));
          this.articleInfo.article_cover=this.articleInfo.article_cover.toString();
          if(this.articleInfo.article_id){
            this.updateArticle();
          }else{
            this.instrtArticleTypeList();
          }
        }
      })
    },
    /***
     * 继续添加
     */
    carryAdd(){
      this.pageStatus=true;
      this.$refs.ruleForm.resetFields();
    },
    //--------------逻辑js-----------------
    /***
     * 检测代码高亮补全背景
     */
    checkCode(){
      if (this.editor.txt.html().includes('pre')) {
        document.querySelectorAll("code").forEach(item=>{
          item.className='hljs';
        })
      }
      return this.editor.txt.html();
    },
    /**
     * 转义替换
     * \n 变成 br
     * 空格变成 &nbsp;
     */
    escapeReplace(text){
      // return text.replace(/\n/g,'<br/>&nbsp;').replace(/'<br >'/g,'<br/>');
      return text;
    }
  },
  components:{
    uploads,
    detailsContent
  }
}
</script>

<style lang="less" scoped>
.add-article {
  width: 100%;
  background: #fff;
  word-break: break-all;
  word-wrap: break-word;
}
/deep/p > img{
  width: 100% !important;
}
/deep/p > pre{
  white-space: pre-wrap;
  width: 700px !important;
}
.content-write{
  width: 100%;
  display: flex;
  .content-editor{
    flex: 1;
    max-width: 600px;
    display: inline-block;
    .editor{
      flex: 1;
    }
  }
  .content-render{
    flex: 1;
    max-width: 600px;
    display: inline-block;
    border: 1px solid @theme-boder-color;
    padding: 1rem;
  }
}


.submit-btn{
  display: block;
  margin: 0px auto;
  padding: 10px;
}

@media screen and (max-width: 960px) {
}
</style>
