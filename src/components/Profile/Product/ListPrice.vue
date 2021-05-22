<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h4">Danh sách giá</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <router-link to="/them-gia-moi" custom v-slot="{ navigate }">
          <button @click="navigate" type="button" class="btn btn-create">
            Thêm giá mới
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
        <div v-if="isOwner(data.item.createdBy)" class="action-area">
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
import DeletePriceConfirmModal from "@/components/Admin/Modal/DeletePriceConfirmModal.vue";
import UpdatePriceModal from "@/components/Admin/Modal/UpdatePriceModal.vue";
import Loading from "@/components/Home/Loading.vue";
import User from "@/models/User";
import priceService, { PriceResponse } from "@/service/price-service";
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  components: { Loading, UpdatePriceModal, DeletePriceConfirmModal },
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
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
})
export default class extends Vue {
  user!: User;
  selectedPrice: PriceResponse | null = null;
  isLoading = false;

  productId!: string;

  formatPrice(price: number): string {
    return Intl.NumberFormat().format(price);
  }

  selectPrice(price: PriceResponse) {
    this.selectedPrice = price;
  }

  isOwner(username: string) {
    return this.user.username === username;
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