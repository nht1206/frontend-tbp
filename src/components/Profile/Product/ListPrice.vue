<template>
  <div>
    <div
      class="
        d-flex
        justify-content-between
        flex-wrap flex-md-nowrap
        align-items-center
        pt-3
        pb-2
        mb-3
        border-bottom
      "
    >
      <h1 class="h4">Danh sách giá của bạn</h1>
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
        <p :class="{ active: data.item.enable }">
          {{ getStatus(data.item.enable) }}
        </p>
      </template>
      <template #cell(approve)="data">
        <p :class="{ active: data.item.approve }">
          {{ getApproveStatus(data.item.approve) }}
        </p>
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
import Loading from "@/components/Home/Loading.vue";
import User from "@/models/User";
import priceService, { PriceResponse } from "@/service/price-service";
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import UpdatePriceModal from "@/components/Profile/Modal/UpdatePriceModal.vue";
import DeletePriceConfirmModal from "../Modal/DeletePriceConfirmModal.vue";

@Component({
  components: { Loading, UpdatePriceModal, DeletePriceConfirmModal },
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
          key: "urlProduct",
          label: "Đường dẩn",
        },
        {
          key: "enable",
          label: "Trạng thái",
          tdClass: "enable",
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
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
})
export default class extends Vue {
  rows = 0;
  user!: User;
  selectedPrice: PriceResponse | null = null;
  isLoading = false;

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
      .getRetailerPrices()
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