<template>
  <div class="col-md-12" v-if="!!product">
    <figure class="figure product-box wow fadeIn animated" data-wow-delay="0ms">
      <div class="product-box-img">
        <router-link
          :to="'/chi-tiet-san-pham/' + product.id"
          custom
          v-slot="{ navigate, href }"
        >
          <a :href="href" @click="navigate">
            <img
              v-if="!!product.images"
              :src="product.images[0]"
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
              :to="'/chi-tiet-san-pham/' + product.id"
              custom
              v-slot="{ navigate, href }"
            >
              <a :href="href" @click="navigate">
                {{ shortenTitle(product.title) }}
              </a>
            </router-link>
          </p>
        </div>
        <div class="rating" v-if="!isRated">
          <a class="active-color" v-for="star in rate" :key="star + 'x'"
            ><i
              class="fas fa-star"
              :class="{ 'select-color ': selectedRate >= star }"
              @mouseenter="select(star)"
              @mouseleave="resetRate()"
              @click="onRating(star)"
              aria-hidden="true"
            ></i
          ></a>

          <a v-for="noStar in 5 - rate" :key="noStar + 'o'"
            ><i
              class="far fa-star"
              :class="{ 'select-color ': selectedRate >= noStar + rate }"
              @mouseenter="select(rate + noStar)"
              @mouseleave="resetRate()"
              @click="onRating(rate + noStar)"
              aria-hidden="true"
            ></i
          ></a>
        </div>
        <div class="rating" v-if="isRated">
          <a v-for="star in selectedRate" :key="star + 'x'"
            ><i class="fas fa-star active-color" aria-hidden="true"></i
          ></a>

          <a v-for="noStar in 5 - selectedRate" :key="noStar + 'o'"
            ><i class="far fa-star" aria-hidden="true"></i
          ></a>
        </div>
        <div class="compare-btn">
          <a v-if="!isInCart(product.id)" class="btn btn-sm" @click="addToCart"
            ><i class="fas fa-exchange-alt" aria-hidden="true"></i> Thêm vào so
            sánh</a
          >
          <a v-if="isInCart(product.id)" class="btn btn-sm disabled"
            ><i class="far fa-check-square" aria-hidden="true"></i> Đã thêm vào
            so sánh</a
          >
        </div>
      </figcaption>
    </figure>
  </div>
</template>

<script lang="ts">
import Product from "@/models/Product";
import User from "@/models/User";
import productService from "@/service/product-service";
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  components: {},
  computed: {
    ...mapGetters({
      cart: "cart/cart",
      user: "auth/user",
    }),
  },
})
export default class extends Vue {
  @Prop({ type: Object, required: true })
  product!: Product;

  user!: User;

  cart!: Product[];

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
    if (this.product.rated) {
      this.$bvModal.show("inform-modal");
      return;
    }
    this.isRated = true;
    this.selectedRate = rate;
    productService.rateProduct(this.product.id, { rate: rate });
  }

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

  get rate() {
    return parseInt(this.product.rate.toString(), 10);
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
