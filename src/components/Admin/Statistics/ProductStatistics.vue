<template>
  <div>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Thống kê sản phẩm</h1>
    </div>

    <basic-card title="Biểu đồ lượt xem sản phẩm">
      <template v-slot:content>
        <b-form inline>
          <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-datepicker
              placeholder="Chọn ngày bắt đầu"
              locale="vi"
              v-model="startDate"
              :max="getNow()"
            ></b-form-datepicker>
          </b-input-group>

          <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-datepicker
              placeholder="Chọn ngày kết thúc"
              locale="vi"
              v-model="endDate"
              :max="getNow()"
              :min="startDate"
            ></b-form-datepicker>
          </b-input-group>

          <b-button variant="warning">Thống kê</b-button>
        </b-form>
        <bar-chart></bar-chart>
      </template>
    </basic-card>
    <basic-card title="Top 20 sản phẩm được xem nhiều nhất"></basic-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BasicCard from "../Card/BasicCard.vue";
import BarChart from "../Chart/BarChart.vue";

@Component({
  components: { BasicCard, BarChart },
})
export default class extends Vue {
  startDate = "";
  endDate = "";

  getNow(): Date {
    return new Date();
  }
}
</script>

<style scoped>
</style>