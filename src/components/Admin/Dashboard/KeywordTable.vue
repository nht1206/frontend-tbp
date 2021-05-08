<template>
  <div class="row">
    <div class="col-12">
      <BasicCard title="Thống kê từ khóa được tìm kiếm nhiều nhất">
        <template v-slot:content>
          <b-table striped hover :items="items" :fields="fields"></b-table>
        </template>
      </BasicCard>
    </div>
  </div>
</template>

<script lang="ts">
import statisticsService, {
  KeywordStatisticsResponse,
} from "@/service/statistics-service";
import { Component, Vue } from "vue-property-decorator";
import BasicCard from "../Card/BasicCard.vue";

@Component({
  components: { BasicCard },
})
export default class extends Vue {
  fields = [
    {
      key: "id",
      label: "ID",
      sortable: true,
    },
    {
      key: "keyword",
      label: "Từ khóa",
    },
    {
      key: "numberOfSearch",
      label: "Số lần được tìm kiếm",
      sortable: true,
    },
  ];

  items: KeywordStatisticsResponse[] = [];

  created(): void {
    statisticsService.getKeywordStatistics().then((res) => {
      this.items = res.data.content;
    });
  }
}
</script>

<style scoped>
</style>