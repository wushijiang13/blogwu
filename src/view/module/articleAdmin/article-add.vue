<template>
  <div class="article-add">
    <div class="article-add-mian">
      <div class="mian-add-div" v-show="pageStatus">
        <div class="content-write">
          <div class="content-operating">
            <button class="btn" @click="editFormShow" type="primary">{{isFormText}}</button>
          </div>
          <div class="content-editor">
            <wuEditor ref="wuEditor" :defaultJson="articleInfo.article_json" @change="editorChange" class="editor"/>
          </div>
          <div v-show="isFormShow" class="content-form">
            <a-form-model  :rules="rules" :model="articleInfo" ref="ruleForm" >
              <a-form-model-item   prop="article_id">
                <a-input placeholder="请输入文章id"  v-model="articleInfo.article_id" @keydown.enter="getArticleById(articleInfo.article_id)"/>
              </a-form-model-item>
              <a-form-model-item   ref="article_title" prop="article_title">
                <a-input placeholder="请输入文章标题"  v-model="articleInfo.article_title"/>
              </a-form-model-item>
              <a-form-model-item >
                <uploads v-model="articleInfo.article_cover"/>
              </a-form-model-item>
              <a-form-model-item   prop="article_desc">
                <a-input placeholder="请输入文章简介" :max-length="150"  v-model="articleInfo.article_desc"/>
              </a-form-model-item>
              <a-form-model-item prop="article_type">
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
              <a-form-model-item prop="article_technology_type">
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
              <a-form-model-item   ref="article_pass" prop="article_pass">
                <a-input placeholder="请输入密码"  v-model="articleInfo.article_pass"/>
              </a-form-model-item>
            </a-form-model>
          </div>
        </div>
        <button v-show="isFormShow" class="btn submit-btn" @click="submitArticleBtn" type="primary">提交文章</button>
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
import {wuEditor,uploads} from './components';
import {getArticleTypeList,insertArticle,getArticleById,updateArticle} from '@config/request/requestUrl'
import {isNullCheck} from "@utils/utils";

export default {
  name: "addArticle",
  data() {
    return {
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
        article_pass: [
          { required: true, message: '密码不能为空', trigger: 'change' }
        ],
      },
      articleInfo:{
        article_id:'',
        article_title:'',
        article_type:undefined,//技术分类
        article_technology_type:undefined,//文章系列分类
        article_json:{},
        article_html:'',
        article_cover:"",//封面
        article_desc:"",//简介
        article_pass:"",//密码
      },//添加参数对象
      pageStatus:true,//是否操作成功
      isFormShow:false,
      isFormText:"展示表单",
      endImageList:[],//最后的图片list
    }
  },
  mounted() {
    this.$https.asyncFunQueue.call(this,[this.getArticleTypeList])
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
    instrtArticle(){
      return new Promise(resolve => {
        this.$https.post(insertArticle,this.articleInfo).then((res)=>{
          if(res.code == 200){
            this.pageStatus=false;
            resolve(res);
          }else{
            this.$message.error("添加失败");
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
          }else{
            this.$message.error("修改失败");
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
          this.$refs.wuEditor.isInit=false;
          if (code == 200) {
            if (isNullCheck(data.article_info)) {
              this.articleInfo = data.article_info;
              this.articleInfo.article_html = unescape(this.articleInfo.article_html);
              this.articleInfo.article_json = JSON.parse(unescape(this.articleInfo.article_json));
            }
          }
        })
      }
    },
    //---------点击按钮-----------
    /**
     * 提交submit
     */
    submitArticleBtn(){
      this.$refs.ruleForm.validate(valid => {
        if (isNullCheck(this.articleInfo.article_json) && valid) {
          this.articleInfo.article_html=escape(this.articleInfo.article_html);
          this.articleInfo.article_json=escape(JSON.stringify(this.articleInfo.article_json));
          this.articleInfo.article_cover=this.articleInfo.article_cover.toString();
          //确认差异的图片并删除服务器图片
          this.$refs.wuEditor.deleDiffImageList();
          if(this.articleInfo.article_id){
            this.updateArticle();
          }else{
            this.instrtArticle();
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
    editorChange(json,html){
      this.articleInfo.article_json=json;
      this.articleInfo.article_html=html;
    },
    /**
     * 隐藏表单
     */
    editFormShow(){
      this.isFormShow=!this.isFormShow;
      this.isFormText= this.isFormShow ? '隐藏表单' : '展示表单';
    }
  },
  components:{
    uploads,
    wuEditor
  }
}
</script>

<style lang="less" scoped>
.article-add {
  width: 100%;
  word-break: break-all;
  white-space: pre-wrap;
}
/deep/p > img{
  width: 100% !important;
}
/deep/p > pre{
  width: 700px !important;
}
/deep/.w-e-text code{
  background-color: #333;
}
.content-write{
  width: 100%;
  .content-editor{
    width: 100%;
    display: flex;
    justify-content: center;
    .editor{
      width: 50%;
      flex: 1;
      display: inline-block;
    }
    .content-render{
      width: 50%;
      height: 100vh;
      display: inline-block;
      border: 1px solid @theme-boder-color;
      padding: 1rem;
    }
  }
  .content-form{
    display: block;
  }
}

.btn{
  padding: 4px 20px;
  background-color: #fff;
  border: @primary-color solid 1px;
  color: @primary-color;
  border-radius: @theme-boder-radius-width;
  cursor: pointer;
}

.submit-btn{
  display: block;
  margin: 0px auto;
  margin-top: 20px;
}
/deep/.ant-input , /deep/.ant-select-selection{
  border:none;
  border-radius: inherit;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #d9d9d9;
}
/deep/.ant-input:hover{
  border-bottom: 1px solid #d9d9d9;
}
/deep/.ant-input:focus{
  box-shadow:none;
  border-bottom: 1px solid #d9d9d9;
}
.has-error .ant-input:focus{
  box-shadow:none;
  border-bottom: 1px solid #d9d9d9;
}
.ant-form-item{
  margin-bottom: 10px;
}
.content-operating{
  padding: 10px 20px;
  background: #fff;
}
@media screen and (max-width: 960px) {

}
</style>
