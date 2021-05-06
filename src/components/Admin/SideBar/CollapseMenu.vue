<template>
  <li class="nav-item">
    <a class="nav-link" @click="toggle" :class="[{ collapsed: !open }]">
      <i class="fa fa-fw fa-cog"></i>
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
}
</script>

<style lang="scss" scoped>
.nav-link {
  cursor: pointer;
}
</style>
