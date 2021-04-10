<template>
  <div class="btn-group" role="group">
    <div class="btn-group" role="group">
      <button
        type="button"
        class="btn dropdown-toggle"
        @click="toggle"
        v-click-outside="close"
      >
        {{ title }}
      </button>
      <div
        class="dropdown-menu"
        :class="[{ show: isOpen }, { 'dropdown-menu-right': right }]"
      >
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
.dropdown-toggle {
  padding: 0px;
  background: transparent;
  border-color: transparent;
  color: #666;
  font-size: 12px;
  margin-left: 10px;
  margin-top: 2px;
  cursor: pointer;
}
.dropdown-toggle:first-child {
  margin-right: 10px;
}
.dropdown-menu {
  border-radius: 0;
  z-index: 999999;
  a {
    padding: 0 10px 4px;
  }
  .dropdown-item:hover {
    background: #f3f3f3;
  }
  .dropdown-item:active {
    background-color: #ff9800;
  }
}
</style>