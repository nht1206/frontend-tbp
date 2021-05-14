<template>
  <div>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Danh sách nhà bán lẻ</h1>
      <router-link to="/tao-nha-ban-le" custom v-slot="{ href, navigate }">
        <a
          :href="href"
          @click="navigate"
          class="d-sm-inline-block btn btn-create"
        >
          Tạo mới nhà bán lẻ</a
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
            :to="'/chinh-sua-nha-ban-le/' + data.item.id"
            custom
            v-slot="{ navigate }"
            ><i @click="navigate" class="fas fa-edit"></i
          ></router-link>
          <i
            @click="
              selectRetailer(data.item.id) &
                $bvModal.show('delete-retailer-confirm-modal')
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Loading from "@/components/Home/Loading.vue";
import retailerService from "@/service/retailer-service";

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

  selectRetailer(id: number) {
    this.selectedId = id;
  }

  changeStatus(id: number) {
    // accountService.toggleStatus(id);
  }

  myProvider(ctx: { currentPage: number; perPage: number }, callback: any) {
    const params = "?page=" + (ctx.currentPage - 1) + "&size=" + ctx.perPage;
    this.isLoading = true;
    retailerService
      .getApprovedRetailers(params)
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

<style lang="scss" scoped>
.logo {
  max-height: 40px;
}
</style>