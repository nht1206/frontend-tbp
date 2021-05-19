<template>
  <div class="row">
    <div class="col-12">
      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
      >
        <h1 class="h4">
          Thông tin cá nhân
          <router-link to="/cap-nhat-thong-tin" custom v-slot="{ navigate }">
            <i @click="navigate" class="fas fa-edit"></i>
          </router-link>
        </h1>
      </div>
    </div>
    <div v-if="!!user" class="col-md-12 col-lg-6">
      <ul class="list-group mt-2">
        <li class="list-group-item">
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">Tên tài khoản</h6>
            </div>
            <div class="col-sm-9 text-secondary">{{ user.username }}</div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">Họ và tên</h6>
            </div>
            <div class="col-sm-9 text-secondary">{{ user.fullName }}</div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">Địa chỉ email</h6>
            </div>
            <div class="col-sm-9 text-secondary">{{ user.email }}</div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">Số điện thoại</h6>
            </div>
            <div class="col-sm-9 text-secondary">{{ user.phoneNumber }}</div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">Địa chỉ</h6>
            </div>
            <div class="col-sm-9 text-secondary">
              {{ user.address }}
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="col-md-12 col-lg-6">
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
              <label for="inputCurrentPassword">Mật khẩu hiện tại</label>
              <input
                type="password"
                class="form-control"
                id="inputCurrentPassword"
                :class="[
                  {
                    'is-invalid': isInvalid(
                      v$.changePasswordForm.currentPassword
                    ),
                  },
                ]"
                v-model="v$.changePasswordForm.currentPassword.$model"
                @focus="reset(v$.changePasswordForm.currentPassword)"
                @input="reset(v$.changePasswordForm.currentPassword)"
              />
              <div class="invalid-feedback">
                <template
                  v-for="error of v$.changePasswordForm.currentPassword.$errors"
                >
                  {{ error.$message }}
                </template>
              </div>
            </div>
            <div class="form-group">
              <label for="inputNewPassword">Mật khẩu mới</label>
              <input
                type="password"
                class="form-control"
                id="inputNewPassword"
                :class="[
                  {
                    'is-invalid': isInvalid(v$.changePasswordForm.newPassword),
                  },
                ]"
                v-model="v$.changePasswordForm.newPassword.$model"
                @focus="reset(v$.changePasswordForm.newPassword)"
                @input="reset(v$.changePasswordForm.newPassword)"
              />
              <div class="invalid-feedback">
                <template
                  v-for="error of v$.changePasswordForm.newPassword.$errors"
                >
                  {{ error.$message }}
                </template>
              </div>
            </div>
            <div class="form-group">
              <label for="inputConfirmPassword">Xác nhận mật khẩu mới</label>
              <input
                type="password"
                class="form-control"
                id="inputConfirmPassword"
                :class="[
                  {
                    'is-invalid': isInvalid(
                      v$.changePasswordForm.confirmPassword
                    ),
                  },
                ]"
                v-model="v$.changePasswordForm.confirmPassword.$model"
                @focus="reset(v$.changePasswordForm.confirmPassword)"
                @input="reset(v$.changePasswordForm.confirmPassword)"
              />
              <div class="invalid-feedback">
                <template
                  v-for="error of v$.changePasswordForm.confirmPassword.$errors"
                >
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
              Đổi mật khẩu
            </button>
          </div>
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
import { helpers, minLength, required, sameAs } from "@vuelidate/validators";
import { Component, Vue } from "vue-property-decorator";

interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

@Component({
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  validations() {
    return {
      changePasswordForm: {
        currentPassword: {
          required: helpers.withMessage(
            "Mật khẩu hiện tại không được để trống!",
            required
          ),
          minLength: helpers.withMessage(
            "Mật khẩu hiện tại phải từ 8 ký tự",
            minLength(8)
          ),
        },
        newPassword: {
          required: helpers.withMessage(
            "Mật khẩu mới không được để trống!",
            required
          ),
          minLength: helpers.withMessage(
            "Mật khẩu mới phải từ 8 ký tự",
            minLength(8)
          ),
        },
        confirmPassword: {
          required: helpers.withMessage(
            "Xác nhận mật khẩu không được để trống!",
            required
          ),
          minLength: helpers.withMessage(
            "Xác nhận mật khẩu mới phải từ 8 ký tự",
            minLength(8)
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

  changePasswordForm: ChangePasswordForm = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
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
    this.v$.changePasswordForm.$reset();
    this.error = "";
    this.changePasswordForm = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
  }

  changePassword() {
    this.v$.changePasswordForm.$touch();
    if (!this.v$.changePasswordForm.$invalid) {
      this.isLoading = true;
      accountService
        .changePassword({
          currentPassword: this.changePasswordForm.currentPassword,
          newPassword: this.changePasswordForm.newPassword,
        })
        .then((res) => {
          this.isLoading = false;
          this.resetForm();
          this.success = res.data.message;
          setTimeout(() => {
            this.success = "";
          }, 5000);
        })
        .catch((err) => {
          this.isLoading = false;
          this.resetForm();
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
      })
      .catch(() => {
        this.$router.push("/");
      });
  }
}
</script>

<style lang="scss" scoped>
.fa-edit {
  margin: 0 5px;
  cursor: pointer;
  color: #fea82f;
}
.list-group-item {
  font-size: 16px;
  color: #333333;
  .text-secondary {
    color: #6c757d !important;
  }
}

.btn {
  background-color: #fea82f;
  border-color: #fea82f;
  color: #fff;
  &:hover {
    color: #fff;
  }
}
</style>