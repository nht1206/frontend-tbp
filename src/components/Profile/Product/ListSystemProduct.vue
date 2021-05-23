<template>
  <div class="list-product">
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h4">Danh sách sản phẩm của hệ thống</h1>
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
      :filter="{ keyword }"
      ref="table"
    >
      <template #cell(title)="data">
        <router-link
          :to="'/chi-tiet-san-pham/' + data.item.id"
          custom
          v-slot="{ href }"
        >
          <a :href="href" target="_blank">{{ data.item.title }}</a>
        </router-link>
      </template>
      <template #cell(image)="data">
        <img class="image" :src="data.item.image" :alt="data.item.title" />
      </template>
      <template #cell(price)="data">
        <strong class="active-color"
          ><u>{{ formatPrice(data.item.lowestPrice) }} </u> -
          <u>{{ formatPrice(data.item.highestPrice) }} VNĐ</u></strong
        >
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
      <template #cell(actions)="data">
        <div class="action-area">
          <router-link
            :to="'/danh-sach-gia/' + data.item.id"
            custom
            v-slot="{ navigate }"
          >
            <button @click="navigate" class="btn btn-create">
              Danh sách giá
            </button>
          </router-link>
        </div>
      </template>
    </b-table>
    <loading :isLoading="isLoading"></loading>
  </div>
</template>

<script lang="ts">
import Loading from "@/components/Home/Loading.vue";
import productService from "@/service/product-service";
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  components: { Loading },
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
          tdClass: "status",
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
      keyword: "search/keyword",
    }),
  },
})
export default class extends Vue {
  rows = 0;
  selectedId = 0;
  isLoading = false;

  selectProduct(id: number) {
    this.selectedId = id;
  }

  getStatus(enable: boolean) {
    if (enable) {
      return "On";
    } else {
      return "Off";
    }
  }

  formatPrice(price: number): string {
    return Intl.NumberFormat().format(price);
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

  myProvider(
    ctx: { currentPage: number; perPage: number; filter: { keyword: string } },
    callback: any
  ) {
    const params =
      "?keyword=" +
      ctx.filter.keyword +
      "&page=" +
      (ctx.currentPage - 1) +
      "&size=" +
      ctx.perPage;
    this.isLoading = true;
    productService
      .getApprovedProducts(params)
      .then((res) => {
        const items = res.data.content;
        this.rows = res.data.totalElements || 0;
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

.list-product {
  .image {
    max-height: 100px;
  }
  .title {
    width: 300px;
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