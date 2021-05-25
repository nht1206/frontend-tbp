<template>
  <div id="header" class="d-flex align-items-center mob-sticky">
    <div class="container">
      <div class="row">
        <mobile-menu></mobile-menu>
        <div
          class="order-1 order-sm-2 col-12 col-sm-4 col-md-4 col-lg-2 col-xl-2"
        >
          <div class="tbp-logo">
            <router-link to="/" custom v-slot="{ href, navigate }">
              <a :href="href" @click="navigate">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/shop1-eeb2c.appspot.com/o/images%2Ffinal2.png?alt=media&token=b199fa1f-d1b7-4596-b77d-12f907dcd436"
                  alt="Logo"
                />
              </a>
            </router-link>
          </div>
        </div>
        <div class="col-12 order-lg-2 col-md-6 col-lg-6 d-none d-lg-block">
          <search-box></search-box>
        </div>
        <div class="order-3 order-sm-3 col-10 col-sm-6 col-lg-4 col-md-6">
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
export default class extends Vue {}
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
  .tpb-logo {
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
