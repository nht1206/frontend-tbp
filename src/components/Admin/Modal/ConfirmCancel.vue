<template>
  <b-modal id="logout-modal" title="Bạn muốn hủy dữ liệu đang nhập?">
    <template #modal-footer>
      <b-button
        variant="secondary"
        @click="$bvModal.hide('logout-modal')"
        class="float-right"
      >
        Quay lại
      </b-button>
      <b-button variant="warning" @click="confirm" class="float-right">
        Xác nhận
      </b-button>
    </template>
  </b-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ required: true, type: String })
  to!: string;
  confirm(): void {
    this.$router.push(this.to);
    this.$bvModal.hide("logout-modal");
  }
}
</script>

<style scoped>
</style>