<template>
  <div>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Danh sách giá sản phẩm chưa duyệt</h1>
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
      ref="table"
    >
      <template #cell(retailer)="data">
        <a :href="data.item.retailer.homePage" target="_blank">{{
          data.item.retailer.name
        }}</a>
      </template>
      <template #cell(productTitle)="data">
        <a :href="data.item.urlProduct" target="_blank">{{
          data.item.productTitle
        }}</a>
      </template>
      <template #cell(latestPrice)="data">
        <strong class="active-color"
          ><u>{{ formatPrice(data.item.latestPrice) }} VNĐ</u></strong
        >
      </template>
      <template #cell(actions)="data">
        <div class="action-area">
          <i
            title="Chỉnh sửa"
            v-b-modal.edit-price-modal
            @click="selectPrice(data.item)"
            class="fas fa-edit"
          ></i>
          <i
            title="Xóa"
            v-b-modal.delete-price-confirm-modal
            @click="selectPrice(data.item)"
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
            @click="approvePrice(data.item.productRetailerId)"
            class="btn btn-create"
            v-if="!data.item.approve"
          >
            Duyệt
          </button>
        </div>
      </template>
    </b-table>
    <delete-price-confirm-modal
      v-if="!!selectedPrice"
      :id="selectedPrice.productRetailerId"
      @deleted="onDeleted"
    ></delete-price-confirm-modal>
    <update-price-modal
      v-if="!!selectedPrice"
      :priceInfo="selectedPrice"
      @updated="resetTable"
    ></update-price-modal>
    <loading :isLoading="isLoading"></loading>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Loading from "@/components/Home/Loading.vue";
import DeletePriceConfirmModal from "../Modal/DeletePriceConfirmModal.vue";
import priceService, { PriceResponse } from "@/service/price-service";
import UpdatePriceModal from "../Modal/UpdatePriceModal.vue";

@Component({
  components: { Loading, DeletePriceConfirmModal, UpdatePriceModal },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      fields: [
        {
          key: "productRetailerId",
          label: "ID",
        },
        {
          key: "productTitle",
          label: "Tên sản phẩm",
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
  selectedPrice: PriceResponse | null = null;
  isLoading = false;
  rows = 0;

  formatPrice(price: number): string {
    return Intl.NumberFormat().format(price);
  }

  selectPrice(price: PriceResponse) {
    this.selectedPrice = price;
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
      this.resetTable();
    }
  }

  resetTable() {
    (this.$refs.table as any).refresh();
  }

  myProvider(ctx: { currentPage: number; perPage: number }, callback: any) {
    this.isLoading = true;
    priceService
      .getListPendingPrice()
      .then((res) => {
        const items = res.data.content;
        if (res.data.totalElements) {
          this.rows = res.data.totalElements;
        } else {
          this.rows = 0;
        }
        this.isLoading = false;
        callback(items);
      })
      .catch(() => {
        this.isLoading = false;
        this.rows = 0;
        callback([]);
      });

    return null;
  }

  created() {
    this.$store.commit("search/setKeyword", "");
  }
}
</script>

<style lang="scss" scoped>
.logo {
  max-height: 40px;
}
</style>