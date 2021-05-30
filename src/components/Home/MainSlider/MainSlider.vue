<template>
  <div id="main-slider">
    <carousel v-if="!!banners">
      <template v-slot:items>
        <item>
          <template v-slot:content>
            <h1 class="slider-title">
              Hệ thống so sánh giá từ nhiều cửa hàng khác nhau<span
                class="strong"
                >– So sánh ngay</span
              >
            </h1>
            <p class="slider-content">
              So sánh sản phẩm với đánh giá tốt nhất từ các gian hàng.<br />
            </p>
            <router-link
              to="/danh-sach-san-pham"
              custom
              v-slot="{ href, navigate }"
            >
              <a
                :href="href"
                @click="navigate"
                class="btn wd-shop-btn slider-btn"
              >
                Đến gian hàng
                <i class="fa fa-arrow-right" aria-hidden="true"></i>
              </a>
            </router-link>
          </template>
          <template v-slot:image>
            <img src="@/assets/img/slider-img/slider2.png" alt="" />
          </template>
        </item>
        <item v-for="banner in banners" :key="banner.id">
          <template v-slot:content>
            <h1 class="slider-title">
              {{ banner.title }} <span class="strong">– Xem ngay</span>
            </h1>
            <p class="slider-content">
              {{ banner.description }}
            </p>
            <a
              :href="banner.redirectUrl"
              target="_blank"
              class="btn wd-shop-btn slider-btn"
            >
              Đến gian hàng <i class="fa fa-arrow-right" aria-hidden="true"></i>
            </a>
          </template>
          <template v-slot:image>
            <img :src="banner.imageUrl" alt="" />
          </template>
        </item>
      </template>
    </carousel>
  </div>
</template>

<script lang="ts">
import Banner from "@/models/Banner";
import bannerService from "@/service/banner-service";
import { Component, Vue } from "vue-property-decorator";
import Carousel from "../Carousel/MainSliderCarousel.vue";
import Item from "../Carousel/MainSliderItem.vue";

@Component({
  components: { Carousel, Item },
})
export default class extends Vue {
  banners: Banner[] | null = null;
  created() {
    bannerService.getAvailableBanner().then((res) => {
      this.banners = res.data;
    });
  }
}
</script>

<style lang="scss">
#main-slider {
  .wd-shop-btn {
    color: #fff;
  }
  .owl-carousel {
    .owl-item {
      img {
        height: 20rem;
      }
    }
  }
}
</style>
