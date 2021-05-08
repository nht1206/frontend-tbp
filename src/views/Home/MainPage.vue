<template>
  <div>
    <MainSlider></MainSlider>
    <Service></Service>
    <TopDealSlider
      v-if="laptopHotDeal"
      storeName="Laptop"
      :storeNumber="1"
      :products="laptopHotDeal"
    ></TopDealSlider>
    <TopDealSlider
      v-if="smartPhoneHotDeal"
      storeName="Smart phone"
      :storeNumber="2"
      :products="smartPhoneHotDeal"
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

  created() {
    productService.getLaptopHotDeal().then((res) => {
      this.laptopHotDeal = res.data;
    });
    productService.getSmartPhoneHotDeal().then((res) => {
      this.smartPhoneHotDeal = res.data;
    });
  }
}
</script>
