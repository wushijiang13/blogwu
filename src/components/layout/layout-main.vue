<template>
  <div class="layout">
    <LayoutHeads/>
    <div class="layout-main" ref="layoutMain">
      <a-back-top/>
      <div class="above">
        <router-view  name="freeMain"/>
        <div class="above-main">
          <!--主要的-->
          <router-view  name="aboveMain"/>
          <!--次要的-->
          <router-view  name="aboveSecondary"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LayoutHeads from "@/components/layout/layout-head";
  export default {
    name: "index",
    components: {
       LayoutHeads
    }
  }
</script>

<style scoped>
  .layout{
    position: relative;
  }
  .layout-main{
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
  }
  .above{
    width: 100%;
  }
  .above-main {
    width: 980px;
    margin: 0px auto;
  }

  @media screen and (max-width: 980px) {
     .above-main{
       width: 100%;
     }
  }
</style>
