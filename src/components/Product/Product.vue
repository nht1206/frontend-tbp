<template>
  <div>
    <figure class="figure product-box row">
      <div class="col-12 col-md-12 col-lg-12 col-xl-12 p0">
        <div class="product-box-img">
          <a href="product-details.html">
            <img
              :src="product.images[0]"
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
              v-b-modal.product-quick-view
              @click="openQuickView"
            >
              <i class="fa fa-eye" aria-hidden="true"></i> Xem nhanh
            </button>
          </div>
        </div>
        <!-- <span
        v-if="product.isNew"
        class="badge badge-secondary wd-badge text-uppercase"
        >Mới</span
      > -->
        <!-- <div class="wishlist">
        <i
          class="fa fa-heart"
          :class="{ 'active-wishlist': true }"
          aria-hidden="true"
        ></i>
      </div> -->
      </div>
      <div class="col-12 col-md-12 col-lg-12 col-xl-12 p-1">
        <div class="figure-caption text-center">
          <div class="price-start">
            <p>
              Giá từ <br />
              <strong class="active-color"
                ><u>{{ formatPrice(product.lowestPrice) }} VNĐ</u> -
                <u>{{ formatPrice(product.highestPrice) }} VNĐ</u></strong
              >
            </p>
          </div>
          <div class="content-excerpt">
            <p>
              <a href=""> {{ shortenTitle(product.title) }}</a>
            </p>
          </div>
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
          <div class="compare-btn">
            <a class="btn btn-sm" @click="addToCart"
              ><i class="fa fa-exchange" aria-hidden="true"></i> Thêm vào so
              sánh</a
            >
          </div>
        </div>
      </div>
    </figure>
  </div>
</template>

<script lang="ts">
import Product from "@/models/product";
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  components: {},
  computed: {
    ...mapGetters({
      cart: "cart/cart",
    }),
  },
})
export default class extends Vue {
  @Prop({ type: Object, required: true })
  product!: Product;

  cart!: Product[];

  openQuickView(): void {
    this.$store.commit("product/setSelectedProduct", this.product);
  }

  addToCart(): void {
    if (!this.isInCart(this.product.id)) {
      this.$store.commit("cart/addToCart", this.product);
    }
  }

  shortenTitle(title: string): string {
    if (title.length > 50) {
      return title.substring(0, 50) + "...";
    }
    return title;
  }

  formatPrice(price: number): string {
    return Intl.NumberFormat().format(price);
  }

  isInCart(productId: number): boolean {
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].id === productId) {
        return true;
      }
    }
    return false;
  }
}
</script>

<style lang="scss" scoped>
.product-box {
  margin-bottom: 50px;
  .product-box-img {
    img {
      width: 100%;
      height: 258px;
    }
  }
}
</style>
