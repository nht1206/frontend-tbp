<template>
  <li class="nav-item" v-click-outside="close">
    <a
      class="nav-link"
      @click="toggle"
      toggle="collapse"
      :class="[{ collapsed: !open }]"
    >
      <slot name="icon"></slot>

      <span>{{ title }}</span>
    </a>
    <div id="collapseTwo" class="collapse" :class="{ show: open }">
      <div class="bg-white py-2 collapse-inner rounded">
        <h6 class="collapse-header">{{ subTitle }}</h6>
        <slot name="items"></slot>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ required: true })
  title!: string;
  @Prop({ required: true })
  subTitle!: string;

  open = false;

  toggle(): void {
    this.open = !this.open;
  }

  close(): void {
    this.open = false;
  }
}
</script>

<style lang="scss" scoped>
.nav-link {
  cursor: pointer;
}
.collapse {
  z-index: 999 !important;
}
</style>
