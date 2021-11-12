<template>
  <div class="layout-head">
    <div class="head">
      <div class="nav-bar">
        <div  class="layout-mobile">
          <a-button @click="showDrawer" shape="circle" ghost>
            <wu-icon type="icon-gengduo"  :size="20" />
          </a-button>
        </div>
        <span class="title" @click="clickHome">
          <span class="xing">Wu</span>
          <span class="pc-blog">的个人博客</span>
          <span class="mobile-blog">
            Blog
          </span>
        </span>
        <div class="nav-box">
          <div class="nav-search">
            <div class="layout-pc">
              <ul class="nav-pc-search">
                <li>
                  <a-input
                          class="nav-search-input"
                          placeholder="搜索一下吧~"
                          :loading="searchLoading"
                          v-model="searchValue"
                          @pressEnter="onSearch"
                          @change="searchChange">
                    <a-icon slot="prefix" type="search" />
                  </a-input>
                </li>
              </ul>
            </div>
            <div  class="layout-mobile">
              <a-button @click="()=>{this.isMobileSearch=!this.isMobileSearch}" shape="circle" ghost>
                <wu-icon :type="isMobileSearch ? 'icon-guanbi' : 'icon-sousuo'"  :size="20" />
              </a-button>
            </div>
          </div>
          <div class="nav-function">
            <!-- pc  -->
            <div class="layout-pc">
              <a-button shape="circle" @click="themeChange">
                <wu-icon :type="theme ? 'icon-046-sun' : 'icon-moon1'"  />
              </a-button>
              <ul class="nav-list">
                <li
                  class="mouseIcon"
                  v-for="item in navList"
                  :key="item.label"
                  @click="clickNavIcon(item.type)">
                  <div v-if="item.type != 7" >
                    {{item.label}}
                    <wu-icon v-if="item.icon" :type="item.icon" :size="14"  />
                  </div>
                  <div v-else>
                    <wu-icon type="icon-github" :size="26" />
                  </div>
                </li>
              </ul>
            </div>
            <!-- mobile  -->
            <div  class="layout-mobile">
              <a-drawer
                title="看看想去哪里吧"
                placement="left"
                :closable="false"
                :visible="isDrawer"
                @close="hiddenDrawer"
                :zIndex="10001"
              >
                <a-menu>
                  <a-menu-item>
                    主题切换：
                    <a-button  type="text" shape="circle" @click="themeChange">
                      <wu-icon :type="theme ? 'icon-046-sun' : 'icon-moon1'"  />
                    </a-button>
                  </a-menu-item>
                  <a-menu-item v-for="item in navList" :key="item.label" @click="clickNavIcon(item.type)">
                    <span>{{item.label}}</span>
                    <div v-if="item.type != 7" >
                      {{item.label}}
                      <wu-icon v-if="item.icon" :type="item.icon" :size="14"  />
                    </div>
                  </a-menu-item>
                </a-menu>
              </a-drawer>
            </div>
          </div>
        </div>
      </div>
      <transition name="unfold">
        <div class="nav-search-mobile" v-show="isMobileSearch">
        <a-input
                placeholder="搜索一下吧~"
                :loading="searchLoading"
                v-model="searchValue"
                @pressEnter="onSearch"
                @change="searchChange">
          <a-icon slot="prefix" type="search" />
        </a-input>
      </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import {getArticleList} from '../../config/request/requestUrl'
  import {debounce} from "../../utils/utils";
  export default {
    name: "Head",
    data() {
      return {
        searchValue: '',
        searchLoading: false,//搜索loading
        navList: [
          {type:0,label:'博客'},
          // {type:1,label:'写文章'},
          {type:2,label:'文档'},
          {type:4,label:'关于我',icon:"icon-erweima"},
          {type:5,label:'脚手架'},
          {type:6,label:'聊天室'},
          {type:7,label:'GitHub'},
          {type:8,label:'',icon:'https://img.shields.io/github/stars/wushijiang13/blogwu?style=social'},
        ],
        theme:false,
        isDrawer:false,
        isMobileSearch:false,//移动端搜索
      }
    },
    methods: {
      goaboutMy() {
        this.$router.push('/aboutMy');
      },
      /**
       * 跳转到写文章
       */
      goAddArticle() {
        debounce.call(this, () => {
          this.$router.push('/addArticle');
        }, '人就要被点傻了(＠_＠;)');
      },
      /**
       * 跳转到文档
       */
      goDocumentation(){
        debounce.call(this, () => {
          this.$router.push('/documentation');
        }, '看文档不要急哦~');
      },
      goHome() {
        this.searchValue="";
        this.$store.dispatch("setArticleSearch","");
        this.getData();
      },
      gogitHub() {
        window.open("https://github.com/wushijiang13")
      },

      /**
       * 点击nav icon
       */
      clickNavIcon(type){
        switch (type) {
          case 0:{
            this.goHome();
            break;
          }
          case 1:{
            this.goAddArticle();
            break;
          }
          case 2:{
            this.goDocumentation();
            break;
          }
          case 3:{  break;}
          case 4:{
            this.goaboutMy();
            break;
          }
          case 5:{
            window.open("https://wushijiang.cn/vue3-vite-cli/")
            break;
          }
          case 6:{
            window.open("https://github.com/wushijiang13/livechats")
            break;
          }
          case 7:{
            this.gogitHub();
            break;
          }
          case 8:{
            window.open("https://github.com/wushijiang13/blogwu")
            break;
          }
        }
        this.isDrawer=false;
      },
      clickHome() {
        debounce.call(this, this.goHome, '人就要被点傻了(＠_＠;)');
      },


      searchChange(){
        this.$store.dispatch("setArticleSearch",this.searchValue);
      },
      /**
       * 主题改变
       */
      themeSwitch(){
        if (this.theme) {
          document.body.className="dark";
        }else{
          document.body.className="white";
        }
        let generateConfig={theme:this.theme};
        localStorage.setItem("config",JSON.stringify(generateConfig))
      },
      /**
       * 主题按钮值修改
       */
      themeChange(){
        this.theme = !this.theme;
      },
      onSearch() {
        this.isMobileSearch=false;
        debounce.call(this,()=>{
          this.searchLoading = true;
          this.getData();
        },'请勿重复查询！')
      },
      getData(){
        this.$router.push('/');
        this.$https.post(getArticleList, {page: 1, limit: 7, search: this.$store.state.articleSearch}).then(async ({code, data}) => {
          if (code == 200) {
            await this.$store.dispatch("clearArticlePage");
            await this.$store.dispatch("setAddArticleList", data);
            this.searchLoading = false;
          }
        })
      },
      showDrawer() {
        this.isDrawer = true;
      },
      hiddenDrawer() {
        this.isDrawer = false;
      },

      /**
       * 初始化
       * 暂时只初始化主题
       */
      init(){
        let config= localStorage.getItem("config");
        if (config) {
          this.theme=JSON.parse(config).theme;
          return
        }
        let generateConfig={theme:this.theme};
        localStorage.setItem("config",JSON.stringify(generateConfig))
        this.themeSwitch();
      }
    },
    mounted() {
      this.init();
    },
    watch:{
      'theme'(){
        this.themeSwitch()
      }
    }
  }
</script>

<style scoped lang="less">
  .layout-head {
    width: 100%;
    background-color: @theme-color;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 998;
  }
  ul{
    padding: 0px;
  }
  .head{
    height: 60px;
    margin-bottom: 0.8rem;
  }
  .nav-bar {
    margin: 0px auto;
    height: 100%;
    padding: 0.5rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .layout-pc{
    display: inline-block;
  }
  .layout-mobile{
    display: none;
  }

  .xing, .title {
    display: inline-block;
    cursor: pointer;
  }

  .xing {
    width: 2.2rem;
    transition: 1s;
    font-size: 22px;
  }

  .xing:hover {
    width: 60px;
  }

  .title {
    color: @theme-font-1-color;
    font-size: 22px;
  }

  .nav-box{
    display: inline-block;
    box-sizing: border-box;
    float: right;
    text-align: center;
  }

  .nav-box li{
    display: inline-block;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    padding: 0rem 0.8rem;
  }
  .nav-search-mobile{
    background-color: @theme-color;
    width: 100%;
    height: 46px;
    overflow: hidden;
    display: none;
    padding: 0rem 0.8rem;
  }
  .nav-function{
    margin: 0px 0.2rem;
    display: inline-block;
  }
  .nav-search,.nav-pc-search,.nav-list{
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0;
    position: relative;
  }
  .nav-list{
    color:@theme-font-1-color;
  }
  .nav-search-input{
    width: 150px;
    vertical-align: middle;
  }
  .nav-search-input  /deep/.ant-input  {
    width: 150px;
  }
  /deep/.ant-input-affix-wrapper:hover .ant-input:not(.ant-input-disabled){
    border-color:#d9d9d9;
  }
  /deep/.ant-input{
    border-radius: 30px;
    outline: none;
    border-color:#d9d9d9;
  }
  /deep/.ant-input:focus{
    border-color:#d9d9d9;
    box-shadow:none;
  }
  .mouseIcon {
    cursor: pointer;
  }
  .mobile-blog{
    display: none;
  }

  .dropdown-box{
    display: inline-block;
    margin:0px 0.2rem;
  }
  .unfold-enter-active,.unfold-enter{
    height: 0px;
    transition: .2s ease-in-out;
  }
  .unfold-enter-to{
    height: 46px;
  }
  .unfold-leave-active{
    height: 46px;
    transition: .2s ease-in-out;
  }
  .unfold-leave-to{
    height: 0px;
  }

  @media screen and (max-width: 960px) {
    .nav-search-mobile{
      display: block;
    }
    .head{
      margin-bottom: 0.8rem;
    }
    .nav-bar {
      padding: 0.5rem 1rem;
    }
    .nav-search-input  /deep/.ant-input  {
      width: 120px;
    }
    .nav-box li{
      padding: 0;
    }
    .nav-list{
      display: none;
    }
    .pc-blog{
      display: none;
    }
    .mobile-blog{
      display: inline-block;
    }
    .xing:hover {
      width: auto;
    }
    .layout-pc{
      display: none;
      vertical-align: middle;
    }
    .layout-mobile{
      display: inline-block;
    }
  }
  @media screen and (max-width: 350px) {
    .nav-search-mobile{
      display: block;
    }
    .nav-search-input{
      width: 80px;
    }
  }
</style>
