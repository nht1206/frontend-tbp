<template>
  <div>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
      <button
        :disabled="isDownloading"
        @click="downloadReport"
        class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
      >
        <i
          v-if="!isDownloading"
          class="fas fa-download fa-sm text-white-50"
        ></i>
        <div
          v-if="isDownloading"
          class="spinner-border spinner-border-sm"
          role="status"
        >
          <span class="visually-hidden"></span>
        </div>
        Xuất báo cáo
      </button>
    </div>
    <list-card></list-card>
    <visit-chart></visit-chart>
    <keyword-table></keyword-table>
  </div>
</template>

<script lang="ts">
import KeywordTable from "@/components/Admin/Dashboard/KeywordTable.vue";
import ListCard from "@/components/Admin/Dashboard/ListCard.vue";
import VisitChart from "@/components/Admin/Dashboard/VisitChart.vue";
import statisticsService from "@/service/statistics-service";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: { ListCard, VisitChart, KeywordTable },
})
export default class extends Vue {
  isDownloading = false;
  downloadReport() {
    this.isDownloading = true;
    statisticsService
      .downloadReport()
      .then((res) => {
        this.isDownloading = false;
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "resport.xlsx");
        document.body.appendChild(link);
        link.click();
      })
      .catch(() => {
        this.isDownloading = false;
      });
  }
}
</script>
