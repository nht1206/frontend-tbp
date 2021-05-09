<template>
  <div>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Quản lý danh mục</h1>
      <a
        v-b-modal.create-category-modal
        class="d-sm-inline-block btn btn-create"
      >
        Tạo mới danh mục</a
      >
      <create-category-modal></create-category-modal>
    </div>
    <div class="row">
      <div class="col-md-4" v-for="c in categories" :key="c.id">
        <dropdown-card :title="c.title">
          <template v-slot:dropdown-menu>
            <div class="dropdown-header">Hành động</div>
            <a class="dropdown-item" href="#">Cập nhật tên danh mục</a>
            <a class="dropdown-item" href="#">Thêm danh mục con</a>
            <!-- <div class="dropdown-divider"></div> -->
          </template>
          <template v-slot:content>
            <li class="list-item" v-for="sc in c.categories" :key="sc.id">
              {{ sc.title }}
              <div class="action-area">
                <i class="fas fa-edit"></i>
                <i class="fas fa-trash-alt"></i>
              </div>
            </li>
          </template>
        </dropdown-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import DropdownCard from "../Card/DropdownCard.vue";
import CreateCategoryModal from "../Modal/CreateCategoryModal.vue";

@Component({
  components: { DropdownCard, CreateCategoryModal },
  computed: {
    ...mapGetters({
      categories: "category/categories",
    }),
  },
})
export default class extends Vue {
  created(): void {
    this.$store.dispatch("category/loadCategories");
  }
}
</script>

<style lang="scss" scoped>
.btn-create {
  background-color: #fea82f;
  color: aliceblue;
}

.list-item {
  list-style-type: none;
  .action-area {
    float: right;
    i {
      cursor: pointer;
      margin: 0 3px;
      color: #fea82f;
    }
  }
}
</style>