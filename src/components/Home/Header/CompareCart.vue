<template>
  <div class="header-cart">
    <!-- <a class="header-wishlist" href="wishlist.html">
      <i class="fa fa-heart-o" aria-hidden="true"></i>
      <span class="count">8</span>
    </a> -->
    <cart-compare-dropdown></cart-compare-dropdown>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CartCompareDropdown from "./CartCompareDropdown.vue";

@Component({ components: { CartCompareDropdown } })
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.header-cart {
  display: inline;
  position: relative;
  // float: right;
  .btn {
    span {
      font-size: 14px;
    }
  }

  .header-wishlist {
    font-size: 22px;
    color: #333333;
    margin-right: 10px;
    position: relative;

    span {
      margin-top: 0 !important;
    }
  }

  .header-wishlist:hover {
    color: #f44336;
  }
}
@media (max-width: 991px) {
  .header-cart {
    padding: 0 15px;
  }
}
</style>
