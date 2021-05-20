<template>
  <div>
    <basic-card title="Chỉnh sửa nhà bán lẻ">
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
              :class="[{ 'is-invalid': isInvalid(v$.updateForm.name) }]"
              v-model="v$.updateForm.name.$model"
              @focus="reset(v$.updateForm.name)"
              @input="reset(v$.updateForm.name)"
              id="inputName"
            />
            <div class="invalid-feedback">
              <template v-for="error of v$.updateForm.name.$errors">
                {{ error.$message }}
              </template>
            </div>
          </div>
          <div class="form-group">
            <label for="inputDescription">Mô tả</label>
            <textarea
              type="text"
              class="form-control"
              :class="[{ 'is-invalid': isInvalid(v$.updateForm.description) }]"
              v-model="v$.updateForm.description.$model"
              @focus="reset(v$.updateForm.description)"
              @input="reset(v$.updateForm.description)"
              id="inputDescription"
            />
            <div class="invalid-feedback">
              <template v-for="error of v$.updateForm.description.$errors">
                {{ error.$message }}
              </template>
            </div>
          </div>
          <div class="form-group">
            <label for="inputLogo">Logo</label>
            <input
              type="text"
              class="form-control"
              :class="[{ 'is-invalid': isInvalid(v$.updateForm.logo) }]"
              v-model="v$.updateForm.logo.$model"
              @focus="reset(v$.updateForm.logo)"
              @input="reset(v$.updateForm.logo)"
              id="inputLogo"
            />
            <div class="invalid-feedback">
              <template v-for="error of v$.updateForm.logo.$errors">
                {{ error.$message }}
              </template>
            </div>
          </div>
          <div class="form-group">
            <label for="inputHomePage">Địa chỉ trang chủ</label>
            <input
              type="text"
              class="form-control"
              :class="[{ 'is-invalid': isInvalid(v$.updateForm.homePage) }]"
              v-model="v$.updateForm.homePage.$model"
              @focus="reset(v$.updateForm.homePage)"
              @input="reset(v$.updateForm.homePage)"
              id="inputHomePage"
            />
            <div class="invalid-feedback">
              <template v-for="error of v$.updateForm.homePage.$errors">
                {{ error.$message }}
              </template>
            </div>
          </div>
          <div class="form-group">
            <label for="inputUserId">ID chủ sở hữu</label>
            <input
              type="text"
              class="form-control"
              :class="[{ 'is-invalid': isInvalid(v$.updateForm.userId) }]"
              v-model="v$.updateForm.userId.$model"
              @focus="reset(v$.updateForm.userId)"
              @input="reset(v$.updateForm.userId)"
              id="inputUserId"
            />
            <div class="invalid-feedback">
              <template v-for="error of v$.updateForm.userId.$errors">
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
            Cập nhật
          </button>
        </div>
      </template>
    </basic-card>
  </div>
</template>

<script lang="ts">
import retailerService, {
  RetailerPayload,
  RetailerResponse,
} from "@/service/retailer-service";
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
      updateForm: {
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
        userId: {
          required: helpers.withMessage(
            "ID chủ sở hữu không được để trống!",
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
  retailer!: RetailerResponse;

  error = "";

  isLoading = false;

  successMessage: string | null = "";

  updateForm: RetailerPayload = {
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
    this.v$.updateForm.$reset();
    this.updateForm = {
      name: "",
      description: "",
      logo: "",
      homePage: "",
      userId: "",
    };
  }

  createHandle(): void {
    this.v$.updateForm.$touch();
    if (!this.v$.$invalid) {
      this.isLoading = true;
      retailerService
        .updateRetailer(this.id, this.updateForm)
        .then((res) => {
          this.successMessage = res.data.message + "";
          this.resetForm();
          this.error = "";
          this.isLoading = false;
          this.$router.push(
            this.$route.redirectedFrom || "/nha-ban-le-da-duyet"
          );
        })
        .catch((err) => {
          this.error = err.response.data.message;
          this.isLoading = false;
        });
    }
  }

  created() {
    this.id = this.$route.params["id"];
    if (this.id) {
      retailerService.getRetailerById(this.id).then((res) => {
        this.retailer = res.data;
        this.updateForm = {
          description: res.data.description,
          homePage: res.data.homePage,
          logo: res.data.logoImage,
          name: res.data.name,
          userId: res.data.userId,
        };
      });
    }
  }
}
</script>
