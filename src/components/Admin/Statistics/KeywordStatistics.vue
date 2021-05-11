<template>
  <div>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Thống kê từ khóa</h1>
    </div>
    <div class="d-sm-flex align-items-center justify-content-between">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
      <div class="d-sm-inline-block">
        <vue-monthly-picker
          v-model="selectedMonth"
          placeHolder="Chọn tháng"
          :max="getNow()"
        ></vue-monthly-picker>
      </div>
    </div>
    <b-table
      striped
      hover
      :busy="isLoading"
      :per-page="perPage"
      :current-page="currentPage"
      :items="myProvider"
      :fields="fields"
      :filter="{ month: selectedMonth, query: '' }"
    ></b-table>
    <loading :isLoading="isLoading"></loading>

    <basic-card title="Biểu đồ lượt tìm kiếm">
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
import { Component, Vue } from "vue-property-decorator";
import VueMonthlyPicker from "vue-monthly-picker";
import moment, { Moment } from "moment";
import Loading from "@/components/Home/Loading.vue";
import { ChartData, ChartOptions } from "chart.js";
import BasicCard from "../Card/BasicCard.vue";
import BarChart from "../Chart/BarChart.vue";

@Component({
  components: { VueMonthlyPicker, Loading, BasicCard, BarChart },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      fields: [
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
      ],
      date: {
        from: null,
        to: null,
        month: null,
        year: null,
      },
    };
  },
})
export default class extends Vue {
  rows = 0;

  selectedMonth: Moment | null = null;

  isLoading = false;
  isRenderingChart = false;

  startDate = "";
  endDate = "";

  error = "";

  getNow(): Moment {
    return moment();
  }

  getNowDate(): Date {
    return new Date();
  }

  myProvider(
    ctx: {
      currentPage: number;
      perPage: number;
      filter: { month: Moment; query: string };
    },
    callback: any
  ) {
    this.isLoading = true;
    let params =
      "?page=" +
      (ctx.currentPage - 1) +
      "&size=" +
      ctx.perPage +
      "&query=" +
      ctx.filter.query;
    if (ctx.filter.month) {
      params +=
        "&month=" +
        (moment(ctx.filter.month).month() + 1) +
        "&year=" +
        moment(ctx.filter.month).year();
    }
    statisticsService
      .getKeywordStatistics(params)
      .then((res) => {
        const items = res.data.content;
        if (res.data.totalElements) {
          this.rows = res.data.totalElements;
        }
        this.isLoading = false;
        callback(items);
      })
      .catch(() => {
        this.isLoading = false;
        callback([]);
      });

    return null;
  }

  renderChart() {
    this.isRenderingChart = true;
    statisticsService
      .getSearchCountData(
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
              label: "Lượt xem",
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
}
</script>

<style lang="scss">
.action-area {
  i {
    cursor: pointer;
    margin: 0 3px;
    color: #fea82f;
  }
}
.page-item.active .page-link {
  background-color: #fea82f;
  border-color: #fea82f;
}
</style>