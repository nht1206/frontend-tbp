<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h4">Danh sách banner</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <router-link to="/tao-banner" custom v-slot="{ navigate }">
          <button @click="navigate" type="button" class="btn btn-create">
            Tạo mới banner
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
      <template #cell(redirectUrl)="data">
        <a :href="data.item.redirectUrl" target="_blank">{{
          data.item.redirectUrl
        }}</a>
      </template>
      <template #cell(actions)="data">
        <div class="action-area">
          <router-link
            :to="'/chinh-sua-banner/' + data.item.id"
            custom
            v-slot="{ navigate }"
            ><i title="Chỉnh sửa" @click="navigate" class="fas fa-edit"></i
          ></router-link>
          <i
            title="Xóa"
            v-b-modal.delete-banner-confirm-modal
            @click="selectBanner(data.item.id)"
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
    <delete-banner-confirm-modal
      :id="selectedId"
      @deleted="onDeleted"
    ></delete-banner-confirm-modal>
    <loading :isLoading="isLoading"></loading>
  </div>
</template>

<script lang="ts">
import Loading from "@/components/Home/Loading.vue";
import bannerService from "@/service/banner-service";
import { Component, Vue } from "vue-property-decorator";
import DeleteBannerConfirmModal from "../Modal/DeleteBannerConfirmModal.vue";

@Component({
  components: { Loading, DeleteBannerConfirmModal },
  data() {
    return {
      fields: [
        {
          key: "id",
          label: "ID",
        },
        {
          key: "title",
          label: "Tiêu đề",
        },
        {
          key: "redirectUrl",
          label: "Liên kết",
        },
        {
          key: "enable",
          label: "Trạng thái",
          tdClass: "status",
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

  selectBanner(id: number) {
    this.selectedId = id;
  }

  refreshTable() {
    (this.$refs.table as any).refresh();
  }

  onDeleted(id: number | null) {
    if (id) {
      (this.$refs.table as any).refresh();
    }
  }

  myProvider(ctx: { currentPage: number; perPage: number }, callback: any) {
    const params = "?page=" + (ctx.currentPage - 1) + "&size=" + ctx.perPage;
    this.isLoading = true;
    bannerService
      .getAllBanner(params)
      .then((res) => {
        const items = res.data.content;
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