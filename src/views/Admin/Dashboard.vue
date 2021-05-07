<template>
  <div>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
      <a
        href="#"
        class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        ><i class="fas fa-download fa-sm text-white-50"></i> Xuất báo cáo</a
      >
    </div>
    <list-card></list-card>
    <visit-chart></visit-chart>
  </div>
</template>

<script lang="ts">
import ListCard from "@/components/Admin/Dashboard/ListCard.vue";
import VisitChart from "@/components/Admin/Dashboard/VisitChart.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: { ListCard, VisitChart },
})
export default class extends Vue {}
</script>
