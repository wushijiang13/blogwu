<template>
  <div class="layout-head">
    <div class="head-placeholder"/>
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
            blog
          </span>
        </span>
        <div class="nav-box">
          <ul class="nav-search">
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
                  <div v-if="item.type != 5" >
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
                  </a-menu-item>
                </a-menu>
              </a-drawer>
            </div>
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
          {type:0,label:'博客'},
          {type:1,label:'写文章'},
          {type:2,label:'文档'},
          {type:4,label:'关于我',icon:"icon-erweima"},
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
        console.log(this.theme);
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
  .head-placeholder{
    height: 60px;
    margin-bottom: 0.8rem;
  }
  .head {
    width: 100%;
    background-color: @theme-color;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    height: 60px;
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

  .nav-function{
    margin: 0px 0.2rem;
    display: inline-block;
  }
  .nav-search,.nav-list{
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
    vertical-align: middle;
  }
  .nav-search-input  /deep/.ant-input  {
    width: 0px;
  }
  .nav-search-input  /deep/.ant-input:focus{
    width: 150px;
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
    .nav-search-input  /deep/.ant-input  {
      width: 0px;
    }
    .nav-search-input  /deep/.ant-input:focus{
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
    .nav-search-input{
      width: 80px;
    }
  }
</style>
