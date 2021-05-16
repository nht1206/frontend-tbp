<template>
  <div>
    <basic-card title="Thêm mới nhà bán lẻ">
      <template v-slot:content>
        <div>
          <div v-if="error" class="alert alert-danger" role="alert">
            {{ error }}
          </div>
          <div v-if="successMessage" class="alert alert-success" role="alert">
            {{ successMessage }}
          </div>
          <div class="form-group">
            <label for="inputName">Tên</label>
            <input
              type="text"
              class="form-control"
              :class="[{ 'is-invalid': isInvalid(v$.createForm.name) }]"
              v-model="v$.createForm.name.$model"
              @focus="reset(v$.createForm.name)"
              @input="reset(v$.createForm.name)"
              id="inputName"
            />
            <div class="invalid-feedback">
              <template v-for="error of v$.createForm.name.$errors">
                {{ error.$message }}
              </template>
            </div>
          </div>
          <div class="form-group">
            <label for="inputDescription">Mô tả</label>
            <textarea
              type="text"
              class="form-control"
              :class="[{ 'is-invalid': isInvalid(v$.createForm.description) }]"
              v-model="v$.createForm.description.$model"
              @focus="reset(v$.createForm.description)"
              @input="reset(v$.createForm.description)"
              id="inputDescription"
            />
            <div class="invalid-feedback">
              <template v-for="error of v$.createForm.description.$errors">
                {{ error.$message }}
              </template>
            </div>
          </div>
          <div class="form-group">
            <label for="inputLogo">Logo</label>
            <input
              type="text"
              class="form-control"
              :class="[{ 'is-invalid': isInvalid(v$.createForm.logo) }]"
              v-model="v$.createForm.logo.$model"
              @focus="reset(v$.createForm.logo)"
              @input="reset(v$.createForm.logo)"
              id="inputLogo"
            />
            <div class="invalid-feedback">
              <template v-for="error of v$.createForm.logo.$errors">
                {{ error.$message }}
              </template>
            </div>
          </div>
          <div class="form-group">
            <label for="inputHomePage">Địa chỉ trang chủ</label>
            <input
              type="text"
              class="form-control"
              :class="[{ 'is-invalid': isInvalid(v$.createForm.homePage) }]"
              v-model="v$.createForm.homePage.$model"
              @focus="reset(v$.createForm.homePage)"
              @input="reset(v$.createForm.homePage)"
              id="inputHomePage"
            />
            <div class="invalid-feedback">
              <template v-for="error of v$.createForm.homePage.$errors">
                {{ error.$message }}
              </template>
            </div>
          </div>
          <div class="form-group">
            <label for="inputUserId">ID chủ sở hữu</label>
            <input
              type="text"
              class="form-control"
              :class="[{ 'is-invalid': isInvalid(v$.createForm.userId) }]"
              v-model="v$.createForm.userId.$model"
              @focus="reset(v$.createForm.userId)"
              @input="reset(v$.createForm.userId)"
              id="inputUserId"
            />
            <div class="invalid-feedback">
              <template v-for="error of v$.createForm.userId.$errors">
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
            Thêm nhà bán lẻ
          </button>
        </div>
      </template>
    </basic-card>
  </div>
</template>

<script lang="ts">
import retailerService, { RetailerPayload } from "@/service/retailer-service";
import useVuelidate from "@vuelidate/core";
import { helpers, maxLength, minLength, required } from "@vuelidate/validators";
import { Component, Vue } from "vue-property-decorator";
import BasicCard from "../Card/BasicCard.vue";

@Component({
  components: { BasicCard },
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  validations() {
    return {
      createForm: {
        name: {
          required: helpers.withMessage("Tên không được để trống!", required),
          minLength: helpers.withMessage("Tên phải từ 8 ký tự", minLength(8)),
          maxLength: helpers.withMessage(
            "Tên chỉ có tối đa 16 ký tự",
            maxLength(16)
          ),
        },
        description: {
          required: helpers.withMessage("Mô tả không được để trống!", required),
        },
        logo: {
          required: helpers.withMessage("Logo không được để trống!", required),
        },
        homePage: {
          required: helpers.withMessage(
            "Trang chủ không được để trống!",
            required
          ),
        },
        userId: {},
      },
    };
  },
})
export default class extends Vue {
  v$!: any;

  error = "";

  isLoading = false;

  successMessage: string | null = "";

  createForm: RetailerPayload = {
    name: "",
    description: "",
    logo: "",
    homePage: "",
    userId: "",
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
      name: "",
      description: "",
      logo: "",
      homePage: "",
      userId: "",
    };
  }

  createHandle(): void {
    this.v$.createForm.$touch();
    if (!this.v$.$invalid) {
      this.isLoading = true;
      retailerService
        .createRetailer(this.createForm)
        .then((res) => {
          this.successMessage = res.data.message + "";
          this.resetForm();
          this.error = "";
          this.isLoading = false;
          this.$router.push("/nha-ban-le-da-duyet");
        })
        .catch((err) => {
          this.error = err.response.data.message;
          this.isLoading = false;
        });
    }
  }
}
</script>
