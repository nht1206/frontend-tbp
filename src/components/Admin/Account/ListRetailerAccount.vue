<template>
  <div>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Quản lý tài khoản chủ cửa hàng</h1>
      <a
        v-b-modal.create-category-modal
        class="d-sm-inline-block btn btn-create"
      >
        Tạo mới tài khoản</a
      >
    </div>

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>

    <b-table
      striped
      hover
      responsive
      :current-page="currentPage"
      :per-page="perPage"
      :items="myProvider"
      :fields="fields"
    >
    </b-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import accountService from "@/service/account-service";

@Component({
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      fields: [
        {
          key: "id",
          label: "ID",
        },
        {
          key: "username",
          label: "Tên tài khoản",
        },
        {
          key: "fullName",
          label: "Tên đầy đủ",
        },
        {
          key: "address",
          label: "Địa chỉ",
        },
        {
          key: "email",
          label: "Địa chỉ email",
        },
        {
          key: "phoneNumber",
          label: "Số điện thoại",
        },
        {
          key: "registerDay",
          label: "Ngày đăng ký",
        },
        {
          key: "actions",
          label: "Hành động",
        },
      ],
    };
  },
})
export default class extends Vue {
  rows = 0;

  myProvider(ctx: { currentPage: number; perPage: number }, callback: any) {
    const params = "?page=" + (ctx.currentPage - 1) + "&size=" + ctx.perPage;
    accountService
      .getListRetailerAccount(params)
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

<style scoped>
</style>