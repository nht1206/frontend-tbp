<template>
  <div class="col-md-12" v-if="!!product">
    <figure class="figure product-box wow fadeIn animated" data-wow-delay="0ms">
      <div class="product-box-img">
        <router-link
          :to="'product-detail/' + product.id"
          custom
          v-slot="{ navigate, href }"
        >
          <a :href="href" @click="navigate">
            <img
              v-if="!!product.images"
              :src="product.images[1]"
              class="figure-img img-fluid"
              alt="Product Img"
            />
          </a>
        </router-link>
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
      <figcaption class="figure-caption text-center">
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
            <router-link
              :to="'product-detail/' + product.id"
              custom
              v-slot="{ navigate, href }"
            >
              <a :href="href" @click="navigate">
                {{ shortenTitle(product.title) }}
              </a>
            </router-link>
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
          <a v-if="!isInCart(product.id)" class="btn btn-sm" @click="addToCart"
            ><i class="fa fa-exchange" aria-hidden="true"></i> Thêm vào so
            sánh</a
          >
          <a v-if="isInCart(product.id)" class="btn btn-sm disabled"
            ><i class="fa fa fa-check-square-o" aria-hidden="true"></i> Đã thêm
            vào so sánh</a
          >
        </div>
      </figcaption>
    </figure>
  </div>
</template>

<script lang="ts">
import Product from "@/models/Product";
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
    if (!!title && title.length > 50) {
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
.product-box-img {
  img {
    height: 283.33px;
  }
}
</style>
