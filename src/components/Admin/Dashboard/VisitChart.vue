<template>
  <div class="row">
    <div class="col-xl-8 col-lg-7">
      <LargeCard v-if="!!lineData" title="Tổng quan lược truy cập">
        <template v-slot:content>
          <line-chart
            :options="lineChartOptions"
            :chartData="lineData"
          ></line-chart>
        </template>
      </LargeCard>
    </div>
    <div class="col-xl-4 col-lg-5">
      <LargeCard title="Tỉ lệ người truy cập có tài khoản">
        <template v-slot:content>
          <pie-chart
            :options="pieChartOptions"
            :chartData="pieData"
          ></pie-chart>
        </template>
      </LargeCard>
    </div>
  </div>
</template>

<script lang="ts">
import statisticsService from "@/service/statistics-service";
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

  lineChartOptions: ChartOptions = {
    ...this.options,
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            maxTicksLimit: 7,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            maxTicksLimit: 5,
            padding: 0,
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return value + " lượt";
            },
            beginAtZero: true,
          },
          gridLines: {
            color: "rgb(234, 236, 244)",
            zeroLineColor: "rgb(234, 236, 244)",
            drawBorder: false,
            borderDash: [2],
            zeroLineBorderDash: [2],
          },
        },
      ],
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      titleMarginBottom: 10,
      titleFontColor: "#6e707e",
      titleFontSize: 14,
      borderColor: "#dddfeb",
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      intersect: false,
      mode: "index",
      caretPadding: 10,
    },
  };

  pieChartOptions: ChartOptions = {
    ...this.options,
    cutoutPercentage: 80,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: "#dddfeb",
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
  };

  lineData: ChartData | null = null;

  pieData: ChartData | null = null;

  created(): void {
    statisticsService.getVisitStatistics().then((res) => {
      console.log(res.data.rateUser);
      this.lineData = {
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
            backgroundColor: "rgba(78, 115, 223, 0.3)",
            borderColor: "rgba(78, 115, 223, 1)",
            pointRadius: 3,
            pointBackgroundColor: "rgba(78, 115, 223, 1)",
            pointBorderColor: "rgba(78, 115, 223, 1)",
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
            pointHoverBorderColor: "rgba(78, 115, 223, 1)",
            pointHitRadius: 10,
            pointBorderWidth: 2,
            data: res.data.statisticAccess,
          },
          {
            label: "Lượt tìm kiếm",
            lineTension: 0.3,
            backgroundColor: "rgba(106, 90, 205, 0.3)",
            borderColor: "rgba(106, 90, 205, 1)",
            pointRadius: 3,
            pointBackgroundColor: "rgba(106, 90, 205, 1)",
            pointBorderColor: "rgba(106, 90, 205, 1)",
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(106, 90, 205, 1)",
            pointHoverBorderColor: "rgba(106, 90, 205, 1)",
            pointHitRadius: 10,
            pointBorderWidth: 2,
            data: res.data.statisticSearch,
          },
        ],
      };

      this.pieData = {
        labels: ["Khách vãng lai", "Người dùng"],
        datasets: [
          {
            data: [res.data.rateUser.anonymous, res.data.rateUser.auth],
            backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc"],
            hoverBackgroundColor: ["#2e59d9", "#17a673", "#2c9faf"],
            hoverBorderColor: "rgba(234, 236, 244, 1)",
          },
        ],
      };
    });
  }
}
</script>

<style scoped>
</style>