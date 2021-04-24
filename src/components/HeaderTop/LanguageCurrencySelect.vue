<template>
  <div class="language-and-currency-btn">
    <img src="@/assets/img/vn-flag.svg" alt="flag-icon" />
    <header-selector title="Tiếng Việt" :right="true">
      <a class="dropdown-item" href="#"
        ><img src="@/assets/img/uk.svg" alt="flag-icon" />Tiếng Anh</a
      >
    </header-selector>
    <header-selector title="Tiền tệ">
      <a class="dropdown-item" href="#">&#36; VNĐ</a>
      <a class="dropdown-item" href="#">&#163; Dollar</a>
      <a class="dropdown-item" href="#">&#8364; Euro</a>
    </header-selector>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HeaderSelector from "./HeaderSelector.vue";

@Component({ components: { HeaderSelector } })
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.language-and-currency-btn {
  img {
    max-width: 20px;
    max-height: 12px;
  }
}
</style>
