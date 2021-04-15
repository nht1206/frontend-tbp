<template>
  <div class="filter row">
    <div class="col-8 col-md-3">
      <h6 class="result">Hiển thị tất cả {{ products.length }} kết quả</h6>
    </div>
    <div class="col-6 col-md-6 filter-btn-area text-center">
      <div class="btn-group" role="group">
        <filter-selector></filter-selector>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import FilterSelector from "./FilterSelector.vue";

@Component({
  components: { FilterSelector },
  computed: {
    ...mapGetters({
      products: "product/products",
    }),
  },
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.filter {
  background: #fff;
  padding: 9px 6px 0;
  margin-bottom: 20px;
  margin-left: 0;
  margin-right: 0;
  .result {
    font-size: 12px;
    font-weight: 300;
    padding-top: 7px;
    font-style: italic;
  }
}
</style>
