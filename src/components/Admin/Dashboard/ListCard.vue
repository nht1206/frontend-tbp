<template>
  <div class="row" v-if="overviewData">
    <SmallCard
      color="primary"
      title="Lượt truy cập (Tháng)"
      :content="overviewData.visitor + ' lượt'"
    >
      <template v-slot:icon>
        <i class="fas fa-eye fa-2x text-gray-300"></i>
      </template>
    </SmallCard>
    <SmallCard
      color="warning"
      title="Lượt tìm kiếm (Tháng)"
      :content="overviewData.search + ' lượt'"
    >
      <template v-slot:icon>
        <i class="fas fa-search fa-2x text-gray-300"></i>
      </template>
    </SmallCard>
    <SmallCard
      color="success"
      title="Người dùng"
      :content="overviewData.user + ' người'"
    >
      <template v-slot:icon>
        <i class="fas fa-users fa-2x text-gray-300"></i>
      </template>
    </SmallCard>
    <SmallCard
      color="info"
      title="Chủ cửa hàng"
      :content="overviewData.retailer + ' người'"
    >
      <template v-slot:icon>
        <i class="fas fa-users fa-2x text-gray-300"></i>
      </template>
    </SmallCard>
    <SmallCard
      color="danger"
      title="Sản phẩm"
      :content="overviewData.product + ' sản phẩm'"
    >
      <template v-slot:icon>
        <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
      </template>
    </SmallCard>
  </div>
</template>

<script lang="ts">
import statisticsService, {
  OverviewResponse,
} from "@/service/statistics-service";
import { Component, Vue } from "vue-property-decorator";
import SmallCard from "./SmallCard.vue";

@Component({ components: { SmallCard } })
export default class extends Vue {
  overviewData: OverviewResponse | null = null;

  created(): void {
    statisticsService.getOverviewStatistics().then((res) => {
      this.overviewData = res.data;
    });
  }
}
</script>

<style scoped>
</style>