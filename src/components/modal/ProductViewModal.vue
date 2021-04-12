<template>
  <b-modal id="product-quick-view" hide-footer hide-header size="lg">
    <div class="row">
      <div class="product-gallery col-12 col-md-12 col-lg-6">
        <div class="row">
          <div class="col-md-12 product-slider-details">
            <product-image-carousel></product-image-carousel>
          </div>
        </div>
      </div>
      <div class="col-6 col-12 col-md-12 col-lg-6">
        <div class="product-details-gallery">
          <div class="list-group">
            <h4 class="list-group-item-heading product-title">
              Vigo SP111-31N-P2GH Spin 1
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
              <i class="fa fa-dot-circle-o" aria-hidden="true"></i> 100%
              Original product
            </p>
            <p>
              <i class="fa fa-dot-circle-o" aria-hidden="true"></i> Manufacturer
              Warranty
            </p>
          </div>
        </div>
        <div class="product-store row">
          <div class="col-12 product-store-box">
            <div class="row">
              <div class="col-3 p0 store-border-img">
                <img
                  src="@/assets/img/product-store/product-store-img1.jpg"
                  class="figure-img img-fluid"
                  alt="Product Img"
                />
              </div>
              <div class="col-5 store-border-price text-center">
                <div class="price">
                  <p>$234</p>
                </div>
              </div>
              <div class="col-4 store-border-button">
                <a href="#" class="btn btn-primary wd-shop-btn pull-right">
                  Buy it now
                </a>
              </div>
            </div>
          </div>
          <div class="col-12 product-store-box">
            <div class="row">
              <div class="col-3 p0 store-border-img">
                <img
                  src="@/assets/img/product-store/product-store-img2.jpg"
                  class="figure-img img-fluid"
                  alt="Product Img"
                />
              </div>
              <div class="col-5 store-border-price text-center">
                <div class="price">
                  <p>$535</p>
                </div>
              </div>
              <div class="col-4 store-border-button">
                <a
                  href="#"
                  class="btn btn-primary wd-shop-btn pull-right red-bg"
                >
                  Buy it now
                </a>
              </div>
            </div>
          </div>
          <div class="col-12 product-store-box">
            <div class="row">
              <div class="col-3 p0 store-border-img">
                <img
                  src="@/assets/img/product-store/product-store-img3.jpg"
                  class="figure-img img-fluid"
                  alt="Product Img"
                />
              </div>
              <div class="col-5 store-border-price">
                <span class="badge wd-badge text-uppercase">Best</span>
                <div class="price text-center">
                  <p>$198</p>
                </div>
              </div>
              <div class="col-4 store-border-button">
                <a
                  href="#"
                  class="btn btn-primary wd-shop-btn pull-right orange-bg"
                >
                  Buy it now
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
import { Component, Vue } from "vue-property-decorator";
import ProductImageCarousel from "../Carousel/ProductImageCarousel.vue";

@Component({ components: { ProductImageCarousel } })
export default class extends Vue {}
</script>

<style lang="scss">
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
    margin-left: 25px;
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
    top: 15px;
    font-size: 12px;
    font-weight: 400;
    position: absolute;
    background: #ff4a4a;
  }
}
</style>