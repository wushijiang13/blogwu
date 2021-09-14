<template>
  <div class="layout-head">
    <div class="head-placeholder"/>
    <div class="head">
      <div class="navbar">
        <span class="title" @click="clickHome()">
          <span class="xing">Wu</span>
          <span class="pc-blog">的个人博客</span>
          <span class="mobile-blog">blog</span>
        </span>
        <div class="navlink">
          <ul class="nav-search">
            <li>
              <a-input-search placeholder="搜索一下吧~" :loading="searchLoading" class="nav-search-input"  v-model="searchValue"
                              @search="onSearch" @change="searchChange"/>
            </li>
          </ul>
         <ul class="nav-list">
             <li v-for="item in navList" :key="item.label"  class="mouseIcon" @click="clickNavIcon(item.type)">
               <div v-if="item.type != 5" >
                 {{item.label}}
                 <a-icon v-if="item.icon" :type="item.icon"/>
               </div>
              <div v-else>
                <a-icon type="github" class="iconBig"/>
              </div>
             </li>
          </ul>
          <a-dropdown class="dropdown-box" :trigger="['click']">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              导航 <a-icon type="down" />
            </a>
            <a-menu  slot="overlay">
              <a-menu-item v-for="item in navList" :key="item.label">
                <span @click="clickNavIcon(item.type)">{{item.label}}</span>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
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
          {type:1,label:'写文章'},
          {type:2,label:'文章'},
          {type:3,label:'分类'},
          {type:4,label:'关于我',icon:"qrcode"},
          {type:5,label:'GitHub'},
        ],
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
       * 点击nav icon
       */
      clickNavIcon(type){
        switch (type) {
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
      },
      clickHome() {
        debounce.call(this, this.goHome, '再点人都被点傻了😡');
      },
      goHome() {
        this.$store.dispatch("setArticleSearch","");
        this.getData();
      },

      searchChange(){
        this.$store.dispatch("setArticleSearch",this.searchValue);
      },
      onSearch() {
        debounce.call(this,()=>{
          this.searchLoading = true;
          this.getData();
        },'请勿重复查询！')
      },
      getData(){
        this.$router.push('/');
        this.$https.post(getArticleList, {page: 1, limit: 6, search: this.$store.state.articleSearch}).then(async ({code, data}) => {
          if (code == 200) {
            await this.$store.dispatch("clearArticlePage");
            await this.$store.dispatch("setAddArticleList", data);
            this.searchLoading = false;
          }
        })
      },
      gogitHub() {
        window.open("https://github.com/wushijiang13")
      },
    }
  }
</script>

<style scoped>
  .head-placeholder{
    height: 50px;
    margin-bottom: 0.8rem;
  }
  .head {
    width: 100%;
    border-bottom: 1px solid #DCDFE6;
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }

  .navbar {
    margin: 0px auto;
    height: 100%;
    padding: 0.5rem 2rem;
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
    color: #303133;
    font-size: 22px;
  }

  .navlink{
    display: inline-block;
    box-sizing: border-box;
    float: right;
    text-align: center;
  }


  .navlink li{
    display: inline-block;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    padding: 0rem 0.8rem;
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
    display: none;
  }

  @media screen and (max-width: 960px) {
    .navbar {
      padding: 0.5rem 1rem;
    }
    .nav-search-input{
      width: 130px;
    }
    .navlink li{
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
    .dropdown-box{
      display: inline-block;
      margin-left: 0.4rem;
    }
  }
</style>
