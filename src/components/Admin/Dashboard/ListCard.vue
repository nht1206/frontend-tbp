<template>
  <div class="row">
    <SmallCard
      color="primary"
      title="Lượt truy cập (Tháng)"
      content="13.500 lượt"
    >
      <template v-slot:icon>
        <i class="fas fa-eye fa-2x text-gray-300"></i>
      </template>
    </SmallCard>
    <SmallCard
      color="warning"
      title="Lượt tìm kiếm (Tháng)"
      content="13.500 lượt"
    >
      <template v-slot:icon>
        <i class="fas fa-search fa-2x text-gray-300"></i>
      </template>
    </SmallCard>
    <SmallCard color="success" title="Người dùng" content="500 người">
      <template v-slot:icon>
        <i class="fas fa-users fa-2x text-gray-300"></i>
      </template>
    </SmallCard>
    <SmallCard color="info" title="Chủ cửa hàng" content="50 người">
      <template v-slot:icon>
        <i class="fas fa-users fa-2x text-gray-300"></i>
      </template>
    </SmallCard>
    <SmallCard color="danger" title="Sản phẩm" content="1800 sản phẩm">
      <template v-slot:icon>
        <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
      </template>
    </SmallCard>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SmallCard from "./SmallCard.vue";

@Component({ components: { SmallCard } })
export default class extends Vue {}
</script>

<style scoped>
</style>