<template>
  <div id="top-deals">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="section-title-center text-left">
            <h2 class="title pl-0">{{ storeName }} Top Deals</h2>
          </div>
        </div>
        <product-carousel
          :products="products"
          :sliderId="sliderId"
        ></product-carousel>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Product from "@/models/product";
import { Component, Prop, Vue } from "vue-property-decorator";
import ProductBox from "../Carousel/ProductBox.vue";
import ProductCarousel from "../Carousel/ProductCarousel.vue";

@Component({ components: { ProductBox, ProductCarousel } })
export default class extends Vue {
  @Prop({ type: String, required: true })
  storeName!: string;
  @Prop({ type: Array, required: true })
  products!: Array<Product>;
  @Prop({ type: Number, required: true })
  storeNumber!: number;

  sliderId!: string;

  created(): void {
    this.sliderId = "slider" + this.storeNumber;
  }
}
</script>

<style lang="scss">
#top-deals {
  background: #fff;
  padding: 50px 0 0px;
  .section-title-center {
    margin-bottom: 50px;
    position: relative;
    .title {
      position: relative;
      z-index: 10;
      background: #f5f5f5;
      display: inline-block;
      padding: 0 35px;
      font-size: 30px;
      font-weight: 400;
    }
  }
  .section-title-center:before {
    position: absolute;
    content: "";
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    background: #d6d6d6;
    transform: translateY(-50%);
  }
  .owl-theme {
    .owl-stage-outer {
      padding-bottom: 60px;
    }
    .owl-nav {
      position: absolute;
      top: -106px;
      right: 0;
      background: #fff;
      padding: 0 15px;
    }
    .owl-prev {
      float: left;
      background: #f4f4f4;
      padding: 8px 15px !important;
      border-radius: 0;
      transition: 0.5s;
      i {
        color: #333333;
        font-size: 30px;
      }
      &:hover {
        background: #000;
        i {
          color: #fff;
        }
      }
    }
    .owl-next {
      float: right;
      background: #f4f4f4;
      padding: 8px 15px !important;
      border-radius: 0;
      transition: 0.5s;
      i {
        color: #333333;
        font-size: 30px;
      }
      &:hover {
        background: #000;
        i {
          color: #fff;
        }
      }
    }
  }
}
@media (max-width: 992px) {
  .display-none-md {
    display: none !important;
  }
  .section-title-center {
    .title {
      font-size: 20px;
    }
  }
}
</style>
