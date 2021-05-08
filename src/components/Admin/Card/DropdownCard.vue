<template>
  <div class="card shadow mb-4">
    <!-- Card Header - Dropdown -->
    <div
      class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
    >
      <h6 class="m-0 font-weight-bold text-primary">{{ title }}</h6>
      <div class="dropdown no-arrow" v-click-outside="close">
        <a
          class="dropdown-toggle"
          role="button"
          toggle="dropdown"
          @click="toggle"
        >
          <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
        </a>
        <div
          class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
          :class="{ show: dropdownOpen }"
          aria-labelledby="dropdownMenuLink"
        >
          <slot name="dropdown-menu"></slot>
        </div>
      </div>
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

  dropdownOpen = false;

  toggle(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  close(): void {
    this.dropdownOpen = false;
  }
}
</script>

<style lang="scss">
.chart-area {
  > div {
    height: inherit;
  }
}
.dropdown-toggle {
  cursor: pointer;
}
</style>