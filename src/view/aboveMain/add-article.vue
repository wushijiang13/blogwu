<template>
  <div class="add-article">
    <div class="add-article-mian">
      <div class="add-mian-div" v-show="addStatus == 'authentic'">
        <p class="head-title-p">添加文章</p>
        <a-form-model  :rules="rules" :model="addArticleInfo" ref="ruleForm" :label-col="{ span: 4 }" :wrapper-col="{ span: 12 }">
          <a-form-model-item  label="文章标题" ref="article_title" prop="article_title">
            <a-input placeholder="请输入文章标题"  v-model="addArticleInfo.article_title"/>
          </a-form-model-item>
          <a-form-model-item label="文章封面">
            <uploads v-model="addArticleInfo.article_cover"/>
          </a-form-model-item>
          <a-form-model-item label="文章分类" ref="article_type" prop="article_type">
            <a-select
              placeholder="请选择文章分类"
              show-search
              :allowClear="true"
              v-model="addArticleInfo.article_type"
              option-filter-prop="children"
              @change="selectArticleTypeChange"
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
          <a-form-model-item label="文章系列分类" ref="article_technology_type" prop="article_technology_type">
            <a-select
              placeholder="请选择文章系列分类"
              show-search
              :allowClear="true"
              option-filter-prop="children"
              v-model="addArticleInfo.article_technology_type"
              @change="selectArticleTypeChange"
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
          <div  ref="editor" class="editor"></div>
          <input type="text" style="opacity: 0;position: absolute;" v-model="copyInput" ref="copyInput">
          <a-button type="primary" class="copyHtml" style="float: right; margin-top: 20px" @click="copyText(1)">
            copy-TEXT代码
          </a-button>
          <a-button type="primary" class="copyHtml" style="float: right;margin-right: 10px; margin-top: 20px"
                    @click="copyText(2)">copy-HTML代码
          </a-button>
          <a-button class="submit-btn" @click="addArticleBtn" type="primary">提交文章</a-button>
          <p style="padding-bottom: 40px"></p>
        </a-form-model>
      </div>
      <div class="add-result" v-show="addStatus == 'success'">
        <a-result
          status="success"
          :title="'添加《'+addArticleInfo.article_title+'》成功!'"
        >
          <template #extra>
            <a-button key="console" @click="carryAdd" type="primary">
              继续添加
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
import Editor from "wangeditor"
import uploads from "../../components/utlis/uploads";
import {getArticleTypeList,insertArticle} from '../../config/request/requestUrl'
import {isNullCheck} from "../../utils/utils";
import 'highlight.js/styles/agate.css'
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
      addArticleInfo:{
        article_title:'',
        article_type:undefined,//技术分类
        article_technology_type:undefined,//文章系列分类
        article_text:'',
        article_html:'',
        article_cover:"",//封面
      },//添加参数对象
      addStatus:'authentic'//添加状态
    }
  },
  created() {
    this.$https.asyncFunQueue.call(this,[this.getArticleTypeList])
  },
  mounted() {
    this.editor = new Editor(".editor")
    this.editor.highlight = hljs;
    this.editor.config.uploadImgShowBase64 = true
    this.editor.create();
    console.log(this.editor.config);
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
        this.$https.post(insertArticle,this.addArticleInfo).then((res)=>{
          if(res.code == 200){
            this.addStatus='success';
            resolve(res);
          }
        })
      })
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
      }
      let copyValue = this.$refs.copyInput;
      copyValue.select(); // 选择对象
      document.execCommand("copy"); // 执行浏览器复制命令用户定义的代码区域用户定义的代码区域
      this.$message.success("copy-"+messageText+"成功")
    },
    addArticleBtn(){
      this.$refs.ruleForm.validate(valid => {
        if (isNullCheck(this.editor.txt.html()) && valid) {
          this.addArticleInfo.article_html=escape(`${ this.checkCode() }`);
          this.addArticleInfo.article_text=escape(`${this.editor.txt.text()}`);
          this.addArticleInfo.article_cover=this.addArticleInfo.article_cover.toString();
          this.instrtArticleTypeList()
        }
      })
    },
    /***
     * 继续添加
     */
    carryAdd(){
      this.addStatus="authentic";
      this.addArticleInfo={
        article_title:'',
        article_type:undefined,//技术分类
        article_technology_type:undefined,//文章系列分类
        article_text:'',
        article_html:'',
      }
    },
    //--------------逻辑js-----------------
    /**
     * 选择文章类型
     */
    selectArticleTypeChange(){

    },
    /***
     * 检测代码高亮补全背景
     */
    checkCode(){
      if (this.editor.txt.html().includes('pre') == false) {
        return
      }
      document.querySelectorAll("code").forEach(item=>{
        item.className+='hljs';
      })
      return this.editor.txt.html();
    }

  },
  components:{
    uploads,
  }
}
</script>

<style scoped>
.add-article {
  width: 960px;
  background: #fff;
  margin: 0px auto;
  margin-top: 1rem;
}
input, .ant-select {
  width: 20rem;
}
.editor{
  margin-top: 1rem;
  margin: 0px auto;
  z-index: 0
}
.submit-btn{
  display: block;
  margin: 0px auto;
  margin-top: 80px;
}
.add-article-mian{
  width: 90%;
  margin: 0px auto;
}

@media screen and (max-width: 960px) {
  .add-article {
    width: 95%;
  }
}
</style>
