<template>
  <div class="container">
    <page-location :pageLocation="['So sánh sản phẩm']"></page-location>
    <div class="row compare-folding-section">
      <div class="col-12 text-center">
        <h2 class="compare-folding-title">So sánh sản phẩm</h2>
      </div>
    </div>
    <div class="row compare-products">
      <div class="col-12 p-2">
        <p v-if="cart.length > 1">
          {{ cart.length }} Sản phẩm được thêm vào so sánh
        </p>
        <p v-if="cart.length <= 1">Bạn chưa thêm đủ sản phẩm để so sánh</p>
      </div>
      <div class="col-12 row" v-if="cart.length > 1">
        <table class="col-md-12 table table-responsive">
          <tbody>
            <tr>
              <td v-for="p in cart" :key="p.id" class="compare-details-section">
                <img :src="p.images[0]" class="figure-img" alt="compare" />
                <div class="compare-price text-center product-detail-desktop">
                  <h6 class="compare-details-title">{{ p.title }}</h6>
                  <div class="compare-details-select-market">
                    <router-link
                      :to="'product-detail/' + p.id"
                      v-slot="{ href, navigate }"
                      custom
                    >
                      <a
                        :href="href"
                        @click="navigate"
                        target="_blank"
                        class="btn select-market-btn"
                      >
                        So sánh giá
                        <i class="fa fa-angle-right" aria-hidden="true"></i>
                        <span>{{ formatPrice(p.lowestPrice) }} VNĐ</span>
                      </a>
                    </router-link>
                  </div>
                  <ul
                    class="full-specifiction"
                    v-html="renderDescription(p.shortDescription)"
                  ></ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Product from "@/models/Product";
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import PageLocation from "../../PageLocation.vue";

@Component({
  components: { PageLocation },
  computed: {
    ...mapGetters({
      cart: "cart/cart",
    }),
  },
})
export default class extends Vue {
  cart!: Product[];

  formatPrice(price: number): string {
    return Intl.NumberFormat().format(price);
  }

  renderDescription(description: string): string {
    let desc = "";
    const listDesc = description.split("\n");
    listDesc.forEach((d) => {
      if (d) {
        desc += `<li class="row">
                      <div class="col-12">
                        <p>${d}</p>
                      </div>
                    </li>`;
      }
    });
    return desc;
  }
}
</script>

<style lang="scss" scoped>
.compare-products {
  background: #fff;
  border: 1px solid #ececec;
  padding: 20px;

  .compare-details-section {
    .compare-details-title {
      min-height: 70px;
    }
  }

  img {
    height: 298px;
  }
  table {
    tbody {
      tr {
        td {
          min-width: 322px;
        }
      }
    }
  }

  .select-market-btn {
    background: #fff;
    padding: 0 14px;
    color: #333333;
    font-size: 12px;
    border-color: #ececec;
    line-height: 2.8;
    font-weight: 700;
    i {
      margin-left: 10px;
    }
    span {
      padding-left: 13px;
      display: inline-block;
      border-left: 1px solid #ececec;
      margin-left: 10px;
    }
    &:hover {
      background: #ff9800;
      border-color: #ff9800;
    }
  }
}
</style>