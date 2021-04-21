<template>
  <ul id="lightSlider">
    <li v-for="(image, idx) in images" :key="idx" :data-thumb="image">
      <img class="figure-img img-fluid" :src="image" alt="product-img" />
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({
    required: true,
  })
  images!: string[];
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