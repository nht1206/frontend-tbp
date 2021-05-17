<template>
  <div class="list-product">
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Danh sách sản phẩm chưa duyệt</h1>
      <router-link to="/them-san-pham" custom v-slot="{ href, navigate }">
        <a
          :href="href"
          @click="navigate"
          class="d-sm-inline-block btn btn-create"
        >
          Thêm mới sản phẩm</a
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
      ref="table"
    >
      <template #cell(name)="data">
        <a :href="data.item.homePage" target="_blank">{{ data.item.name }}</a>
      </template>
      <template #cell(image)="data">
        <img class="image" :src="data.item.image" :alt="data.item.title" />
      </template>
      <template #cell(price)="data">
        <strong class="active-color"
          ><u>{{ formatPrice(data.item.lowestPrice) }} </u> -
          <u>{{ formatPrice(data.item.highestPrice) }} VNĐ</u></strong
        >
        <div class="action-area inline-block">
          <router-link
            :to="'/cap-nhat-gia/' + data.item.id"
            custom
            v-slot="{ navigate }"
            ><i title="Cập nhật giá" @click="navigate" class="fas fa-edit"></i
          ></router-link>
        </div>
      </template>
      <template #cell(actions)="data">
        <div class="action-area">
          <div class="action-area">
            <router-link
              :to="'/chinh-sua-san-pham/' + data.item.id"
              custom
              v-slot="{ navigate }"
              ><i title="Chỉnh sửa" @click="navigate" class="fas fa-edit"></i
            ></router-link>
            <i
              title="Xóa"
              v-b-modal.delete-product-confirm-modal
              @click="selectProduct(data.item.id)"
              class="fas fa-trash-alt"
            ></i>
            <i
              title="Xem sản phẩm"
              v-b-modal.product-detail-view
              @click="selectProduct(data.item.id)"
              class="fas fa-eye"
            ></i>
          </div>
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
    <delete-product-confirm
      :id="selectedId"
      @deleted="onDeleted"
    ></delete-product-confirm>
    <product-detail-modal
      :approved="false"
      :id="selectedId"
      @approved="onApproved"
    ></product-detail-modal>
    <loading :isLoading="isLoading"></loading>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Loading from "@/components/Home/Loading.vue";
import productService from "@/service/product-service";
import DeleteProductConfirm from "../Modal/DeleteProductConfirmModal.vue";
import ProductDetailModal from "../Modal/ProductDetailModal.vue";

@Component({
  components: { Loading, DeleteProductConfirm, ProductDetailModal },
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
          key: "title",
          label: "Tiêu đề",
          tdClass: "title",
        },
        {
          key: "image",
          label: "Ảnh",
        },
        {
          key: "price",
          label: "Giá",
        },
        {
          key: "rate",
          label: "Đánh giá",
        },
        {
          key: "enable",
          label: "Trạng thái",
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

  formatPrice(price: number): string {
    return Intl.NumberFormat().format(price);
  }

  selectProduct(id: number) {
    this.selectedId = id;
  }

  changeStatus(id: number) {
    productService.toggleProductStatus(id);
  }

  onDeleted(id: number | null) {
    if (id) {
      (this.$refs.table as any).refresh();
    }
  }

  onApproved() {
    (this.$refs.table as any).refresh();
  }

  myProvider(ctx: { currentPage: number; perPage: number }, callback: any) {
    const params = "?page=" + (ctx.currentPage - 1) + "&size=" + ctx.perPage;
    this.isLoading = true;
    productService
      .getPendingProducts(params)
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
