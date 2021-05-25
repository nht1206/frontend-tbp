<template>
  <div class="btn-group" role="group">
    <div class="btn-group" role="group">
      <button
        type="button"
        class="btn dropdown-toggle"
        @click="toggle"
        v-click-outside="close"
      >
        <i class="d-none d-sm-inline d-md-none fas fa-user"></i>
        <p class="d-sm-none d-md-inline">{{ title }}</p>
      </button>
      <div class="dropdown-menu" :class="[{ show: isOpen }]">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ type: String, default: "" })
  title!: string;

  @Prop({ type: Boolean, default: false })
  right!: boolean;

  isOpen = false;

  toggle(): void {
    this.isOpen = !this.isOpen;
    this.$emit("change", this.isOpen);
  }

  close(): void {
    this.isOpen = false;
    this.$emit("change", false);
  }
}
</script>

<style lang="scss" scoped>
.dropdown-toggle:first-child {
  margin-right: 10px;
}
.dropdown-toggle:hover {
  background: #f3f3f3;
  color: #ff9800;
}
.dropdown-menu {
  border-radius: 0;
  z-index: 999999;
  a {
    padding: 0 10px 4px;
  }
  .dropdown-item:hover {
    background: #f3f3f3;
    color: #ff9800;
  }
  .dropdown-item:active {
    background-color: #ff9800;
  }
}
</style>
