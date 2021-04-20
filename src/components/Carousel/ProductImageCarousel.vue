<template>
  <div id="product-view-model" class="product-view owl-carousel owl-theme">
    <div class="item" v-for="(img, idx) in images" :key="idx">
      <img :src="img" class="img-fluid" alt="Product Img" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ required: true })
  images!: string[];

  mounted(): void {
    ($("#product-view-model") as any).owlCarousel({
      loop: true,
      nav: true,
      items: 1,
    });
  }
}
</script>

<style lang="scss">
.product-view {
  .owl-nav [class*="owl-"] {
    color: #fff;
    font-size: 35px;
    margin: 5px;
    padding: 0px 14px;
    background: none;
    display: inline-block;
    cursor: pointer;
    border-radius: 0;
  }
  .owl-nav [class*="owl-"]:hover {
    background: none;
  }

  .owl-nav {
    margin-top: -25px;
    position: absolute;
    top: 50%;
    width: 100%;
    font-size: 42px;

    .owl-next {
      position: absolute !important;
      right: 10px !important;
    }
    .owl-prev {
      position: absolute !important;
      left: 10px !important;
    }
  }
}
</style>
