<template>
  <div>
    <MainSlider></MainSlider>
    <Service></Service>
    <TopDealSlider
      title="Laptop"
      :slideNumber="1"
      :products="laptopHotDeal"
      :isLoading="isLaptopLoading"
    ></TopDealSlider>
    <TopDealSlider
      title="Smart phone"
      :slideNumber="2"
      :products="smartPhoneHotDeal"
      :isLoading="isSmartPhoneLoading"
    ></TopDealSlider>
    <trending-slider></trending-slider>
  </div>
</template>

<script lang="ts">
import MainSlider from "@/components/Home/MainSlider/MainSlider.vue";
import Service from "@/components/Home/Service/Service.vue";
import TopDealSlider from "@/components/Home/TopDeal/TopDealSlider.vue";
import TrendingSlider from "@/components/Home/Trending/TrendingSlider.vue";
import Product from "@/models/Product";
import productService from "@/service/product-service";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    MainSlider,
    Service,
    TopDealSlider,
    TrendingSlider,
  },
})
export default class Home extends Vue {
  laptopHotDeal: Product[] | null = null;
  smartPhoneHotDeal: Product[] | null = null;
  isLaptopLoading = false;
  isSmartPhoneLoading = false;

  created() {
    this.isLaptopLoading = true;
    this.isSmartPhoneLoading = true;
    productService
      .getLaptopHotDeal()
      .then((res) => {
        this.laptopHotDeal = res.data;
        this.isLaptopLoading = false;
      })
      .catch(() => {
        this.isLaptopLoading = false;
      });
    productService
      .getSmartPhoneHotDeal()
      .then((res) => {
        this.smartPhoneHotDeal = res.data;
        this.isSmartPhoneLoading = false;
      })
      .catch(() => {
        this.isSmartPhoneLoading = false;
      });
  }
}
</script>
