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
      <edit-category-modal
        v-if="!!selectedCategory"
        :category="selectedCategory"
      ></edit-category-modal>
      <create-sub-category-modal
        :parentId="selectedParentId"
      ></create-sub-category-modal>
      <edit-sub-category-modal
        :parentId="selectedParentId"
        :category="selectedCategory"
      ></edit-sub-category-modal>
      <delete-confirm-modal :category="selectedCategory"></delete-confirm-modal>
      <div class="col-md-4" v-for="c in categories" :key="c.id">
        <dropdown-card :title="c.title">
          <template v-slot:dropdown-menu>
            <div class="dropdown-header">Hành động</div>
            <a
              class="dropdown-item"
              v-b-modal.edit-category-modal
              @click="select(c)"
              ><i class="fas fa-edit"></i> Chỉnh sửa</a
            >
            <a
              class="dropdown-item"
              v-b-modal.delete-confirm-modal
              @click="select(c)"
              ><i class="fas fa-trash-alt"></i> Xóa</a
            >
            <a
              class="dropdown-item"
              v-b-modal.create-sub-category-modal
              @click="clickCreateSubCategory(c.id)"
              >Thêm danh mục con</a
            >
            <!-- <div class="dropdown-divider"></div> -->
          </template>
          <template v-slot:content>
            <li class="list-item" v-for="sc in c.categories" :key="sc.id">
              {{ sc.title }}
              <div class="action-area">
                <i
                  class="fas fa-edit"
                  v-b-modal.edit-sub-category-modal
                  @click="selectSubCategory(c.id, sc)"
                ></i>
                <i
                  class="fas fa-trash-alt"
                  v-b-modal.delete-confirm-modal
                  @click="select(sc)"
                ></i>
              </div>
            </li>
          </template>
        </dropdown-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Category from "@/models/Category";
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import DropdownCard from "../Card/DropdownCard.vue";
import CreateCategoryModal from "../Modal/CreateCategoryModal.vue";
import CreateSubCategoryModal from "../Modal/CreateSubCategoryModal.vue";
import DeleteConfirmModal from "../Modal/DeleteCategoryConfirmModal.vue";
import EditCategoryModal from "../Modal/EditCategoryModal.vue";
import EditSubCategoryModal from "../Modal/EditSubCategoryModal.vue";

@Component({
  components: {
    DropdownCard,
    CreateCategoryModal,
    EditCategoryModal,
    CreateSubCategoryModal,
    EditSubCategoryModal,
    DeleteConfirmModal,
  },
  computed: {
    ...mapGetters({
      categories: "category/categories",
    }),
  },
})
export default class extends Vue {
  selectedParentId = -1;
  selectedCategory: Category | null = null;

  select(category: Category) {
    this.selectedCategory = category;
  }

  clickCreateSubCategory(parentId: number) {
    this.selectedParentId = parentId;
  }

  selectSubCategory(parentId: number, category: Category) {
    this.selectedParentId = parentId;
    this.selectedCategory = category;
  }

  created(): void {
    this.$store.dispatch("category/loadCategories");
  }
}
</script>

<style lang="scss" scoped>
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