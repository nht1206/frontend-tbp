<template>
  <div :id="sliderId" class="owl-carousel owl-theme">
    <product-box
      v-for="product in products"
      :key="product.id"
      :product="product"
    ></product-box>
  </div>
</template>

<script lang="ts">
import Product from "@/models/product";
import { Component, Prop, Vue } from "vue-property-decorator";
import ProductBox from "./ProductBox.vue";

@Component({ components: { ProductBox } })
export default class extends Vue {
  @Prop({ type: Array, required: true })
  products!: Array<Product>;
  @Prop({ type: String, required: true })
  sliderId!: string;

  mounted(): void {
    // eslint-disable-next-line
    ($("#" + this.sliderId) as any).owlCarousel({
      loop: true,
      nav: true,
      navText: [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>",
      ],
      dots: false,
      responsive: {
        0: {
          items: 1,
        },
        576: {
          items: 2,
        },
        992: {
          items: 3,
        },
        1200: {
          items: 4,
        },
      },
    });
  }
}
</script>
