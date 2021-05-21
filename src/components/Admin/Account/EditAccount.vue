<template>
  <div>
    <basic-card title="Chỉnh sửa tài khoản">
      <template v-slot:content>
        <div>
          <div v-if="error" class="alert alert-danger" role="alert">
            {{ error }}
          </div>
          <div v-if="successMessage" class="alert alert-success" role="alert">
            {{ successMessage }}
          </div>
          <div class="form-group">
            <label for="inputUsername-signup">Tên tài khoản</label>
            <input
              type="text"
              class="form-control"
              :class="[
                { 'is-invalid': isInvalid(v$.editAccountForm.username) },
              ]"
              v-model="v$.editAccountForm.username.$model"
              @focus="reset(v$.editAccountForm.username)"
              @input="reset(v$.editAccountForm.username)"
              id="inputUsername-signup"
            />
            <div class="invalid-feedback">
              <template v-for="error of v$.editAccountForm.username.$errors">
                {{ error.$message }}
              </template>
            </div>
          </div>
          <div class="form-group">
            <label for="inputName-signup">Họ và tên</label>
            <input
              type="text"
              class="form-control"
              :class="[
                { 'is-invalid': isInvalid(v$.editAccountForm.fullName) },
              ]"
              v-model="v$.editAccountForm.fullName.$model"
              @focus="reset(v$.editAccountForm.fullName)"
              @input="reset(v$.editAccountForm.fullName)"
              id="inputName-signup"
            />
            <div class="invalid-feedback">
              <template v-for="error of v$.editAccountForm.fullName.$errors">
                {{ error.$message }}
              </template>
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail-signup">Email</label>
            <input
              type="text"
              class="form-control"
              :class="[{ 'is-invalid': isInvalid(v$.editAccountForm.email) }]"
              v-model="v$.editAccountForm.email.$model"
              @focus="reset(v$.editAccountForm.email)"
              @input="reset(v$.editAccountForm.email)"
              id="inputEmail-signup"
            />
            <div class="invalid-feedback">
              <template v-for="error of v$.editAccountForm.email.$errors">
                {{ error.$message }}
              </template>
            </div>
          </div>
          <div class="form-group">
            <label for="inputAddress-signup">Địa chỉ</label>
            <input
              type="text"
              class="form-control"
              :class="[{ 'is-invalid': isInvalid(v$.editAccountForm.address) }]"
              v-model="v$.editAccountForm.address.$model"
              @focus="reset(v$.editAccountForm.address)"
              @input="reset(v$.editAccountForm.address)"
              id="inputAddress-signup"
            />
            <div class="invalid-feedback">
              <template v-for="error of v$.editAccountForm.address.$errors">
                {{ error.$message }}
              </template>
            </div>
          </div>
          <div class="form-group">
            <label for="inputPhoneNumber-signup">Số điện thoại</label>
            <input
              type="text"
              class="form-control"
              :class="[
                {
                  'is-invalid': isInvalid(v$.editAccountForm.phoneNumber),
                },
              ]"
              v-model="v$.editAccountForm.phoneNumber.$model"
              @focus="reset(v$.editAccountForm.phoneNumber)"
              @input="reset(v$.editAccountForm.phoneNumber)"
              id="inputPhoneNumber-signup"
            />
            <div class="invalid-feedback">
              <template v-for="error of v$.editAccountForm.phoneNumber.$errors">
                {{ error.$message }}
              </template>
            </div>
          </div>

          <button
            @click="createHandle"
            :disabled="isSignupDisabled"
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
import accountService, { AccountResponse } from "@/service/account-service";
import useVuelidate from "@vuelidate/core";
import {
  email,
  helpers,
  maxLength,
  minLength,
  required,
} from "@vuelidate/validators";
import { Component, Vue } from "vue-property-decorator";
import BasicCard from "../Card/BasicCard.vue";

export interface EditAccountForm {
  username: string;
  fullName: string;
  email: string;
  address: string;
  phoneNumber: string;
}

@Component({
  components: { BasicCard },
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  validations() {
    return {
      editAccountForm: {
        username: {
          required: helpers.withMessage(
            "Tài khoản không được để trống!",
            required
          ),
          minLength: helpers.withMessage(
            "Tài khoản phải từ 8 ký tự",
            minLength(8)
          ),
          maxLength: helpers.withMessage(
            "Tài khoản chỉ có tối đa 16 ký tự",
            maxLength(16)
          ),
        },
        fullName: {
          required: helpers.withMessage("Tên không được để trống!", required),
        },
        email: {
          required: helpers.withMessage("Email không được để trống!", required),
          email: helpers.withMessage("Email không đúng định dạng!", email),
        },
        address: {
          required: helpers.withMessage(
            "Địa chỉ không được để trống!",
            required
          ),
        },
        phoneNumber: {
          required: helpers.withMessage(
            "Số điện thoại không được để trống!",
            required
          ),
        },
      },
    };
  },
})
export default class extends Vue {
  account!: AccountResponse;
  v$!: any;

  error = "";

  isLoading = false;

  successMessage: string | null = "";

  editAccountForm: EditAccountForm = {
    username: "",
    fullName: "",
    email: "",
    address: "",
    phoneNumber: "",
  };

  isInvalid(field: { $invalid: boolean; $dirty: boolean }): boolean {
    return field.$invalid && field.$dirty;
  }

  isFormChanged(): boolean {
    if (this.account.username !== this.editAccountForm.username) {
      return true;
    }
    if (this.account.fullName !== this.editAccountForm.fullName) {
      return true;
    }
    if (this.account.address !== this.editAccountForm.address) {
      return true;
    }
    if (this.account.email !== this.editAccountForm.email) {
      return true;
    }
    if (this.account.phoneNumber !== this.editAccountForm.phoneNumber) {
      return true;
    }

    return false;
  }

  get isSignupDisabled() {
    return this.isLoading || !!this.error;
  }

  reset(field: { $reset: () => void }): void {
    field.$reset();
    this.error = "";
  }

  resetForm() {
    this.error = "";
    this.v$.editAccountForm.$reset();
    this.editAccountForm = {
      username: "",
      fullName: "",
      email: "",
      address: "",
      phoneNumber: "",
    };
  }

  createHandle(): void {
    if (!this.isFormChanged()) {
      this.error = "Thông tin chưa được thay đổi!";
      return;
    }
    this.v$.editAccountForm.$touch();
    if (!this.v$.$invalid) {
      this.isLoading = true;
      accountService
        .editAccount(this.account.id, this.editAccountForm)
        .then((res) => {
          this.successMessage = res.data.message + "";
          this.resetForm();
          this.error = "";
          this.isLoading = false;
          this.$router.push(
            this.$route.redirectedFrom || "/tai-khoan-nguoi-dung"
          );
        })
        .catch((err) => {
          this.error = err.response.data.message;
          this.isLoading = false;
        });
    }
  }

  created() {
    const id = this.$route.params["id"];
    if (id) {
      accountService
        .getUserById(id)
        .then((res) => {
          this.account = res.data;
          this.editAccountForm = {
            username: res.data.username,
            fullName: res.data.fullName,
            email: res.data.email,
            address: res.data.address,
            phoneNumber: res.data.phoneNumber,
          };
        })
        .catch(() => {
          if (this.$route.redirectedFrom) {
            this.$router.push(this.$route.redirectedFrom);
          } else {
            this.$router.go(-1);
          }
        });
    }
  }
}
</script>
