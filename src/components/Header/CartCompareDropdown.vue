<template>
  <div class="dropdown wd-compare-btn" v-click-outside="close">
    <button
      class="btn dropdown-toggle compare-btn"
      @click="toggle"
      type="button"
    >
      <i class="fa fa-balance-scale"></i>
    </button>
    <span class="count">{{ cart.length }}</span>
    <div class="dropdown-menu dropdown-menu-right" :class="[{ show: isOpen }]">
      <div class="wd-item-list">
        <media
          v-for="product in cart"
          :key="product.id"
          :product="product"
        ></media>
      </div>
      <div class="media text-center">
        <a href="compare-products.html" class="btn btn-primary go-compare-page"
          >So sánh <i class="fa fa-arrow-right" aria-hidden="true"></i
        ></a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import Media from "./Media.vue";

@Component({
  components: { Media },
  computed: {
    ...mapGetters({
      cart: "cart/cart",
    }),
  },
})
export default class extends Vue {
  isOpen = false;

  toggle(): void {
    this.isOpen = !this.isOpen;
    this.$emit("change", this.isOpen);
  }
  close(): void {
    this.isOpen = false;
    this.$emit("change", false);
  }
}
</script>

<style lang="scss" scoped>
.wd-compare-btn {
  display: inline;
  .compare-btn {
    color: #333;
    font-size: 22px;
    padding: 0;
    margin: 0;
    background: transparent;
    border-color: transparent;
    transform: translateY(-5px);
    cursor: pointer;
    position: relative;
  }

  .compare-btn:hover {
    color: #f44336;
  }

  .compare-btn:after {
    display: none;
  }

  .dropdown-menu {
    width: 366px !important;
    border-radius: 0;
    padding: 0;
    border-color: #f3f3f3;
    i {
      font-size: 12px;
    }
    .media {
      padding: 10px 10px;
      border-bottom: 1px solid #f3f3f3;
    }
    .media:last-child {
      border-bottom: 0;
    }
    .list-group-title {
      font-size: 14px;
      font-weight: 400;
    }
    .cart-price {
      font-size: 14px;
    }
    .go-compare-page {
      padding: 8px 33px;
      background: #4facfe;
      border-color: #4facfe;
      margin: 0 auto;
      i {
        font-size: 12px;
        margin-left: 3px;
      }
    }
    .go-compare-page:hover {
      background: #ff9800;
      border-color: #ff9800;
    }
    .wd-item-list {
      max-height: 242px;
      height: auto;
      min-height: 50px;
      overflow-x: hidden;
    }
  }
}
@media (max-width: 991px) {
  .header-cart {
    .compare-btn {
      font-size: 20px;
    }
    padding: 0;
  }
}
@media (max-width: 767px) {
  .header-cart {
    .compare-btn {
      transform: translateY(-3px);
    }
    padding: 0;
  }
}
</style>