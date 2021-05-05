<template>
  <div class="header-top">
    <div class="container">
      <div class="row">
        <div class="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-3">
          <social-media></social-media>
        </div>
        <div class="col-sm-12 col-md-4 col-lg-5 col-xl-6 d-none d-md-block">
          <offer-text
            offerText="Philong giảm giá tất cả sản phẩm 50%"
          ></offer-text>
        </div>
        <div class="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3">
          <language-currency-select></language-currency-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LanguageCurrencySelect from "./LanguageCurrencySelect.vue";
import OfferText from "./OfferText.vue";
import SocialMedia from "./SocialMedia.vue";

@Component({
  components: { SocialMedia, OfferText, LanguageCurrencySelect },
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.header-top {
  padding: 13px 0;
  background: whitesmoke;
  .col-6 {
    padding: 0;
  }
}
</style>
