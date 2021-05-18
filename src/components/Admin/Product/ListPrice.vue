<template>
  <div>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Danh sách giá sản phẩm</h1>
      <router-link to="/them-nha-ban-le" custom v-slot="{ href, navigate }">
        <a
          :href="href"
          @click="navigate"
          class="d-sm-inline-block btn btn-create"
        >
          Thêm giá mới</a
        >
      </router-link>
    </div>

    <b-table
      striped
      hover
      responsive
      :items="myProvider"
      :fields="fields"
      ref="table"
    >
      <template #cell(retailer)="data">
        <a :href="data.item.retailer.homePage" target="_blank">{{
          data.item.retailer.name
        }}</a>
      </template>
      <template #cell(urlProduct)="data">
        <a :href="data.item.urlProduct" target="_blank">{{
          data.item.urlProduct
        }}</a>
      </template>
      <template #cell(latestPrice)="data">
        <strong class="active-color"
          ><u>{{ formatPrice(data.item.latestPrice) }} VNĐ</u></strong
        >
      </template>
      <template #cell(actions)="data">
        <div class="action-area">
          <router-link
            :to="'/chinh-sua-gia/' + data.item.productRetailerId"
            custom
            v-slot="{ navigate }"
            ><i title="Chỉnh sửa" @click="navigate" class="fas fa-edit"></i
          ></router-link>
          <i
            title="Xóa"
            v-b-modal.delete-price-confirm-modal
            @click="selectPrice(data.item.productRetailerId)"
            class="fas fa-trash-alt"
          ></i>
        </div>
      </template>
      <template #cell(enable)="data">
        <b-form-checkbox
          @change="changeStatus(data.item.productRetailerId)"
          :checked="data.item.enable"
          switch
          variant="warning"
        ></b-form-checkbox>
      </template>
      <template #cell(approve)="data">
        <div>
          <p v-if="data.item.approve">Đã duyệt</p>
          <button
            @click="approvePrice"
            class="btn btn-create"
            v-if="!data.item.approve"
          >
            Duyệt
          </button>
        </div>
      </template>
    </b-table>
    <delete-price-confirm-modal
      :id="selectedId"
      @deleted="onDeleted"
    ></delete-price-confirm-modal>
    <loading :isLoading="isLoading"></loading>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Loading from "@/components/Home/Loading.vue";
import DeletePriceConfirmModal from "../Modal/DeletePriceConfirmModal.vue";
import priceService from "@/service/price-service";

@Component({
  components: { Loading, DeletePriceConfirmModal },
  data() {
    return {
      fields: [
        {
          key: "productRetailerId",
          label: "ID",
        },
        {
          key: "retailer",
          label: "Tên nhà bán lẻ",
        },
        {
          key: "latestPrice",
          label: "Giá",
        },
        {
          key: "urlProduct",
          label: "Đường dẩn",
        },
        {
          key: "enable",
          label: "Trạng thái",
        },
        {
          key: "approve",
          label: "Trạng thái duyệt",
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

  productId!: string;

  formatPrice(price: number): string {
    return Intl.NumberFormat().format(price);
  }

  selectPrice(id: number) {
    this.selectedId = id;
  }

  changeStatus(id: number) {
    priceService.togglePriceStatus(id);
  }

  approvePrice(id: number) {
    priceService.approvePrice(id).then(() => {
      (this.$refs.table as any).refresh();
    });
  }

  onDeleted(id: number | null) {
    if (id) {
      (this.$refs.table as any).refresh();
    }
  }

  myProvider(ctx: { currentPage: number; perPage: number }, callback: any) {
    this.isLoading = true;
    priceService
      .getListPrice(this.productId)
      .then((res) => {
        this.isLoading = false;
        const items = res.data;
        callback(items);
      })
      .catch(() => {
        this.isLoading = false;
        callback([]);
      });

    return null;
  }

  created() {
    this.productId = this.$route.params["id"];
  }
}
</script>

<style lang="scss" scoped>
.logo {
  max-height: 40px;
}
</style>