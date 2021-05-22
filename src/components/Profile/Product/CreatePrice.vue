<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h4">Thêm giá mới</h1>
    </div>
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>
    <div v-if="successMessage" class="alert alert-success" role="alert">
      {{ successMessage }}
    </div>
    <div class="form-group">
      <label for="selectRetailer">Nhà bán lẻ</label>
      <select
        class="form-control"
        :class="[{ 'is-invalid': isInvalid(v$.createForm.retailerId) }]"
        v-model="v$.createForm.retailerId.$model"
        @focus="reset(v$.createForm.retailerId)"
        @input="reset(v$.createForm.retailerId)"
        id="selectRetailer"
      >
        <option v-for="r in retailers" :key="r.id" :value="r.id">
          {{ r.name }}
        </option>
      </select>
      <div class="invalid-feedback">
        <template v-for="error of v$.createForm.retailerId.$errors">
          {{ error.$message }}
        </template>
      </div>
    </div>
    <div class="form-group">
      <label for="inputPrice">Giá</label>
      <input
        type="number"
        class="form-control"
        :class="[{ 'is-invalid': isInvalid(v$.createForm.price) }]"
        v-model="v$.createForm.price.$model"
        @focus="reset(v$.createForm.price)"
        @input="reset(v$.createForm.price)"
        id="inputPrice"
      />
      <div class="invalid-feedback">
        <template v-for="error of v$.createForm.price.$errors">
          {{ error.$message }}
        </template>
      </div>
    </div>
    <div class="form-group">
      <label for="inputUrl">Đường dẫn</label>
      <input
        type="text"
        class="form-control"
        :class="[{ 'is-invalid': isInvalid(v$.createForm.url) }]"
        v-model="v$.createForm.url.$model"
        @focus="reset(v$.createForm.url)"
        @input="reset(v$.createForm.url)"
        id="inputUrl"
      />
      <div class="invalid-feedback">
        <template v-for="error of v$.createForm.url.$errors">
          {{ error.$message }}
        </template>
      </div>
    </div>

    <button
      @click="createHandle"
      :disabled="isCreateDisabled"
      type="submit"
      class="btn btn-create"
    >
      <div
        v-if="isLoading"
        class="spinner-border spinner-border-sm"
        role="status"
      >
        <span class="sr-only">Loading...</span>
      </div>
      Thêm sản phẩm
    </button>
  </div>
</template>

<script lang="ts">
import Retailer from "@/models/Retailer";
import priceService, { CreatePricePayload } from "@/service/price-service";
import retailerService from "@/service/retailer-service";
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  validations() {
    return {
      createForm: {
        retailerId: {
          required: helpers.withMessage(
            "Tiêu đề không được để trống!",
            required
          ),
        },
        price: {
          required: helpers.withMessage("Giá không được để trống!", required),
        },
        url: {
          required: helpers.withMessage(
            "Đường dẫn không được để trống!",
            required
          ),
        },
      },
    };
  },
})
export default class extends Vue {
  v$!: any;

  id!: string;

  error = "";
  isLoading = false;
  successMessage: string | null = "";

  retailers: Retailer[] = [];

  createForm: CreatePricePayload = {
    retailerId: "",
    price: "",
    url: "",
  };

  isInvalid(field: { $invalid: boolean; $dirty: boolean }): boolean {
    return field.$invalid && field.$dirty;
  }

  get isCreateDisabled() {
    return this.isLoading || !!this.error;
  }

  reset(field: { $reset: () => void }): void {
    field.$reset();
    this.error = "";
  }

  resetForm() {
    this.error = "";
    this.v$.createForm.$reset();
    this.createForm = {
      retailerId: "",
      price: "",
      url: "",
    };
  }

  onImagesChange(images: string[]) {
    this.v$.createForm.images.$model = images;
  }

  createHandle(): void {
    this.v$.createForm.$touch();
    if (!this.v$.$invalid) {
      this.isLoading = true;
      priceService
        .addNewPriceByRetailer(this.id, this.createForm)
        .then((res) => {
          this.successMessage = res.data.message + "";
          this.resetForm();
          this.error = "";
          this.isLoading = false;
          this.$router.push("/them-gia-san-pham/" + this.id);
        })
        .catch((err) => {
          this.error = err.response.data.message;
          this.isLoading = false;
        });
    }
  }

  created() {
    this.id = this.$route.params["id"];
    retailerService.getUserRetailers().then((res) => {
      if (res.data && res.data.length > 0) {
        this.retailers = res.data.filter(
          (r: any) => r.enable === true && r.approve === true
        );
        this.createForm.retailerId = this.retailers[0].id + "";
      }
    });
  }
}
</script>

<style scoped>
</style>