<template>
  <div>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Thống kê lượt truy cập</h1>
    </div>

    <basic-card title="Biểu đồ lượt truy cập">
      <template v-slot:content>
        <b-form inline>
          <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-datepicker
              placeholder="Chọn ngày bắt đầu"
              locale="vi"
              v-model="startDate"
              :max="getNowDate()"
            ></b-form-datepicker>
          </b-input-group>

          <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-datepicker
              placeholder="Chọn ngày kết thúc"
              locale="vi"
              v-model="endDate"
              :max="getNowDate()"
              :min="startDate"
            ></b-form-datepicker>
          </b-input-group>

          <b-button
            :disabled="isRenderingChart"
            variant="warning"
            @click="renderChart"
            >Thống kê</b-button
          >
        </b-form>

        <div v-show="!!error" class="alert alert-danger mt-2">
          {{ error }}
        </div>

        <div class="chart-area">
          <loading :isLoading="isRenderingChart"></loading>
          <bar-chart
            v-if="!!barData"
            :options="options"
            :chartData="barData"
          ></bar-chart>
        </div>
      </template>
    </basic-card>
  </div>
</template>

<script lang="ts">
import statisticsService from "@/service/statistics-service";
import { ChartData, ChartOptions } from "chart.js";
import moment, { Moment } from "moment";
import { Component, Vue } from "vue-property-decorator";
import BasicCard from "../Card/BasicCard.vue";
import BarChart from "../Chart/BarChart.vue";
import Loading from "@/components/Home/Loading.vue";

@Component({
  components: {
    BasicCard,
    BarChart,
    Loading,
  },
})
export default class extends Vue {
  isRenderingChart = false;
  isLoadingMore = false;

  startDate = "";
  endDate = "";

  error = "";

  renderChart() {
    this.isRenderingChart = true;
    statisticsService
      .getTrafficData(
        `?startDay=${moment(this.startDate).format(
          "DD/MM/yyyy"
        )}&endDay=${moment(this.endDate).format("DD/MM/yyyy")}`
      )
      .then((res) => {
        this.error = "";
        this.barData = {
          labels: this.getDateLabels(
            moment(this.startDate),
            moment(this.endDate)
          ),
          datasets: [
            {
              label: "Lượt truy cập",
              lineTension: 0.3,
              backgroundColor: "rgba(78, 115, 223, 0.5)",
              borderColor: "rgba(78, 115, 223, 1)",
              pointRadius: 3,
              pointBackgroundColor: "rgba(78, 115, 223, 1)",
              pointBorderColor: "rgba(78, 115, 223, 1)",
              pointHoverRadius: 3,
              pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
              pointHoverBorderColor: "rgba(78, 115, 223, 1)",
              pointHitRadius: 10,
              pointBorderWidth: 2,
              data: res.data,
            },
          ],
        };
        this.isRenderingChart = false;
      })
      .catch((err) => {
        this.isRenderingChart = false;
        this.error = err.response.data.message;
      });
  }

  getDateLabels(startDate: Moment, endDate: Moment): string[] {
    var now = startDate.clone(),
      dates: string[] = [];

    while (now.isSameOrBefore(endDate)) {
      dates.push(now.format("DD/MM/YYYY"));
      now.add(1, "days");
    }
    return dates;
  }

  options: ChartOptions = {
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
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

  barData: ChartData | null = null;

  getNowDate(): Date {
    return new Date();
  }
}
</script>
