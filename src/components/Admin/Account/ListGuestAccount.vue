<template>
  <div>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Quản lý tài khoản người dùng</h1>
      <router-link
        to="/tao-tai-khoan-nguoi-dung"
        custom
        v-slot="{ href, navigate }"
      >
        <a
          :href="href"
          @click="navigate"
          class="d-sm-inline-block btn btn-create"
        >
          Tạo mới tài khoản</a
        >
      </router-link>
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
      <template #cell(actions)="data">
        <div class="action-area">
          <router-link
            :to="'/chinh-sua-tai-khoan-nguoi-dung/' + data.item.id"
            custom
            v-slot="{ navigate }"
            ><i @click="navigate" class="fas fa-edit"></i
          ></router-link>
          <i
            @click="
              selectAccount(data.item.id) &
                $bvModal.show('delete-account-confirm-modal')
            "
            class="fas fa-trash-alt"
          ></i>
        </div>
      </template>
    </b-table>
    <delete-account-confirm :id="selectedId"></delete-account-confirm>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import accountService from "@/service/account-service";
import DeleteAccountConfirm from "../Modal/DeleteAccountConfirm.vue";

@Component({
  components: { DeleteAccountConfirm },
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

  selectedId = 0;

  selectAccount(id: number) {
    this.selectedId = id;
  }

  myProvider(ctx: { currentPage: number; perPage: number }, callback: any) {
    const params = "?page=" + (ctx.currentPage - 1) + "&size=" + ctx.perPage;
    accountService
      .getListGuestAccount(params)
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