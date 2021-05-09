<template>
  <div class="retailer-account">
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
      :items="myProvider"
      :fields="fields"
      :filter="selectedMonth"
    ></b-table>
  </div>
</template>

<script lang="ts">
import statisticsService from "@/service/statistics-service";
import { Component, Vue } from "vue-property-decorator";
import VueMonthlyPicker from "vue-monthly-picker";
import moment, { Moment } from "moment";

@Component({
  components: { VueMonthlyPicker },
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

  getNow(): Moment {
    return moment();
  }

  myProvider(
    ctx: { currentPage: number; perPage: number; filter: Moment },
    callback: any
  ) {
    const params = "?page=" + (ctx.currentPage - 1) + "&size=" + ctx.perPage;
    statisticsService
      .getKeywordStatistics(params)
      .then((res) => {
        const items = res.data.content;
        if (res.data.totalElements) {
          this.rows = res.data.totalElements;
        }
        callback(items);
      })
      .catch(() => {
        callback([]);
      });

    return null;
  }
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