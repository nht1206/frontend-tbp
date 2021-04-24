<template>
  <div id="header" class="d-flex align-items-center mob-sticky">
    <div class="container">
      <div class="row">
        <mobile-menu></mobile-menu>
        <div
          class="order-1 order-sm-2 col-12 col-sm-4 col-md-4 col-lg-2 col-xl-2"
        >
          <div class="tbp-logo">
            <a href="index.html">
              <img src="@/assets/img/logo.png" alt="Logo" />
            </a>
          </div>
        </div>
        <div class="col-12 order-lg-2 col-md-5 col-lg-7 d-none d-lg-block">
          <search-box :items="suggestions"></search-box>
        </div>
        <div class="order-3 order-sm-3 col-10 col-sm-6 col-lg-3 col-md-4">
          <account></account>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MobileMenu from "../NavBar/MobileMenu.vue";
import Account from "./Account.vue";
import CompareCart from "./CompareCart.vue";
import SearchBox from "./SearchBox.vue";

@Component({
  components: { SearchBox, Account, CompareCart, MobileMenu },
})
export default class extends Vue {
  suggestions = [
    "LAPTOP ACER SWIFT 3 SF314-42-R0TR",
    "LAPTOP ACER NITRO 5 AN515-55-5923",
    "Laptop Acer Aspire 3 A315 56 502X",
    "Laptop",
    "Acer",
    "SWIFT",
  ];
}
</script>

<style lang="scss" scoped>
#header {
  padding: 23px 0;
  background: #fff;
}
#header ::-webkit-scrollbar {
  width: 5px;
}
#header ::-webkit-scrollbar-track {
  box-shadow: inset 0 0 16px #d9d7d7;
  border-radius: 0px;
}
#header ::-webkit-scrollbar-thumb {
  border-radius: 0px;
  box-shadow: inset 0 0 16px #ff9800;
}
@media (max-width: 991px) {
  .tpb-logo {
    img {
      width: 109px;
    }
  }
}
@media (min-width: 768px) {
  .tpb-logo {
    text-align: center;
    margin: 20px 0;
  }
}
@media (max-width: 575px) {
  .blrub-logo {
    text-align: center;
    margin: 20px 0;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  #header {
    padding: 10px 0;
  }
}
@media (max-width: 575px) {
  #header .blrub-logo {
    margin: 0px;
  }
  #header {
    padding: 10px 0;
  }
}
</style>
