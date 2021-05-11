<template>
  <b-modal id="login-inform-modal" title="Thông báo">
    <p class="my-4">Bạn cần đăng nhập để sử dụng chức năng này</p>
    <template #modal-footer>
      <b-button
        variant="secondary"
        @click="$bvModal.hide('login-inform-modal')"
        class="float-right"
      >
        Đóng
      </b-button>
    </template>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {}
</script>

<style scoped>
</style>