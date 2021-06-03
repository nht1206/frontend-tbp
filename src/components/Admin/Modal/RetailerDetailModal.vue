<template>
  <b-modal
    id="retailer-detail-modal"
    size="md"
    title="Thông tin chi tiết nhà bán lẻ"
  >
    <div v-if="!!retailer" class="card">
      <img :src="retailer.logoImage" class="card-img-top" alt="" />
      <div class="card-body">
        <h5 class="card-title">{{ retailer.name }}</h5>
        <p class="card-text">
          {{ retailer.description }}
        </p>
        <a :href="retailer.homePage" target="_blank" class="btn btn-create"
          >Đến trang chủ</a
        >
      </div>
    </div>
    <template #modal-footer>
      <b-button
        variant="secondary"
        @click="$bvModal.hide('retailer-detail-modal')"
        class="float-right"
      >
        Đóng
      </b-button>
      <b-button
        v-if="!isApprove"
        variant="warning"
        @click="approveRetailer"
        :disabled="isLoading"
        class="float-right"
        ><div
          v-if="isLoading"
          class="spinner-border spinner-border-sm"
          role="status"
        >
          <span class="sr-only">Loading...</span>
        </div>
        Duyệt</b-button
      >
    </template>
  </b-modal>
</template>

<script lang="ts">
import retailerService, { RetailerResponse } from "@/service/retailer-service";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ required: true })
  retailer: RetailerResponse | null = null;

  @Prop({ default: false })
  isApprove!: boolean;

  isLoading = false;

  approveRetailer() {
    this.isLoading = true;
    if (this.retailer) {
      retailerService
        .approveRetailer(this.retailer.id)
        .then(() => {
          this.isLoading = false;
          this.$bvModal.hide("retailer-detail-modal");
          this.$emit("approved", this.retailer?.id);
        })
        .catch(() => {
          this.isLoading = false;
        });
    }
  }
}
</script>

<style scoped>
</style>