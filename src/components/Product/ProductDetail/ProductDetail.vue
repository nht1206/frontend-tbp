<template>
  <div class="product-details">
    <div class="container">
      <div class="row">
        <div class="col-12 p0">
          <page-location
            :pageLocation="[!isLoading ? product.title : '']"
          ></page-location>
        </div>
        <div class="col-12">
          <loading :isLoading="isLoading"></loading>
        </div>
        <div class="col-12" v-if="!isLoading">
          <div class="row">
            <div class="col-12 col-md-12 col-lg-6">
              <div class="row">
                <div class="col-md-12 product-slider-details">
                  <light-slider :images="product.images"></light-slider>
                </div>
              </div>
            </div>
            <div class="col-6 col-12 col-md-12 col-lg-6">
              <div class="product-details-gallery">
                <div class="list-group">
                  <h4 class="list-group-item-heading product-title">
                    {{ product.title }}
                  </h4>
                  <div class="media">
                    <div class="media-left media-middle">
                      <div class="rating">
                        <a href="#"
                          ><i
                            class="fa fa-star active-color"
                            aria-hidden="true"
                          ></i
                        ></a>
                        <a href="#"
                          ><i
                            class="fa fa-star active-color"
                            aria-hidden="true"
                          ></i
                        ></a>
                        <a href="#"
                          ><i
                            class="fa fa-star active-color"
                            aria-hidden="true"
                          ></i
                        ></a>
                        <a href="#"
                          ><i class="fa fa-star-o" aria-hidden="true"></i
                        ></a>
                        <a href="#"
                          ><i class="fa fa-star-o" aria-hidden="true"></i
                        ></a>
                      </div>
                    </div>
                    <div class="media-body">
                      <p>
                        3.7/5
                        <span class="product-ratings-text"> -1747 Ratings</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  v-html="renderDescription()"
                  class="list-group content-list"
                ></div>
              </div>
              <div class="product-store row">
                <div
                  v-for="(p, idx) in product.prices"
                  :key="idx"
                  class="col-12 product-store-box"
                >
                  <div class="row">
                    <div class="col-3 p-3 store-border-img">
                      <img
                        :src="p.store.logoImage"
                        class="figure-img img-fluid"
                        alt="Product Img"
                      />
                    </div>
                    <div class="col-5 store-border-price text-center">
                      <span
                        v-if="isBestPrice(p.price)"
                        class="badge wd-badge text-uppercase"
                        >Giá tốt</span
                      >
                      <div class="price">
                        <p>{{ p.price }} VNĐ</p>
                      </div>
                    </div>
                    <div class="col-4 store-border-button">
                      <a
                        :href="p.url"
                        :target="'_blank'"
                        class="btn btn-primary wd-shop-btn pull-right orange-bg"
                      >
                        Xem ngay
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12" v-if="!isLoading">
          <price-history
            :specification="product.longDescription"
          ></price-history>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LightSlider from "../../LightSlider/LightSlider.vue";
import PageLocation from "../../PageLocation.vue";
import PriceHistory from "./PriceHistory.vue";
import produceService from "@/service/product-service";
import Product from "@/models/Product";
import Loading from "@/components/Loading.vue";

@Component({
  components: { PageLocation, LightSlider, PriceHistory, Loading },
})
export default class extends Vue {
  id!: string;
  product!: Product;
  isLoading = false;
  isBestPrice(price: number): boolean {
    return this.product.lowestPrice === price;
  }
  created(): void {
    this.id = this.$route.params["id"];
    this.isLoading = true;
    produceService.findById(this.id).then((res) => {
      this.product = res.data;
      this.isLoading = false;
    });
  }

  renderDescription(): string {
    let desc = "";
    const listDesc = this.product.shortDescription.split("\n");
    listDesc.forEach((d) => {
      if (d) {
        desc += `<p>
                    <i class="fa fa-dot-circle-o" aria-hidden="true"></i>
                    ${d}
                  </p>`;
      }
    });
    return desc;
  }
}
</script>

<style lang="scss" scoped>
.product-details {
  background: #f5f5f5;
  padding-bottom: 50px;
  .page-location {
    padding: 15px 0;
  }
  .choose-markets {
    .select-market-btn {
      background: transparent;
      border-color: #ececec;
      color: #333333;
      &:hover {
        background: #ff9800;
        color: #fff;
      }
      &:focus {
        outline: none;
        box-shadow: none;
      }
    }
  }
  .product-details-gallery {
    margin-top: 50px;
    .product-ratings-text {
      display: inline-block;
      font-size: 14px;
      font-weight: 300;
    }
    .product-title {
      font-weight: 400;
      font-size: 30px;
      margin-bottom: 10px;
    }
    .rating {
      padding-right: 7px;
      border-right: 1px solid #c3c3c3;
      margin-right: 7px;
      i {
        font-size: 20px;
      }
    }
    .list-group {
      padding-bottom: 22px;
      border-bottom: 1px solid;
      border-color: #c3c3c3;
      &:last-child {
        border-bottom: 0;
      }
    }
    .media-body {
      font-size: 20px;
      line-height: 1;
    }
    .content-list {
      padding-top: 20px;
      padding-bottom: 30px;
      color: #666666;
      i {
        margin-right: 5px;
      }
    }
  }
  .product-store {
    padding: 0 15px;
    .store-border-img {
      border: 1px solid #ececec;
      border-bottom: 0;
    }
    .store-border-price {
      border: 1px solid #ececec;
      border-left: 0;
      border-bottom: 0;
      font-size: 16px;
      font-weight: 300;
      border-right: 0;
    }
    .store-border-button {
      border: 1px solid #ececec;
      border-left: 0;
      border-bottom: 0;
      padding-top: 14px;
      a {
        padding: 8px 16px;
        text-transform: uppercase;
        font-weight: 400;
        font-size: 14px;
      }
    }
    .price {
      margin: 15px 0;
      p {
        font-size: 15px;
      }
    }
    .wd-badge {
      padding: 5px 3px;
      top: -5px;
      font-size: 12px;
      font-weight: 400;
      position: absolute;
      background: #ff4a4a;
      right: 0;
    }
  }
}
@media (max-width: 767px) {
  .product-slier-details {
    padding: 20px 15px;
  }
  .product-details-gallery {
    .product-title {
      font-size: 20px;
    }
    .media-body {
      font-size: 15px;
    }
    .rating {
      i {
        font-size: 15px;
      }
    }
  }
  .product-store {
    .store-border-price {
      font-size: 15px;
    }
    .store-border-button {
      a {
        font-size: 12px;
        padding: 5px;
      }
    }
    .wd-badge {
      padding: 5px;
    }
  }
  .store-border-img {
    padding: 15px;
  }
}
</style>
