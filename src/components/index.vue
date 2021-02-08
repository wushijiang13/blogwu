<template>
  <div class="index">
    <a-back-top/>
    <div class="above">
      <!--主要的-->
      <div class="above-main">
        <router-view name="aboveMain"/>
      </div>
    </div>
    <!--次要的-->
    <div class="above-secondary">
      <router-view name="aboveSecondary"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination'
        },
        autoplay: true,
      },
    }
  },

  methods: {

  },
}
</script>

<style scoped>
.index {
  margin: 1rem auto;
  display: flex;
  justify-content: center;
  align-content: center;
}

last-child {
  margin-bottom: 0;
}

.above-main {
  width: 44rem;
  background-color: #fff;
  display: inline-block;
}

.above-secondary {
  width: 16rem;
  height: 200px;
  display: inline-block;
  vertical-align: top;
  float: right;
  position: sticky;
  top: 4rem;
  margin-left: 2rem;
}

@media screen and (max-width: 980px) {
  .above-secondary {
    display: none;
  }
}
</style>
