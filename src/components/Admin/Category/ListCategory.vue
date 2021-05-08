<template>
  <div>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Quản lý danh mục</h1>
      <a href="#" class="d-sm-inline-block btn btn-create"> Tạo mới danh mục</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.btn-create {
  background-color: #fea82f;
  color: aliceblue;
}
</style>