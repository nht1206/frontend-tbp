<template>
  <b-modal id="logout-modal" title="Đăng xuất">
    <p class="my-4">
      Chọn "Đăng xuất" bên dưới nếu bạn muốn kết thúc phiên hiện tại của mình.
    </p>
    <template #modal-footer>
      <b-button
        variant="secondary"
        @click="$bvModal.hide('logout-modal')"
        class="float-right"
      >
        Hủy
      </b-button>
      <b-button variant="warning" @click="logout" class="float-right">
        Đăng xuất
      </b-button>
    </template>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  logout(): void {
    this.$store.dispatch("auth/logout");
    this.$bvModal.hide("logout-modal");
  }
}
</script>

<style scoped>
</style>