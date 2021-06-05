<template>
  <div>
    <basic-card title="Thêm giá mới">
      <template v-slot:content>
        <div>
          <div v-if="error" class="alert alert-danger" role="alert">
            {{ error }}
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
            Thêm giá
          </button>
        </div>
      </template>
    </basic-card>
  </div>
</template>

<script lang="ts">
import useVuelidate from "@vuelidate/core";
import { helpers, maxLength, minLength, required } from "@vuelidate/validators";
import { Component, Vue } from "vue-property-decorator";
import BasicCard from "../Card/BasicCard.vue";
import priceService, { CreatePricePayload } from "@/service/price-service";
import Retailer from "@/models/Retailer";
import retailerService from "@/service/retailer-service";

@Component({
  components: { BasicCard },
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  validations() {
    return {
      createForm: {
        retailerId: {
          required: helpers.withMessage(
            "Nhà bán lẻ không được để trống!",
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
          minLength: helpers.withMessage(
            "Độ dài đường dẫn ít nhất 50 ký tự!",
            minLength(50)
          ),
          maxLength: helpers.withMessage(
            "Độ dài đường dẫn tối đa 255 ký tự!",
            maxLength(255)
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

  makeToast() {
    this.$store.commit("toast/setToastInfo", {
      message: `Giá "${this.createForm.price}" cho nhà bán lẻ có id: ${this.createForm.retailerId} đã được thêm thành công`,
      title: "Thêm giá thành công",
      variant: "success",
    });
    this.$bvToast.show("messageToast");
  }

  createHandle(): void {
    this.v$.createForm.$touch();
    if (!this.v$.$invalid) {
      this.isLoading = true;
      priceService
        .addNewPriceByAdmin(this.id, this.createForm)
        .then((res) => {
          this.isLoading = false;
          this.$router.push("/cap-nhat-gia/" + this.id);
          this.makeToast();
          this.resetForm();
          this.error = "";
        })
        .catch((err) => {
          this.error = err.response.data.message;
          this.isLoading = false;
        });
    }
  }

  created() {
    this.id = this.$route.params["id"];
    retailerService.getRetailers().then((res) => {
      if (res.data && res.data.length > 0) {
        this.retailers = res.data;
        this.createForm.retailerId = res.data[0].id + "";
      }
    });
  }
}
</script>
