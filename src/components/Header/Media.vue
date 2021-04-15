<template>
  <div class="media">
    <img class="d-flex mr-3" :src="product.images[0]" alt="cart-img" />
    <div class="media-body">
      <h6 class="mt-0 list-group-title">{{ shortenTitle(product.title) }}</h6>
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
        <a href="#"><i class="fa fa-star-o" aria-hidden="true"></i></a>
        <a href="#"><i class="fa fa-star-o" aria-hidden="true"></i></a>
      </div>
      <div class="cart-price">
        {{ formatPrice(product.lowestPrice) }} VNĐ -
        {{ formatPrice(product.highestPrice) }} VNĐ
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ type: Object, required: true })
  product!: any;

  shortenTitle(title: string): string {
    if (title.length > 100) {
      return title.substring(0, 99) + "...";
    }
    return title;
  }

  formatPrice(price: number): string {
    return Intl.NumberFormat().format(price);
  }
}
</script>

<style lang="scss" scoped>
.media {
  padding: 10px 10px;
  border-bottom: 1px solid #f3f3f3;
  img {
    max-height: 53px;
    max-width: 68px;
  }
  .list-group-title {
    font-size: 14px;
    font-weight: 400;
  }
}
.media:last-child {
  border-bottom: 0;
}
</style>