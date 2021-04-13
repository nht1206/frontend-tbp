<template>
  <div class="row">
    <div class="col-12 col-md-6 col-lg-4" v-for="p in productList" :key="p.id">
      <product :product="p"></product>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Product from "./Product.vue";

@Component({ components: { Product } })
export default class extends Vue {
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

<style lang="scss" scoped>
</style>