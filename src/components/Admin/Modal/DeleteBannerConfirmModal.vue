<template>
  <b-modal
    id="delete-banner-confirm-modal"
    title="Bạn có muốn xóa banner này không?"
  >
    <p class="my-4" v-if="id">ID: {{ id }}</p>
    <div v-if="!!error" class="alert alert-danger">{{ error }}</div>
    <template #modal-footer>
      <b-button
        variant="secondary"
        @click="$bvModal.hide('delete-banner-confirm-modal')"
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
import bannerService from "@/service/banner-service";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ required: true })
  id!: number;

  isLoading = false;

  error = "";

  makeToast() {
    this.$store.commit("toast/setToastInfo", {
      message: `Banner có id: ${this.id} đã được xóa thành công`,
      title: "Xóa banner thành công",
      variant: "success",
    });
    this.$bvToast.show("messageToast");
  }

  confirm(): void {
    this.isLoading = true;
    bannerService
      .deleteBanner(this.id)
      .then(() => {
        this.isLoading = false;
        this.$emit("deleted", this.id);
        this.$bvModal.hide("delete-banner-confirm-modal");
        this.makeToast();
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