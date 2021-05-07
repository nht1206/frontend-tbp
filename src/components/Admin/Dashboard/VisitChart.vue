<template>
  <div class="row">
    <div class="col-xl-8 col-lg-7">
      <LargeCard title="Tổng quan lược truy cập">
        <template v-slot:content>
          <line-chart :options="options" :chartData="lineData"></line-chart>
        </template>
      </LargeCard>
    </div>
    <div class="col-xl-4 col-lg-5">
      <LargeCard title="Tỉ lệ người truy cập có tài khoản">
        <template v-slot:content>
          <pie-chart :options="options" :chartData="pieData"></pie-chart>
        </template>
      </LargeCard>
    </div>
  </div>
</template>

<script lang="ts">
import { ChartData, ChartOptions } from "chart.js";
import { Component, Vue } from "vue-property-decorator";
import LineChart from "../Chart/LineChart.vue";
import PieChart from "../Chart/PieChart.vue";
import LargeCard from "./LargeCard.vue";

@Component({ components: { LargeCard, LineChart, PieChart } })
export default class extends Vue {
  options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  lineData: ChartData = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    datasets: [
      {
        label: "Lượt truy cập",
        lineTension: 0.3,
        backgroundColor: "rgba(78, 115, 223, 0.05)",
        borderColor: "rgba(78, 115, 223, 1)",
        pointRadius: 3,
        pointBackgroundColor: "rgba(78, 115, 223, 1)",
        pointBorderColor: "rgba(78, 115, 223, 1)",
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
        pointHoverBorderColor: "rgba(78, 115, 223, 1)",
        pointHitRadius: 10,
        pointBorderWidth: 2,
        data: [520, 750, 442, 542, 904, 1045, 1201, 1244, 1202, 1520, 1724],
      },
      {
        label: "Lượt tìm kiếm",
        lineTension: 0.3,
        backgroundColor: "rgba(106, 90, 205, 0.05)",
        borderColor: "rgba(106, 90, 205, 1)",
        pointRadius: 3,
        pointBackgroundColor: "rgba(106, 90, 205, 1)",
        pointBorderColor: "rgba(106, 90, 205, 1)",
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "rgba(106, 90, 205, 1)",
        pointHoverBorderColor: "rgba(106, 90, 205, 1)",
        pointHitRadius: 10,
        pointBorderWidth: 2,
        data: [250, 852, 521, 852, 752, 1243, 1324, 1452, 1521, 1352, 1725],
      },
    ],
  };

  pieData: ChartData = {
    labels: ["Khách vãng lai", "Người dùng"],
    datasets: [
      {
        data: [66, 34],
        backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc"],
        hoverBackgroundColor: ["#2e59d9", "#17a673", "#2c9faf"],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      },
    ],
  };
}
</script>

<style scoped>
</style>