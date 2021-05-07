<template>
  <div class="row">
    <div class="col-12">
      <large-card title="Thống kê từ khóa được tìm kiếm">
        <template v-slot:content>
          <b-table striped hover :items="items" :fields="fields"></b-table>
        </template>
      </large-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LargeCard from "./LargeCard.vue";

@Component({
  components: { LargeCard },
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
      key: "count",
      label: "Số lần được tìm kiếm",
      sortable: true,
    },
  ];
  items = [
    { id: 1, keyword: "Dickerson", count: 250 },
    { id: 2, keyword: "Larsen", count: 253 },
    { id: 3, keyword: "Geneva", count: 520 },
    { id: 4, keyword: "Jami", count: 254 },
  ];
}
</script>

<style scoped>
</style>