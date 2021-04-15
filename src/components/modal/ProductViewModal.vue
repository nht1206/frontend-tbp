<template>
  <b-modal
    v-if="selectedProduct"
    id="product-quick-view"
    hide-footer
    hide-header
    size="lg"
  >
    <div class="row">
      <div class="product-gallery col-12 col-md-12 col-lg-6">
        <div class="row">
          <div class="col-md-12 product-slider-details">
            <product-image-carousel
              :images="selectedProduct.images"
            ></product-image-carousel>
          </div>
        </div>
      </div>
      <div class="col-6 col-12 col-md-12 col-lg-6">
        <div class="product-details-gallery">
          <div class="list-group">
            <h4 class="list-group-item-heading product-title">
              {{ selectedProduct.title }}
            </h4>
            <div class="media">
              <div class="media-left media-middle">
                <div class="rating">
                  <a href="#"
                    ><i class="fa fa-star active-color" aria-hidden="true"></i
                  ></a>
                  <a href="#"
                    ><i class="fa fa-star active-color" aria-hidden="true"></i
                  ></a>
                  <a href="#"
                    ><i class="fa fa-star active-color" aria-hidden="true"></i
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
                  3.7/5 <span class="product-ratings-text"> -1747 Ratings</span>
                </p>
              </div>
            </div>
          </div>
          <div class="list-group content-list">
            <p>
              {{ selectedProduct.shortDescription }}
            </p>
          </div>
        </div>
        <div class="product-store row">
          <div
            class="col-12 product-store-box"
            v-for="(store, idx) in selectedProduct.listStores"
            :key="idx"
          >
            <div class="row">
              <div class="col-3 p-3">
                <img
                  :src="store.store.logoImage"
                  height="500"
                  class="img-fluid"
                  alt="Product Img"
                />
              </div>
              <div class="col-5 store-border-price">
                <span
                  v-show="isBestPrice(store.price)"
                  class="badge wd-badge text-uppercase"
                  >Giá tốt</span
                >
                <div class="price text-center mr-3">
                  <p>{{ formatPrice(store.price) }} VNĐ</p>
                </div>
              </div>
              <div class="col-4 store-border-button">
                <a
                  :href="store.url"
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
  </b-modal>
</template>

<script lang="ts">
import Product from "@/models/product";
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import ProductImageCarousel from "../Carousel/ProductImageCarousel.vue";

@Component({
  components: { ProductImageCarousel },
  computed: {
    ...mapGetters({
      selectedProduct: "product/selectedProduct",
    }),
  },
})
export default class extends Vue {
  selectedProduct!: Product;
  isBestPrice(price: number): boolean {
    return this.selectedProduct.lowestPrice === price;
  }

  formatPrice(price: number): string {
    return Intl.NumberFormat().format(price);
  }
}
</script>

<style lang="scss">
#product-quick-view {
  .product-gallery {
    .product-slider-details {
      img {
        width: 100%;
      }
      .lSSlideOuter {
        .lSPager.lSGallery {
          li {
            margin: 0 !important;
            border: 1px solid #ececec;
            border-radius: 0 !important;
          }
        }
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
    .price {
      margin: 15px 0;
      p {
        font-size: 15px;
      }
    }

    .store-border-button {
      padding: 7px;
      a {
        padding: 5px;
        &:hover {
          background: transparent !important;
          border-color: #ff9800 !important;
        }
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
</style>
