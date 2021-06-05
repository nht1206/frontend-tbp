<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h4">Đăng ký cửa hàng mới</h1>
    </div>
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
      Đăng ký cửa hàng
    </button>
  </div>
</template>

<script lang="ts">
import User from "@/models/User";
import accountService, {
  RegisterRetailerPayload,
} from "@/service/account-service";
import useVuelidate from "@vuelidate/core";
import { helpers, maxLength, minLength, required } from "@vuelidate/validators";
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  components: {},
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  validations() {
    return {
      createForm: {
        name: {
          required: helpers.withMessage("Tên không được để trống!", required),
          minLength: helpers.withMessage("Tên phải từ 5 ký tự", minLength(5)),
          maxLength: helpers.withMessage(
            "Tên chỉ có tối đa 50 ký tự",
            maxLength(50)
          ),
        },
        description: {
          required: helpers.withMessage("Mô tả không được để trống!", required),
        },
        logo: {
          required: helpers.withMessage("Logo không được để trống!", required),
          minLength: helpers.withMessage(
            "Đường dẫn logo phải từ 10 ký tự",
            minLength(10)
          ),
          maxLength: helpers.withMessage(
            "Đường dẫn logo có tối đa 255 ký tự",
            maxLength(255)
          ),
        },
        homePage: {
          required: helpers.withMessage(
            "Trang chủ không được để trống!",
            required
          ),
          minLength: helpers.withMessage(
            "Đường dẫn trang chủ phải từ 10 ký tự",
            minLength(10)
          ),
          maxLength: helpers.withMessage(
            "Đường dẫn trang chủ có tối đa 255 ký tự",
            maxLength(255)
          ),
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
})
export default class extends Vue {
  v$!: any;
  user!: User;

  error = "";

  isLoading = false;

  successMessage: string | null = "";

  createForm: RegisterRetailerPayload = {
    name: "",
    description: "",
    logo: "",
    homePage: "",
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
    };
  }

  createHandle(): void {
    this.v$.createForm.$touch();
    if (!this.v$.$invalid) {
      this.isLoading = true;
      accountService
        .registerRetailer(this.createForm)
        .then((res) => {
          this.successMessage = res.data.message + "";
          this.resetForm();
          this.error = "";
          this.isLoading = false;
        })
        .catch((err) => {
          this.error = err.response.data.message;
          this.isLoading = false;
        });
    }
  }
}
</script>

<style scoped>
</style>