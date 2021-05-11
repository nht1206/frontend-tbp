<template>
  <li class="list-group-item">
    <div class="row">
      <div class="col-12 col-md-12 col-lg-5 col-xl-4">
        <div class="product-box-img">
          <a href="#.html">
            <img :src="product.image" alt="Product Img" />
          </a>
        </div>
      </div>
      <div class="col-12 col-md-12 col-lg-7 col-xl-8 p0">
        <div class="figure-caption">
          <div class="row">
            <div class="col-md-12 col-lg-6 col-xl-6 pr-0">
              <div class="price-start text-center">
                <strong class="active-color"
                  ><u>{{ formatPrice(product.lowestPrice) }} VNĐ</u> -
                  <u>{{ formatPrice(product.highestPrice) }} VNĐ</u></strong
                >
              </div>
            </div>
            <div class="col-6 col-md-12 col-lg-3 text-center">
              <div class="rating" v-html="renderRating()"></div>
            </div>
            <div class="col-6 col-md-12 col-lg-3 text-center">
              <div class="view-count">
                <p>{{ formatPrice(product.viewCount) }} lượt xem</p>
              </div>
            </div>
            <div class="col-12 text-left">
              <div class="content-excerpt">
                <h6 class="product-title">
                  {{ product.title }}
                </h6>
                <p class="product-content" v-html="renderDescription()"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { ProductStatisticsResponse } from "@/service/statistics-service";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ required: true, type: Object })
  product!: ProductStatisticsResponse;

  formatPrice(price: number): string {
    return Intl.NumberFormat().format(price);
  }

  renderRating() {
    let ratingHtml = "";
    for (let i = 0; i < parseInt(this.product.rate.toString(), 10); i++) {
      ratingHtml += `<a 
                  ><i class="fas fa-star active-color" aria-hidden="true"></i
                ></a>`;
    }
    for (let i = 0; i < 5 - parseInt(this.product.rate.toString(), 10); i++) {
      ratingHtml += `<a 
                  ><i class="far fa-star"></i></a>`;
    }
    return ratingHtml;
  }

  renderDescription(): string {
    let desc = "";
    const listDesc = this.product.shortDescription.split("\n");
    listDesc.forEach((d) => {
      if (d) {
        desc += `<p>
                    <i class="far fa-dot-circle" aria-hidden="true"></i>
                    ${d}
                  </p>`;
      }
    });
    return desc;
  }
}
</script>

<style lang="scss" scoped>
.list-group-item {
  .product-box-img {
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .figure-caption {
    background: #f5f2ed;
    .rating {
      padding-left: 30px;
      border-left: 0;
    }
    .price-start {
      color: #999999;
    }
    .price-start strong {
      margin-left: 5px;
      display: inline-block;
    }
    .content-excerpt {
      color: #333333;
      margin-bottom: 10px;
      margin-top: 5px;
      a {
        color: #333;
        font-size: 14px;
      }
      .product-title {
        font-size: 25px !important;
      }

      .product-content {
        color: #666666 !important;
      }
    }
  }
}
</style>