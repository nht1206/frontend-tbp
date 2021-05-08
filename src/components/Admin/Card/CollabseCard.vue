<template>
  <div class="card shadow mb-4">
    <a class="d-block card-header py-3" toggle="collapse" role="button">
      <h6 class="m-0 font-weight-bold text-primary">
        {{ title }}
      </h6>
    </a>
    <div class="collapse show">
      <div class="card-body">
        <slot name="dropdown-menu"></slot>
      </div>
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

<style scoped>
</style>