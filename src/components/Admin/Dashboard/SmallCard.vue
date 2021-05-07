<template>
  <div class="col-xl-3 col-md-6 mb-4">
    <div class="card shadow h-100 py-2" :class="['border-left-' + color]">
      <div class="card-body">
        <div class="row no-gutters align-items-center">
          <div class="col mr-2">
            <div
              class="text-xs font-weight-bold text-uppercase mb-1"
              :class="['text-' + color]"
            >
              {{ title }}
            </div>
            <div class="h5 mb-0 font-weight-bold text-gray-800">
              {{ content }}
            </div>
          </div>
          <div class="col-auto">
            <slot name="icon"></slot>
          </div>
        </div>
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
  @Prop({ required: true })
  content!: string;
  @Prop({ required: true })
  color!: string;
}
</script>

<style scoped>
</style>