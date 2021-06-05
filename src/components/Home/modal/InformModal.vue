<template>
  <b-modal id="inform-modal" title="Thông báo">
    <p class="my-4">{{ message }}</p>
    <template #modal-footer>
      <b-button
        variant="secondary"
        @click="$bvModal.hide('inform-modal')"
        class="float-right"
      >
        Đóng
      </b-button>
    </template>
  </b-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ required: true, type: String })
  message!: string;
}
</script>

<style scoped>
</style>