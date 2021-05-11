<template>
  <div class="row">
    <div class="col-12">
      <BasicCard title="Thống kê từ khóa được tìm kiếm nhiều nhất">
        <template v-slot:content>
          <b-table
            :busy="isLoading"
            striped
            hover
            :items="items"
            :fields="fields"
          ></b-table>
          <loading :isLoading="isLoading"></loading>
        </template>
      </BasicCard>
    </div>
  </div>
</template>

<script lang="ts">
import Loading from "@/components/Home/Loading.vue";
import statisticsService, {
  KeywordStatisticsResponse,
} from "@/service/statistics-service";
import { Component, Vue } from "vue-property-decorator";
import BasicCard from "../Card/BasicCard.vue";

@Component({
  components: { BasicCard, Loading },
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

  isLoading = false;

  created(): void {
    this.isLoading = true;
    statisticsService
      .getKeywordStatistics()
      .then((res) => {
        this.isLoading = false;
        this.items = res.data.content;
      })
      .catch(() => {
        this.isLoading = false;
      });
  }
}
</script>

<style scoped>
</style>