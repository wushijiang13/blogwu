<template>
  <div>
    <LayoutHeads/>
    <div class="layout-main">
      <a-back-top/>
      <div class="above">
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
    methods: {
      clickgiveup() {
        this.$refs.dianzan.style.color = "#67C23A";
      },
    },
   components: {
     LayoutHeads
   },

  }
</script>

<style scoped>
  .layout-main {
    width: 980px;
  }
  last-child {
    margin-bottom: 0;
  }

  @media screen and (max-width: 980px) {
     .layout-main{
       width: 100%;
     }
  }
</style>
