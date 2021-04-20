<template>
  <div>
    <MainSlider></MainSlider>
    <Service></Service>
    <TopDealSlider
      storeName="Gian hàng 1"
      :storeNumber="1"
      :products="productList"
    ></TopDealSlider>
    <TopDealSlider
      storeName="Gian hàng 2"
      :storeNumber="2"
      :products="productList"
    ></TopDealSlider>
    <TrendingSlider></TrendingSlider>
  </div>
</template>

<script lang="ts">
import MainSlider from "@/components/MainSlider/MainSlider.vue";
import Service from "@/components/Service/Service.vue";
import TopDealSlider from "@/components/TopDeal/TopDealSlider.vue";
import TrendingSlider from "@/components/Trending/TrendingSlider.vue";
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
  productList = [
    {
      img:
        "https://www.themeim.com/demo/blurb/demo/img/product-img/product-img-1.jpg",
      lowestPrice: "2.500.000 VNĐ",
      highestPrice: "5.000.000 VNĐ",
      isNew: true,
      shortDescription: "Cras in nunc non ipsum",
    },
    {
      img:
        "https://www.themeim.com/demo/blurb/demo/img/product-img/product-img-2.jpg",
      lowestPrice: "2.500.000 VNĐ",
      highestPrice: "5.000.000 VNĐ",
      isNew: true,
      shortDescription: "Cras in nunc non ipsum",
    },
    {
      img:
        "https://www.themeim.com/demo/blurb/demo/img/product-img/product-img-3.jpg",
      lowestPrice: "2.500.000 VNĐ",
      highestPrice: "5.000.000 VNĐ",
      isNew: false,
      shortDescription: "Cras in nunc non ipsum",
    },
    {
      img:
        "https://www.themeim.com/demo/blurb/demo/img/product-img/product-img-4.jpg",
      lowestPrice: "2.500.000 VNĐ",
      highestPrice: "5.000.000 VNĐ",
      isNew: true,
      shortDescription: "Cras in nunc non ipsum",
    },
    {
      img:
        "https://www.themeim.com/demo/blurb/demo/img/product-img/product-img-5.jpg",
      lowestPrice: "2.500.000 VNĐ",
      highestPrice: "5.000.000 VNĐ",
      isNew: false,
      shortDescription: "Cras in nunc non ipsum",
    },
    {
      img:
        "https://www.themeim.com/demo/blurb/demo/img/product-img/product-img-6.jpg",
      lowestPrice: "2.500.000 VNĐ",
      highestPrice: "5.000.000 VNĐ",
      isNew: true,
      shortDescription: "Cras in nunc non ipsum",
    },
  ];
}
</script>
