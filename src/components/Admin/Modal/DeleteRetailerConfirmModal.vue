<template>
  <b-modal
    id="delete-retailer-confirm-modal"
    title="Bạn có muốn xóa nhà bán lẻ này không?"
  >
    <p class="my-4" v-if="id">ID: {{ id }}</p>
    <div v-if="!!error" class="alert alert-danger">{{ error }}</div>
    <template #modal-footer>
      <b-button
        variant="secondary"
        @click="$bvModal.hide('delete-retailer-confirm-modal')"
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
import retailerService from "@/service/retailer-service";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ required: true })
  id!: number;

  isLoading = false;

  error = "";

  makeToast() {
    this.$store.commit("toast/setToastInfo", {
      message: `Nhà bán lẻ có id: ${this.id} đã được xóa thành công`,
      title: "Xóa nhà bán lẻ thành công",
      variant: "success",
    });
    this.$bvToast.show("messageToast");
  }

  confirm(): void {
    this.isLoading = true;
    retailerService
      .deleteRetailer(this.id)
      .then(() => {
        this.isLoading = false;
        this.$bvModal.hide("delete-retailer-confirm-modal");
        this.$emit("deleted", this.id);
      })
      .catch((err) => {
        this.error = err.response.data.message;
        this.isLoading = false;
        this.$emit("deleted", null);
      });
  }
}
</script>

<style scoped>
</style>