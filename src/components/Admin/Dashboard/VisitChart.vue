<template>
  <div class="row">
    <div class="col-xl-8 col-lg-7">
      <LargeCard title="Tổng quan lược truy cập">
        <template v-slot:content>
          <loading :isLoading="isRenderingChart"></loading>
          <line-chart
            v-if="!!lineData"
            :options="lineChartOptions"
            :chartData="lineData"
          ></line-chart>
        </template>
        <template v-slot:dropdown-menu>
          <div class="dropdown-header">Dropdown Header:</div>
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </template>
      </LargeCard>
    </div>
    <div class="col-xl-4 col-lg-5">
      <BasicCard title="Tỉ lệ người truy cập có tài khoản">
        <template v-slot:content>
          <loading :isLoading="isRenderingChart"></loading>
          <pie-chart
            v-if="!!pieData"
            :options="pieChartOptions"
            :chartData="pieData"
          ></pie-chart>
        </template>
      </BasicCard>
    </div>
  </div>
</template>

<script lang="ts">
import statisticsService from "@/service/statistics-service";
import { ChartData, ChartOptions } from "chart.js";
import { Component, Vue } from "vue-property-decorator";
import BasicCard from "../Card/BasicCard.vue";
import LineChart from "../Chart/LineChart.vue";
import PieChart from "../Chart/PieChart.vue";
import LargeCard from "../Card/DropdownCard.vue";
import Loading from "@/components/Home/Loading.vue";

@Component({
  components: { LargeCard, LineChart, PieChart, BasicCard, Loading },
})
export default class extends Vue {
  isRenderingChart = false;
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
    this.isRenderingChart = true;
    statisticsService
      .getVisitStatistics()
      .then((res) => {
        this.isRenderingChart = false;
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
              backgroundColor: "rgba(78, 115, 223, 0.2)",
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
              backgroundColor: "rgba(106, 90, 205, 0.2)",
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
            {
              label: "Lượt xem sản phẩm",
              lineTension: 0.3,
              backgroundColor: "rgba(238, 130, 238, 0.2)",
              borderColor: "rgba(238, 130, 238, 1)",
              pointRadius: 3,
              pointBackgroundColor: "rgba(238, 130, 238, 1)",
              pointBorderColor: "rgba(238, 130, 238, 1)",
              pointHoverRadius: 3,
              pointHoverBackgroundColor: "rgba(238, 130, 238, 1)",
              pointHoverBorderColor: "rgba(238, 130, 238, 1)",
              pointHitRadius: 10,
              pointBorderWidth: 2,
              data: res.data.statisticViewCount,
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
      })
      .catch(() => {
        this.isRenderingChart = false;
      });
  }
}
</script>

<style scoped>
</style>