<template>
  <b-modal id="edit-price-modal" title="Chỉnh sửa giá" @shown="resetData">
    <form>
      <div v-if="!!success" class="alert alert-success">{{ success }}</div>
      <div v-if="!!error" class="alert alert-danger">{{ error }}</div>
      <div class="form-group">
        <label for="inputTitle">Giá</label>
        <input
          type="number"
          class="form-control"
          :class="[{ 'is-invalid': isInvalid(v$.updateForm.price) }]"
          id="inputTitle"
          placeholder="Nhập giá"
          v-model="v$.updateForm.price.$model"
          @focus="reset(v$.updateForm.price)"
          @input="reset(v$.updateForm.price)"
        />
        <div class="invalid-feedback">
          <template v-for="error of v$.updateForm.price.$errors">
            {{ error.$message }}
          </template>
        </div>
      </div>
      <div class="form-group">
        <label for="inputUrl">Đường dẫn</label>
        <textarea
          type="text"
          class="form-control"
          :class="[{ 'is-invalid': isInvalid(v$.updateForm.url) }]"
          id="inputUrl"
          placeholder="Nhập đường dẫn"
          v-model="v$.updateForm.url.$model"
          @focus="reset(v$.updateForm.url)"
          @input="reset(v$.updateForm.url)"
        />
        <div class="invalid-feedback">
          <template v-for="error of v$.updateForm.url.$errors">
            {{ error.$message }}
          </template>
        </div>
      </div>
    </form>
    <template #modal-footer>
      <b-button
        variant="secondary"
        @click="$bvModal.hide('edit-price-modal')"
        class="float-right"
      >
        Đóng
      </b-button>
      <b-button
        :disabled="isLoading"
        variant="warning"
        @click="submitUpdate"
        class="float-right"
      >
        <div
          v-if="isLoading"
          class="spinner-border spinner-border-sm"
          role="status"
        >
          <span class="sr-only">Loading...</span>
        </div>
        Cập nhật
      </b-button>
    </template>
  </b-modal>
</template>

<script lang="ts">
import Category from "@/models/Category";
import priceService, {
  PriceResponse,
  UpdatePricePayload,
} from "@/service/price-service";
import useVuelidate from "@vuelidate/core";
import { required, helpers, minLength, maxLength } from "@vuelidate/validators";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  validations() {
    return {
      updateForm: {
        price: {
          required: helpers.withMessage("Giá không được để trống!", required),
        },
        url: {
          required: helpers.withMessage(
            "Đường dẫn không được để trống!",
            required
          ),
          minLength: helpers.withMessage(
            "Độ dài đường dẫn ít nhất 50 ký tự",
            minLength(50)
          ),
          maxLength: helpers.withMessage(
            "Độ dài đường dẫn tối đa 255 ký tự",
            maxLength(255)
          ),
        },
      },
    };
  },
})
export default class extends Vue {
  @Prop({ required: true })
  priceInfo!: PriceResponse;
  v$!: any;

  error = "";

  success = "";

  isLoading = false;

  updateForm: UpdatePricePayload = {
    price: "",
    url: "",
  };

  isInvalid(field: { $invalid: boolean; $dirty: boolean }): boolean {
    return field.$invalid && field.$dirty;
  }

  reset(field: { $reset: () => void }): void {
    field.$reset();
    this.error = "";
  }

  resetData(): void {
    this.v$.updateForm.$reset();
    this.updateForm = {
      price: this.priceInfo.latestPrice + "",
      url: this.priceInfo.urlProduct,
    };
    this.error = "";
    this.success = "";
  }

  submitUpdate(): void {
    this.v$.updateForm.$touch();
    if (!this.v$.updateForm.$invalid) {
      this.isLoading = true;
      priceService
        .updatePriceByAdmin(
          this.priceInfo.productRetailerId + "",
          this.updateForm
        )
        .then((res) => {
          this.isLoading = false;
          this.success = res.data.message;
          this.$emit("updated");
          setTimeout(() => {
            this.success = "";
          }, 5000);
        })
        .catch((err) => {
          this.isLoading = false;
          this.error = err.response.data.message;
        });
    }
  }
}
</script>