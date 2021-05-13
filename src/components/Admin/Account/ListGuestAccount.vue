<template>
  <div>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Danh sách tài khoản người dùng</h1>
      <router-link to="/tao-tai-khoan" custom v-slot="{ href, navigate }">
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
            :to="'/chinh-sua-tai-khoan/' + data.item.id"
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
      <template #cell(enable)="data">
        <b-form-checkbox
          @change="changeStatus(data.item.id)"
          :checked="data.item.enable"
          switch
          variant="warning"
        ></b-form-checkbox>
      </template>
    </b-table>
    <loading :isLoading="isLoading"></loading>
    <delete-account-confirm :id="selectedId"></delete-account-confirm>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import accountService from "@/service/account-service";
import DeleteAccountConfirm from "../Modal/DeleteAccountConfirm.vue";
import Loading from "@/components/Home/Loading.vue";

@Component({
  components: { DeleteAccountConfirm, Loading },
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
          key: "enable",
          label: "Trạng thái",
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
  isLoading = false;

  selectAccount(id: number) {
    this.selectedId = id;
  }

  changeStatus(id: number) {
    accountService.toggleStatus(id);
  }

  myProvider(ctx: { currentPage: number; perPage: number }, callback: any) {
    const params = "?page=" + (ctx.currentPage - 1) + "&size=" + ctx.perPage;
    this.isLoading = true;
    accountService
      .getListGuestAccount(params)
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
}
</script>

<style scoped>
</style>