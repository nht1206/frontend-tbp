<template>
  <div>
    <div
      class="
        d-flex
        justify-content-between
        flex-wrap flex-md-nowrap
        align-items-center
        pt-3
        pb-2
        mb-3
        border-bottom
      "
    >
      <h1 class="h4">Chỉnh sửa cửa hàng</h1>
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
      Cập nhật cửa hàng
    </button>
  </div>
</template>

<script lang="ts">
import User from "@/models/User";
import { RegisterRetailerPayload } from "@/service/account-service";
import retailerService from "@/service/retailer-service";
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
      updateForm: {
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
  id!: string;

  error = "";

  isLoading = false;

  successMessage: string | null = "";

  updateForm: RegisterRetailerPayload = {
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

  createHandle(): void {
    this.v$.updateForm.$touch();
    if (!this.v$.$invalid) {
      this.isLoading = true;
      retailerService
        .updateRetailerByOwner(this.id, this.updateForm)
        .then((res) => {
          this.successMessage = res.data.message + "";
          this.isLoading = false;
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
      retailerService
        .getRetailerById(this.id)
        .then((res) => {
          this.updateForm = {
            name: res.data.name,
            description: res.data.description,
            homePage: res.data.homePage,
            logo: res.data.logoImage,
          };
        })
        .catch(() => {
          this.$router.push("/cua-hang");
        });
    } else {
      this.$router.push("/cua-hang");
    }
  }
}
</script>

<style scoped>
</style>