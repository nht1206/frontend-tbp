<template>
  <div class="product-shop-page product-shop-full-grid">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <page-location :pageLocation="['Danh sách sản phẩm']"></page-location>
        </div>
        <div class="order-sm-2 order-md-1 col-12 col-md-4 col-lg-3">
          <side-bar-search></side-bar-search>
          <category></category>
          <market></market>
          <color></color>
          <tag></tag>
        </div>
        <div
          class="order-sm-1 order-md-2 col-12 col-md-8 col-lg-9 product-grid"
        >
          <div class="row">
            <div class="col-12">
              <filter-bar></filter-bar>
            </div>
            <div class="tab-content col-12">
              <tab-content></tab-content>
              <loading :isLoading="isLoadingProduct"></loading>
            </div>
            <div
              v-if="!products.last && !isLoadingProduct && !products.empty"
              class="col-12 text-center"
            >
              <a @click="loadMore" class="btn wd-shop-btn"> Xem thêm </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import Loading from "@/components/Home/Loading.vue";
import PageLocation from "@/components/Home/PageLocation.vue";
import Category from "./Category.vue";
import Color from "./Color.vue";
import FilterBar from "./FilterBar.vue";
import Market from "./Market.vue";
import SideBarSearch from "./SideBarSearch.vue";
import TabContent from "./TabContent.vue";
import Tag from "./Tag.vue";

@Component({
  components: {
    PageLocation,
    SideBarSearch,
    Category,
    Market,
    Color,
    Tag,
    FilterBar,
    TabContent,
    Loading,
  },
  computed: {
    ...mapGetters({
      products: "product/products",
      isLoadingProduct: "product/isLoading",
    }),
  },
})
export default class extends Vue {
  loadMore(): void {
    this.$store.dispatch("product/loadMore");
  }

  created() {
    this.$store.commit("product/setCurrentOption", {});
  }
}
</script>

<style lang="scss" scoped>
.product-shop-page {
  background: #f5f5f5 !important;
  .product-box {
    margin-bottom: 50px;
  }
  .wd-badge {
    left: 20px;
  }
  .wishlist {
    right: 20px;
  }
  .tab-content {
    .tab-rating-bar-section {
      img {
        width: 100%;
      }
    }
    .wd-star-market-badge {
      margin-left: 5px;
    }
  }
}
.product-shop-full-grid {
  .product-box {
    &:hover {
      .figure-caption {
        background: #f5f2ed;
      }
      .content-excerpt {
        color: #666666 !important;
      }
      .price-start {
        color: #666666 !important;
      }
      .active-color {
        color: #666666 !important;
        color: #ff9800 !important;
      }
      .product-content {
        color: #666666 !important;
      }
      .rating {
        i {
          color: #666666 !important;
          color: #ff9800 !important;
        }
      }
    }
  }
  .figure-caption {
    height: 100%;
    padding: 22px 20px;
    .rating {
      border-left: 1px solid;
      border-color: #dbdbdb;
      padding: 0 0 0 15px;
      transform: translate(-15px, 3px);
    }
  }
  .product-box-img {
    img {
      width: 100%;
    }
  }
  .price-start {
    font-size: 18px;
  }
  .product-title {
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 10px;
  }
  .product-content {
    color: #666666;
  }
  .wd-shop-btn {
    background: #cecece;
    color: #fff;
    padding: 8px 12px;
    margin-bottom: 25px;
    &:hover {
      background: #fff;
      color: #ff9800;
    }
  }
}
</style>
