<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h4">Cập nhật thông tin cá nhân</h1>
    </div>
    <div class="card mt-2">
      <div class="card-body">
        <div>
          <div v-if="error && !success" class="alert alert-danger">
            {{ error }}
          </div>
          <div v-if="success && !error" class="alert alert-success">
            {{ success }}
          </div>
          <div class="form-group">
            <label for="inputFullName">Họ và tên</label>
            <input
              type="text"
              class="form-control"
              id="inputFullName"
              :class="[
                {
                  'is-invalid': isInvalid(v$.updateInfoForm.fullName),
                },
              ]"
              v-model="v$.updateInfoForm.fullName.$model"
              @focus="reset(v$.updateInfoForm.fullName)"
              @input="reset(v$.updateInfoForm.fullName)"
            />
            <div class="invalid-feedback">
              <template v-for="error of v$.updateInfoForm.fullName.$errors">
                {{ error.$message }}
              </template>
            </div>
          </div>
          <div class="form-group">
            <label for="inputPhoneNumber">Số điện thoại</label>
            <input
              type="text"
              class="form-control"
              id="inputPhoneNumber"
              :class="[
                {
                  'is-invalid': isInvalid(v$.updateInfoForm.phoneNumber),
                },
              ]"
              v-model="v$.updateInfoForm.phoneNumber.$model"
              @focus="reset(v$.updateInfoForm.phoneNumber)"
              @input="reset(v$.updateInfoForm.phoneNumber)"
            />
            <div class="invalid-feedback">
              <template v-for="error of v$.updateInfoForm.phoneNumber.$errors">
                {{ error.$message }}
              </template>
            </div>
          </div>
          <div class="form-group">
            <label for="inputAddress">Địa chỉ</label>
            <input
              type="text"
              class="form-control"
              id="inputAddress"
              :class="[
                {
                  'is-invalid': isInvalid(v$.updateInfoForm.address),
                },
              ]"
              v-model="v$.updateInfoForm.address.$model"
              @focus="reset(v$.updateInfoForm.address)"
              @input="reset(v$.updateInfoForm.address)"
            />
            <div class="invalid-feedback">
              <template v-for="error of v$.updateInfoForm.address.$errors">
                {{ error.$message }}
              </template>
            </div>
          </div>
          <button
            :disabled="isLoading"
            @click="changePassword"
            type="button"
            class="btn"
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import User from "@/models/User";
import accountService from "@/service/account-service";
import authService from "@/service/auth-service";
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { Component, Vue } from "vue-property-decorator";

export interface UpdateInfoForm {
  fullName: string;
  phoneNumber: string;
  address: string;
}

@Component({
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  validations() {
    return {
      updateInfoForm: {
        fullName: {
          required: helpers.withMessage(
            "Họ tên không được để trống!",
            required
          ),
        },
        phoneNumber: {
          required: helpers.withMessage(
            "Số điện thoại không được để trống!",
            required
          ),
        },
        address: {
          required: helpers.withMessage(
            "Địa chỉ không được để trống!",
            required
          ),
        },
      },
    };
  },
})
export default class extends Vue {
  user: User | null = null;

  v$!: any;

  error = "";
  success = "";
  isLoading = false;

  updateInfoForm: UpdateInfoForm = {
    fullName: "",
    phoneNumber: "",
    address: "",
  };

  isInvalid(field: { $invalid: boolean; $dirty: boolean }): boolean {
    return field.$invalid && field.$dirty;
  }

  reset(field: { $reset: () => void }): void {
    field.$reset();
    this.error = "";
    this.success = "";
  }

  resetForm() {
    this.v$.updateInfoForm.$reset();
    this.error = "";
    this.updateInfoForm = {
      fullName: "",
      phoneNumber: "",
      address: "",
    };
  }

  changePassword() {
    this.v$.updateInfoForm.$touch();
    if (!this.v$.updateInfoForm.$invalid) {
      this.isLoading = true;
      accountService
        .updateProfile(this.updateInfoForm)
        .then((res) => {
          this.isLoading = false;
          this.resetForm();
          this.success = res.data.message;
          setTimeout(() => {
            this.success = "";
            this.$router.push("/tai-khoan");
          }, 3000);
        })
        .catch((err) => {
          this.isLoading = false;
          this.success = "";
          this.error = err.response.data.message;
        });
    }
  }

  created() {
    authService
      .getUserInfo()
      .then((res) => {
        this.user = res.data;
        this.updateInfoForm = {
          fullName: res.data.fullName,
          phoneNumber: res.data.phoneNumber || "",
          address: res.data.address || "",
        };
      })
      .catch(() => {
        this.$router.push("/");
      });
  }
}
</script>

<style lang="scss" scoped>
.btn {
  background-color: #fea82f;
  border-color: #fea82f;
  color: #fff;
  &:hover {
    color: #fff;
  }
}
</style>