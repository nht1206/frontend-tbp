<template>
  <div class="row">
    <div
      class="col-12 col-md-6 col-lg-4"
      v-for="p in products.content"
      :key="p.id"
    >
      <product :product="p"></product>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import Product from "./Product.vue";

@Component({
  components: { Product },
  computed: {
    ...mapGetters({
      products: "product/products",
    }),
  },
})
export default class extends Vue {
  mounted(): void {
    this.$store.dispatch("product/searchProducts");
  }
}
</script>
