<template>
  <div class="social-media">
    <a href="#" class="bh"><i class="fab fa-behance"></i></a>
    <a href="#" class="fb"><i class="fab fa-facebook"></i></a>
    <a href="#" class="db"><i class="fab fa-dribbble"></i></a>
    <a href="#" class="gp"><i class="fab fa-google-plus"></i></a>
    <a href="#" class="vn"><i class="fab fa-vine"></i></a>
    <a href="#" class="yt"><i class="fab fa-youtube"></i></a>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.social-media {
  a {
    display: inline-block;
    margin-right: 4px;
    color: #fff !important;
    background: #8a8181;
    height: 25px;
    width: 25px;
    text-align: center;
    line-height: 24px;
    font-size: 14px;
  }
  a.bh {
    background: #1769ff;
  }
  a.fb {
    background: #3b5998;
  }
  a.db {
    background: #00b6e3;
  }
  a.gp {
    background: #dd4b39;
  }
  a.vn {
    background: #00b488;
  }
  a.yt {
    background: #ff0000;
  }
}
@media (min-width: 768px) {
  .wb-social-media {
    text-align: left !important;
    margin-bottom: 2px !important;
    display: block;
    overflow: hidden;
  }
}
@media (max-width: 575px) {
  .wb-social-media {
    margin-bottom: 20px;
  }
}
</style>
