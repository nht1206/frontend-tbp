<template>
  <div class="media">
    <div class="image-area">
      <img class="d-flex mr-3" :src="product.images[0]" alt="cart-img" />
      <a class="remove-image" @click="remove" style="display: inline">&#215;</a>
    </div>

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

  remove(id: string): void {
    this.$store.commit("cart/removeProduct", this.product.id);
  }

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
  .image-area {
    position: relative;
    img {
      max-height: 53px;
      max-width: 68px;
    }
    .remove-image {
      cursor: pointer;
      display: none;
      position: absolute;
      top: -10px;
      right: 5px;
      border-radius: 10em;
      padding: 1px 3px 1px;
      text-decoration: none;
      font: 700 21px/20px sans-serif;
      background: #555;
      border: 3px solid #fff;
      color: #fff;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5),
        inset 0 2px 4px rgba(0, 0, 0, 0.3);
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
      -webkit-transition: background 0.5s;
      transition: background 0.5s;
    }
    .remove-image:hover {
      background: #ff9800 !important;
      padding: 1px 5px 1px;
      top: -10px;
      right: 5px;
    }
    .remove-image:active {
      background: #ff9800 !important;
      top: -10px;
      right: 5px;
    }
  }

  .cart-price {
    color: #ff9800 !important;
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