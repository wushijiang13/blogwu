<template>
  <div>
    <LayoutHeads/>
    <div class="layout-mian">
      <a-back-top/>
      <div class="above">
        <div class="above-main">
          <!--主要的-->
          <router-view name="aboveMain"/>
          <!--次要的-->
          <router-view name="aboveSecondary"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LayoutHeads from "@/components/layout/layout_head";
  export default {
    name: "index",
    data() {
      return {
        swiperOptions: {
          pagination: {
            el: '.swiper-pagination'
          },
          autoplay: true,
        }
      }
    },
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
  .layout-mian {
    width: 980px;
    margin-top: 70px;
  }
  last-child {
    margin-bottom: 0;
  }
</style>
