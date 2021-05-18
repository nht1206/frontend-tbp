<template>
  <div id="main-slider">
    <carousel>
      <template v-slot:items>
        <item>
          <template v-slot:content>
            <h1 class="slider-title">
              Banner giới thiệu <span class="strong">– So sánh ngay</span>
            </h1>
            <p class="slider-content">
              So sánh sản phẩm với đánh giá tốt nhất từ các gian hàng.<br />
              Nội dung giới thiệu
            </p>
            <a href="shop-left-sidebar.html" class="btn wd-shop-btn slider-btn">
              Đến gian hàng <i class="fa fa-arrow-right" aria-hidden="true"></i>
            </a>
          </template>
          <template v-slot:image>
            <img src="@/assets/img/slider-img/slider2.png" alt="" />
          </template>
        </item>
        <item>
          <template v-slot:content>
            <h1 class="slider-title">
              Banner giới thiệu <span class="strong">– So sánh ngay</span>
            </h1>
            <p class="slider-content">
              So sánh sản phẩm với đánh giá tốt nhất từ các gian hàng.<br />
              Nội dung giới thiệu
            </p>
            <a href="shop-left-sidebar.html" class="btn wd-shop-btn slider-btn">
              Đến gian hàng <i class="fa fa-arrow-right" aria-hidden="true"></i>
            </a>
          </template>
          <template v-slot:image>
            <img src="@/assets/img/slider-img/slider2.png" alt="" />
          </template>
        </item>
      </template>
    </carousel>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Carousel from "../Carousel/MainSliderCarousel.vue";
import Item from "../Carousel/MainSliderItem.vue";

@Component({
  components: { Carousel, Item },
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.wd-shop-btn {
  color: #fff;
}
</style>
