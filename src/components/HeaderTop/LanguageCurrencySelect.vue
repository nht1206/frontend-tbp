<template>
  <div class="language-and-currency-btn">
    <img src="@/assets/img/flag-icon.jpg" alt="flag-icon" />
    <header-selector title="Tiếng Việt" :right="true">
      <a class="dropdown-item" href="#"
        ><img src="@/assets/img/flag-icon-2.png" alt="flag-icon" />Tiếng Anh</a
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
</style>