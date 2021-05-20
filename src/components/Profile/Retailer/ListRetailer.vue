<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h4">Danh sách cửa hàng của bạn</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <router-link to="/dang-ky-cua-hang" custom v-slot="{ navigate }">
          <button @click="navigate" type="button" class="btn btn-create">
            Đăng ký cửa hàng mới
          </button>
        </router-link>
      </div>
    </div>
    <b-table
      striped
      hover
      responsive
      :items="myProvider"
      :fields="fields"
      ref="table"
    >
      <template #cell(name)="data">
        <a :href="data.item.homePage" target="_blank">{{ data.item.name }}</a>
      </template>
      <template #cell(logoImage)="data">
        <img
          class="logo"
          :src="data.item.logoImage"
          :alt="data.item.description"
        />
      </template>
      <template #cell(actions)="data">
        <div class="action-area">
          <router-link
            :to="'/chinh-sua-cua-hang/' + data.item.id"
            custom
            v-slot="{ navigate }"
            ><i title="Chỉnh sửa" @click="navigate" class="fas fa-edit"></i
          ></router-link>
          <i
            title="Xóa"
            v-b-modal.delete-retailer-confirm-modal
            @click="selectRetailer(data.item.id)"
            class="fas fa-trash-alt"
          ></i>
        </div>
      </template>
      <template #cell(enable)="data">
        <p :class="{ active: data.item.enable }">
          {{ getStatus(data.item.enable) }}
        </p>
      </template>
      <template #cell(approve)="data">
        <p :class="{ active: data.item.enable }">
          {{ getApproveStatus(data.item.enable) }}
        </p>
      </template>
    </b-table>
    <delete-retailer-confirm-modal
      :id="selectedId"
      @deleted="onDeleted"
    ></delete-retailer-confirm-modal>
    <loading :isLoading="isLoading"></loading>
  </div>
</template>

<script lang="ts">
import DeleteRetailerConfirmModal from "@/components/Admin/Modal/DeleteRetailerConfirmModal.vue";
import Loading from "@/components/Home/Loading.vue";
import retailerService from "@/service/retailer-service";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: { DeleteRetailerConfirmModal, Loading },
  data() {
    return {
      fields: [
        {
          key: "id",
          label: "ID",
        },
        {
          key: "name",
          label: "Tên nhà bán lẻ",
        },
        {
          key: "logoImage",
          label: "Logo",
        },
        {
          key: "enable",
          label: "Trạng thái",
          tdClass: "status",
        },
        {
          key: "approve",
          label: "Trạng thái duyệt",
          tdClass: "approve",
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
  selectedId = 0;
  isLoading = false;

  selectRetailer(id: number) {
    this.selectedId = id;
  }

  getStatus(enable: boolean) {
    if (enable) {
      return "On";
    } else {
      return "Off";
    }
  }

  getApproveStatus(enable: boolean) {
    if (enable) {
      return "Đã duyệt";
    } else {
      return "Đang đợi";
    }
  }

  onDeleted(id: number | null) {
    if (id) {
      (this.$refs.table as any).refresh();
    }
  }

  myProvider(ctx: { currentPage: number; perPage: number }, callback: any) {
    const params = "?page=" + (ctx.currentPage - 1) + "&size=" + ctx.perPage;
    this.isLoading = true;
    retailerService
      .getUserRetailers(params)
      .then((res) => {
        const items = res.data;
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

<style lang="scss" scoped>
.logo {
  max-height: 40px;
}

.status {
  p {
    color: gray;
  }
  p.active {
    color: greenyellow;
  }
}

.approve {
  p.active {
    color: gray;
  }
  p {
    color: greenyellow;
  }
}
</style>