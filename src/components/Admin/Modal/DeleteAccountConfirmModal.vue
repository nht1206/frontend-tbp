<template>
  <b-modal
    id="delete-account-confirm-modal"
    title="Bạn có muốn xóa tài khoản này không?"
  >
    <p class="my-4" v-if="id">ID: {{ id }}</p>
    <div v-if="!!error" class="alert alert-danger">{{ error }}</div>
    <template #modal-footer>
      <b-button
        variant="secondary"
        @click="$bvModal.hide('delete-account-confirm-modal')"
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
import accountService from "@/service/account-service";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ required: true })
  id!: number;

  isLoading = false;

  error = "";

  makeToast() {
    this.$store.commit("toast/setToastInfo", {
      message: `Tài khoản có id: ${this.id} đã được xóa thành công`,
      title: "Xóa tài khoản thành công",
      variant: "success",
    });
    this.$bvToast.show("messageToast");
  }

  confirm(): void {
    this.isLoading = true;
    accountService
      .deleteGuestOrRetailer(this.id)
      .then(() => {
        this.isLoading = false;
        this.$bvModal.hide("delete-account-confirm-modal");
        this.$emit("deleted", this.id);
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