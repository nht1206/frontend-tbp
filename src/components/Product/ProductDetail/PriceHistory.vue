<template>
  <div class="specifiction-section">
    <div class="row">
      <div class="col-12 col-md-5">
        <h2 class="specifiction-title">Thông số kĩ thuật</h2>
        <ul
          v-html="renderSpecification()"
          class="list-group specifiction-list"
        ></ul>
      </div>
      <div class="col-12 col-md-7 price-history-section">
        <h2 class="price-history-title">Lịch sử thay đổi giá</h2>
        <p class="price-history-subtitle">Tỉ lệ thay đổi giá</p>
        <div class="col-12">
          <div class="row">
            <price-box
              :value="52"
              sinceText="Since Last Month"
              :sinceValue="52.08"
            ></price-box>
            <price-box
              :value="52"
              sinceText="Last 10 days"
              :sinceValue="52.08"
            ></price-box>
            <price-box
              :value="52"
              sinceText="Since Last Month"
              :sinceValue="52.08"
            ></price-box>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PriceBox from "./PriceBox.vue";

@Component({
  components: { PriceBox },
})
export default class extends Vue {
  @Prop({
    required: true,
  })
  specification!: string;
  renderSpecification(): string {
    let spec = "";
    const listSpec = this.specification.split("\n");
    for (let i = 0; i < listSpec.length; i++) {
      if (listSpec[i]) {
        spec += `<li class="list-group-item">${listSpec[i]}</li>`;
      }
    }
    return spec;
  }
}
</script>

<style lang="scss" scoped>
.specifiction-section {
  .specifiction-title {
    font-size: 20px;
    margin-bottom: 20px;
  }
  .list-group-item {
    &:first-child {
      border-radius: 0;
    }
    &:last-child {
      border-radius: 0;
    }
  }
  .specifiction-list {
    li {
      padding: 8px 15px;
      font-size: 14px;
      font-weight: 300;
      background: #f7f7f7;
      border-color: #ececec;
      color: #666666;
    }
    span {
      color: #333333;
      font-weight: 400;
    }
  }
}
.price-history-section {
  .price-history-title {
    font-size: 20px;
    margin-bottom: 20px;
  }
  .price-history-subtitle {
    font-size: 14px;
    font-weight: 300;
    margin-bottom: 20px;
  }
}
</style>
