<template>
  <b-modal
    @hidden="resetData"
    @shown="onOpen"
    id="product-detail-view"
    hide-footer
    size="lg"
    title="Xem sản phẩm"
  >
    <div class="row" v-if="!!selectedProduct && !isLoading">
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
        <button
          :disabled="isApproving"
          v-if="!approved"
          @click="approve"
          class="btn btn-create float-right"
        >
          <div
            v-if="isApproving"
            class="spinner-border spinner-border-sm"
            role="status"
          >
            <span class="sr-only">Loading...</span>
          </div>
          Duyệt
        </button>
        <div class="product-details-gallery">
          <div class="list-group">
            <h4 class="list-group-item-heading product-title">
              {{ selectedProduct.title }}
            </h4>
          </div>
          <div
            class="list-group content-list"
            v-html="renderShortDescription()"
          ></div>
        </div>
        <div class="product-store row">
          <div
            class="col-12 product-store-box"
            v-for="(store, idx) in selectedProduct.prices"
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
                  Tới cửa hàng
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12" v-html="renderLongDescription()"></div>
    </div>
    <loading :isLoading="isLoading"></loading>
  </b-modal>
</template>

<script lang="ts">
import ProductImageCarousel from "@/components/Home/Carousel/ProductImageCarousel.vue";
import Loading from "@/components/Home/Loading.vue";
import Product from "@/models/Product";
import User from "@/models/User";
import productService from "@/service/product-service";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: { ProductImageCarousel, Loading },
})
export default class extends Vue {
  @Prop({ required: true })
  id!: number;
  @Prop({ default: true })
  approved!: boolean;
  selectedProduct: Product | null = null;
  user!: User;

  isLoading = false;
  isApproving = false;

  isBestPrice(price: number): boolean {
    return this.selectedProduct?.lowestPrice === price;
  }

  formatPrice(price: number): string {
    return Intl.NumberFormat().format(price);
  }

  get rate() {
    if (this.selectedProduct) {
      return parseInt(this.selectedProduct.rate.toString(), 10);
    }
    return 0;
  }

  selectedRate = 0;
  isRated = false;

  select(rate: number) {
    this.selectedRate = rate;
  }

  resetRate() {
    this.selectedRate = 0;
  }

  onRating(rate: number) {
    if (!this.user) {
      this.$bvModal.show("login-inform-modal");
      return;
    }
    this.isRated = true;
    this.selectedRate = rate;
    if (this.selectedProduct) {
      productService.rateProduct(this.selectedProduct.id, { rate: rate });
    }
  }

  resetData() {
    this.selectedRate = 0;
    this.isRated = false;
  }

  renderShortDescription(): string {
    let desc = "";
    const listDesc = this.selectedProduct?.shortDescription.split("\n");
    listDesc?.forEach((d) => {
      if (d) {
        desc += `<p>
                    <i class="fa fa-dot-circle-o" aria-hidden="true"></i>
                    ${d}
                  </p>`;
      }
    });
    return desc;
  }
  renderLongDescription(): string {
    let desc = "";
    const listDesc = this.selectedProduct?.longDescription.split("\n");
    listDesc?.forEach((d) => {
      if (d) {
        desc += `<ul class="list-group">
          <li class="list-group-item">${d}</li>
        </ul>`;
      }
    });
    return desc;
  }
  onOpen() {
    this.isLoading = true;
    productService
      .findById(this.id + "")
      .then((res) => {
        this.selectedProduct = res.data;
        this.isLoading = false;
      })
      .catch(() => {
        this.isLoading = false;
        this.$bvModal.hide("product-detail-view");
      });
  }

  approve() {
    this.isApproving = true;
    productService
      .approveProduct(this.id + "")
      .then(() => {
        this.isApproving = false;
        this.$bvModal.hide("product-detail-view");
        this.$emit("approved");
      })
      .catch(() => {
        this.isApproving = false;
      });
  }
}
</script>

<style lang="scss">
#product-detail-view {
  .product-gallery {
    .product-slider-details {
      img {
        width: 368px;
        height: 368px;
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
      word-break: break-word;
    }
    .list-group {
      padding-bottom: 22px;
      border-bottom: 1px solid;
      border-color: #c3c3c3;
      &:last-child {
        border-bottom: 0;
      }
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
  }
}
</style>
