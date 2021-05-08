<template>
  <div class="card shadow mb-4">
    <!-- Card Header - Dropdown -->
    <div
      class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
    >
      <h6 class="m-0 font-weight-bold text-primary">{{ title }}</h6>
    </div>
    <!-- Card Body -->
    <div class="card-body">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ required: true })
  title!: string;
}
</script>

<style lang="scss">
.chart-area {
  > div {
    height: inherit;
  }
}
</style>