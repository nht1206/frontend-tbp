<template>
  <b-modal
    id="delete-confirm-modal"
    title="Bạn có muốn xóa danh mục này không?"
  >
    <p class="my-4" v-if="category">Tên danh mục: {{ category.title }}</p>
    <template #modal-footer>
      <b-button
        variant="secondary"
        @click="$bvModal.hide('delete-confirm-modal')"
        class="float-right"
      >
        Hủy
      </b-button>
      <b-button
        :disabled="isLoading"
        variant="warning"
        @click="confirm"
        class="float-right"
      >
        <div
          v-if="isLoading"
          class="spinner-border spinner-border-sm"
          role="status"
        >
          <span class="sr-only">Loading...</span>
        </div>
        Xác nhận
      </b-button>
    </template>
  </b-modal>
</template>

<script lang="ts">
import Category from "@/models/Category";
import categoryService from "@/service/category-service";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ required: true })
  category!: Category;

  isLoading = false;
  confirm(): void {
    this.isLoading = true;
    categoryService
      .deleteCategory(this.category.id)
      .then(() => {
        this.isLoading = false;
        this.$bvModal.hide("delete-confirm-modal");
        if (this.category.categories?.length !== 0) {
          this.$store.commit("category/removeCategory", this.category.id);
        } else {
          this.$store.dispatch("category/loadCategories");
        }
      })
      .catch(() => {
        this.isLoading = false;
      });
  }
}
</script>

<style scoped>
</style>