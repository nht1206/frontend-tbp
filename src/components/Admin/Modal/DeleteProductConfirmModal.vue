<template>
  <b-modal
    id="delete-product-confirm-modal"
    title="Bạn có muốn xóa sản phẩm này không?"
  >
    <p class="my-4" v-if="id">ID: {{ id }}</p>
    <div v-if="!!error" class="alert alert-danger">{{ error }}</div>
    <template #modal-footer>
      <b-button
        variant="secondary"
        @click="$bvModal.hide('delete-product-confirm-modal')"
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
import productService from "@/service/product-service";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ required: true })
  id!: number;

  isLoading = false;

  error = "";
  confirm(): void {
    this.isLoading = true;
    productService
      .deleteProduct(this.id)
      .then(() => {
        this.isLoading = false;
        this.$emit("deleted", this.id);
        this.$bvModal.hide("delete-product-confirm-modal");
      })
      .catch((err) => {
        this.error = err.response.data.message;
        this.isLoading = false;
      });
  }
}
</script>

<style scoped>
</style>