<template>
  <div class="head">
    <div class="navbar">
      <span class="title"><span class="xing">Wu</span>的个人博客</span>
      <div class="navlink">
        <ul>
          <li>
            <el-autocomplete
              popper-class="my-autocomplete"
              placeholder="请输入搜索内容"
              size="small"
              >
              <i
                class="el-icon-search el-input__icon"
                slot="suffix"
               >
              </i>
              <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
                <span class="addr">{{ item.address }}</span>
              </template>
            </el-autocomplete>
          </li>
          <li>文章 </li>
          <li>
            <el-dropdown trigger="hover" >
               <span class="el-dropdown-link" style="color: #000;">
                分类 <i class="el-icon-caret-bottom icon-color"></i>
               </span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item >JavaScript</el-dropdown-item>
                <el-dropdown-item >Css</el-dropdown-item>
                <el-dropdown-item >Html</el-dropdown-item>
                <el-dropdown-item >Vue</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li>关于我 <i class="el-icon-s-promotion icon-color"></i></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Head"
  }
</script>

<style scoped>
  .head {
    width: 100%;
    border-bottom: 1px solid #DCDFE6;
    background-color: #fff;
    position: sticky;
    top: 0rem;
    z-index: 10;
  }

  .navbar {
    min-width: 980px;
    margin: 0px auto;
    height: 100%;
    padding: 0.5rem 2rem;
  }

  .xing, .title {
    display: inline-block;
    cursor: pointer;
  }

  .xing {
    width: 40px;
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

  .navlink {
    display: inline-block;
    box-sizing: border-box;
    position: absolute;
    right: 2rem;
    text-align: center;
  }
  .navlink ul{
    font-size: 0;
    vertical-align: top;
  }
  .navlink li {
    display: inline-block;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    padding: 0rem 0.8rem;
  }
  .icon-color{
    color: #909399;
  }

</style>
