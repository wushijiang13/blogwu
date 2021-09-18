<template>
  <div class="layout-head">
    <div class="head-placeholder"/>
    <div class="head">
      <div class="nav-bar">
        <span class="title" @click="clickHome">
          <span class="xing">Wu</span>
          <span class="pc-blog">的个人博客</span>
          <span class="mobile-blog">blog</span>
        </span>
        <div class="nav-box">
          <ul class="nav-search">
            <li>
              <a-input-search
                class="nav-search-input"
                placeholder="搜索一下吧~"
                :loading="searchLoading"
                v-model="searchValue"
                @search="onSearch"
                @change="searchChange"/>
            </li>
          </ul>
          <div class="nav-function">
            <!-- pc -->
           <!-- <ul class="nav-list">
              <li
                class="mouseIcon"
                v-for="item in navList"
                :key="item.label"
                @click="clickNavIcon(item.type)">
                <div v-if="item.type != 5" >
                  {{item.label}}
                  <a-icon v-if="item.icon" :type="item.icon"/>
                </div>
                <div v-else>
                  <a-icon type="github" class="iconBig"/>
                </div>
              </li>
            </ul>-->
            <!-- pc  -->
            <div class="layout-pc">
              <a-switch  class="nav-switch" v-model="theme" @change="themeChange"/>
              <a-dropdown class="dropdown-box" :trigger="['click']">
                <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                  功能 <a-icon type="down" />
                </a>
                <a-menu  slot="overlay">
                  <a-menu-item v-for="item in navList" :key="item.label">
                    <span @click="clickNavIcon(item.type)">{{item.label}}</span>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </div>
            <!-- mobile  -->
            <div  class="layout-mobile">
              <a-button type="primary"  icon="menu" ghost  @click="showDrawer"/>
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
                    主题切换： <a-switch  class="nav-switch" v-model="theme" />
                  </a-menu-item>
                  <a-menu-item v-for="item in navList" :key="item.label" @click="clickNavIcon(item.type)">
                    <span>{{item.label}}</span>
                  </a-menu-item>
                </a-menu>
              </a-drawer>
            </div>
          </div>
          <div class="nav-user">
            <a-button type="primary" ghost>
              登录
            </a-button>
          </div>
        </div>
      </div>
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
          {type:0,label:'首页'},
          {type:1,label:'写文章'},
          {type:2,label:'文章'},
          {type:3,label:'分类'},
          {type:4,label:'关于我',icon:"qrcode"},
          {type:5,label:'GitHub'},
        ],
        theme:false,
        isDrawer:false
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
            break;
          }
          case 3:{  break;}
          case 4:{
            this.goaboutMy();
            break;
          }
          case 5:{
            this.gogitHub();
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
      themeChange(){
        this.theme ? document.body.className="dark"  : document.body.className="white";
        let generateConfig={theme:this.theme};
        localStorage.setItem("config",JSON.stringify(generateConfig))
      },

      onSearch() {
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
      }
    },
    mounted() {
      this.init();
    },
    watch:{
      'theme'(){
        this.themeChange()
      }
    }
  }
</script>

<style scoped lang="less">
  .head-placeholder{
    height: 50px;
    margin-bottom: 0.8rem;
  }
  .head {
    width: 100%;
    border-bottom: 1px solid @theme-boder-color;
    background-color: @theme-color;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }

  .nav-bar {
    margin: 0px auto;
    height: 100%;
    padding: 0.5rem 2rem;
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
    width: 2rem;
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

  .nav-function,.nav-user{
    margin: 0px 0.2rem;
    display: inline-block;
  }

  .nav-user{
    margin-left: 5px;
  }
  .nav-switch{
    margin:0px 0.2rem;
    background-color: @theme-switch-bg-color;
  }
  .nav-search,.nav-list{
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0;
    position: relative;
  }

  .nav-search-input{
    width: 200px
  }

  .iconBig {
    font-size: 1.4rem;
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


  @media screen and (max-width: 960px) {
    .nav-bar {
      padding: 0.5rem 1rem;
    }
    .nav-search-input{
      width: 130px;
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
    }
    .layout-mobile{
      display: inline-block;
    }
  }
  @media screen and (max-width: 350px) {
    .nav-search-input{
      width: 80px;
    }
  }
</style>
