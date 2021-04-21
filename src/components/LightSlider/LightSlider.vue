<template>
  <ul id="lightSlider">
    <li data-thumb="https://www.w3schools.com/w3css/img_lights.jpg">
      <img
        class="figure-img img-fluid"
        src="https://www.w3schools.com/w3css/img_lights.jpg"
        alt="product-img"
      />
    </li>
    <li data-thumb="https://www.w3schools.com/w3css/img_lights.jpg">
      <img
        class="figure-img img-fluid"
        src="https://www.w3schools.com/w3css/img_lights.jpg"
        alt="product-img"
      />
    </li>
    <li data-thumb="https://www.w3schools.com/w3css/img_lights.jpg">
      <img
        class="figure-img img-fluid"
        src="https://www.w3schools.com/w3css/img_lights.jpg"
        alt="product-img"
      />
    </li>
    <li data-thumb="https://www.w3schools.com/w3css/img_lights.jpg">
      <img
        class="figure-img img-fluid"
        src="https://www.w3schools.com/w3css/img_lights.jpg"
        alt="product-img"
      />
    </li>
    <li data-thumb="https://www.w3schools.com/w3css/img_lights.jpg">
      <img
        class="figure-img img-fluid"
        src="https://www.w3schools.com/w3css/img_lights.jpg"
        alt="product-img"
      />
    </li>
    <li data-thumb="https://www.w3schools.com/w3css/img_lights.jpg">
      <img
        class="figure-img img-fluid"
        src="https://www.w3schools.com/w3css/img_lights.jpg"
        alt="product-img"
      />
    </li>
    <li data-thumb="https://www.w3schools.com/w3css/img_lights.jpg">
      <img
        class="figure-img img-fluid"
        src="https://www.w3schools.com/w3css/img_lights.jpg"
        alt="product-img"
      />
    </li>
    <li data-thumb="https://www.w3schools.com/w3css/img_lights.jpg">
      <img
        class="figure-img img-fluid"
        src="https://www.w3schools.com/w3css/img_lights.jpg"
        alt="product-img"
      />
    </li>
    <li data-thumb="https://www.w3schools.com/w3css/img_lights.jpg">
      <img
        class="figure-img img-fluid"
        src="https://www.w3schools.com/w3css/img_lights.jpg"
        alt="product-img"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  mounted(): void {
    ($("#lightSlider") as any).lightSlider({
      gallery: true,
      item: 1,
      loop: true,
      slideMargin: 0,
      thumbItem: 5,
    });
  }
}
</script>

<style lang="scss" scoped>
</style>