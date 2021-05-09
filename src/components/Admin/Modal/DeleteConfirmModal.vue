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
      <b-button variant="warning" @click="confirm" class="float-right">
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
  confirm(): void {
    categoryService.deleteCategory(this.category.id).then(() => {
      this.$store.dispatch("category/loadCategories");
    });

    this.$bvModal.hide("delete-confirm-modal");
  }
}
</script>

<style scoped>
</style>