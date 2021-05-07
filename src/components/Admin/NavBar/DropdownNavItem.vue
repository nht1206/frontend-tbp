<template>
  <li class="nav-item dropdown no-arrow" :class="{ show }">
    <a
      class="nav-link dropdown-toggle"
      href="#"
      @click="toggle"
      toggle="dropdown"
      v-click-outside="close"
    >
      <slot name="title"></slot>
    </a>
    <div
      class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
      :class="[{ show }, ...menuClasses]"
    >
      <slot name="items"></slot>
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ required: false })
  menuClasses!: string[];

  show = false;
  toggle(): void {
    this.show = !this.show;
  }

  close(): void {
    this.show = false;
  }
}
</script>

<style scoped>
</style>