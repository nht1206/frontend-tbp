<template>
  <div id="trending">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="section-title-center text-center">
            <h2 class="title">Trending Now</h2>
          </div>
        </div>
        <product-carousel
          :products="productList"
          :sliderId="'product-slider'"
        ></product-carousel>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ProductBox from "../Carousel/ProductBox.vue";
import ProductCarousel from "../Carousel/ProductCarousel.vue";

@Component({ components: { ProductBox, ProductCarousel } })
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
      isNew: true,
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
      isNew: true,
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

<style lang="scss">
#trending {
  background: #f5f5f5;
  padding: 50px 0;
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
  .owl-stage-outer {
    padding-bottom: 60px;
  }
  .owl-nav {
    position: absolute;
    top: 40%;
    left: 0;
    width: 100%;
  }
  .owl-prev {
    background: #fff;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    transition: 0.5s;
    position: absolute !important;
    left: -60px;

    i {
      color: #333333;
      font-size: 25px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    &:hover {
      background: #ff9800;
      i {
        color: #fff;
      }
    }
  }
  .owl-next {
    background: #fff;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    transition: 0.5s;
    position: absolute !important;
    right: -60px;
    i {
      color: #333333;
      font-size: 25px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    &:hover {
      background: #ff9800;
      i {
        color: #fff;
      }
    }
  }
}
@media (min-width: 1200px) and (max-width: 1300px) {
  #trending {
    .owl-nav {
      .owl-next {
        right: -2px !important;
      }
      .owl-prev {
        left: -2px !important;
      }
    }
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  #trending {
    .owl-nav {
      .owl-next {
        right: -62px !important;
        position: absolute;
        right: -2px !important;
      }
      .owl-prev {
        left: -2px !important;
      }
    }
  }
}
@media (max-width: 991px) {
  #trending {
    .owl-nav {
      .owl-next {
        right: 0px !important;
      }
      .owl-prev {
        left: 0px !important;
      }
    }
  }
}
</style>
