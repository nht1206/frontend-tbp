<template>
  <div class="col-md-12">
    <figure class="figure product-box wow fadeIn animated" data-wow-delay="0ms">
      <div class="product-box-img">
        <a href="product-details.html">
          <img
            :src="product.img"
            class="figure-img img-fluid"
            alt="Product Img"
          />
        </a>
      </div>
      <div class="quick-view-btn">
        <div class="compare-btn">
          <button
            type="button"
            class="btn btn-primary btn-sm"
            @click="openQuickView"
          >
            <i class="fa fa-eye" aria-hidden="true"></i> Xem nhanh
          </button>
        </div>
      </div>
      <figcaption class="figure-caption text-center">
        <span
          v-if="product.isNew"
          class="badge badge-secondary wd-badge text-uppercase"
          >Mới</span
        >
        <div class="wishlist">
          <i
            class="fa fa-heart"
            :class="{ 'active-wishlist': true }"
            aria-hidden="true"
          ></i>
        </div>
        <div class="price-start">
          <p>
            Giá từ
            <strong class="active-color"
              ><u>{{ product.lowestPrice }}</u> -
              <u>{{ product.highestPrice }}</u></strong
            >
          </p>
        </div>
        <div class="content-excerpt">
          <p>
            <a href=""> {{ product.shortDescription }}</a>
          </p>
        </div>
        <div class="rating">
          <a class="active-color" href="#"
            ><i class="fa fa-star" aria-hidden="true"></i
          ></a>
          <a class="active-color" href="#"
            ><i class="fa fa-star" aria-hidden="true"></i
          ></a>
          <a class="active-color" href="#"
            ><i class="fa fa-star" aria-hidden="true"></i
          ></a>
          <a href="#"><i class="fa fa-star-o" aria-hidden="true"></i></a>
          <a href="#"><i class="fa fa-star-o" aria-hidden="true"></i></a>
        </div>
        <div class="compare-btn">
          <a class="btn btn-primary btn-sm" href="#"
            ><i class="fa fa-exchange" aria-hidden="true"></i> Thêm để so
            sánh</a
          >
        </div>
      </figcaption>
    </figure>
  </div>
</template>

<script lang="ts">
import Product from "@/models/product";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ type: Object, required: true })
  product!: Product;

  openQuickView(): void {
    this.$bvModal.show("product-quick-view");
  }
}
</script>

<style lang="scss" scoped></style>
