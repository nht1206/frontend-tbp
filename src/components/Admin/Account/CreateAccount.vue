<template>
  <div>
    <basic-card title="Tạo tài khoản người dùng">
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
              :class="[{ 'is-invalid': isInvalid(v$.signupForm.username) }]"
              v-model="v$.signupForm.username.$model"
              @focus="reset(v$.signupForm.username)"
              @input="reset(v$.signupForm.username)"
              id="inputUsername-signup"
            />
            <div class="invalid-feedback">
              <template v-for="error of v$.signupForm.username.$errors">
                {{ error.$message }}
              </template>
            </div>
          </div>
          <div class="form-group">
            <label for="inputName-signup">Họ và tên</label>
            <input
              type="text"
              class="form-control"
              :class="[{ 'is-invalid': isInvalid(v$.signupForm.fullName) }]"
              v-model="v$.signupForm.fullName.$model"
              @focus="reset(v$.signupForm.fullName)"
              @input="reset(v$.signupForm.fullName)"
              id="inputName-signup"
            />
            <div class="invalid-feedback">
              <template v-for="error of v$.signupForm.fullName.$errors">
                {{ error.$message }}
              </template>
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail-signup">Email</label>
            <input
              type="text"
              class="form-control"
              :class="[{ 'is-invalid': isInvalid(v$.signupForm.email) }]"
              v-model="v$.signupForm.email.$model"
              @focus="reset(v$.signupForm.email)"
              @input="reset(v$.signupForm.email)"
              id="inputEmail-signup"
            />
            <div class="invalid-feedback">
              <template v-for="error of v$.signupForm.email.$errors">
                {{ error.$message }}
              </template>
            </div>
          </div>
          <div class="form-group">
            <label for="inputAddress-signup">Địa chỉ</label>
            <input
              type="text"
              class="form-control"
              :class="[{ 'is-invalid': isInvalid(v$.signupForm.address) }]"
              v-model="v$.signupForm.address.$model"
              @focus="reset(v$.signupForm.address)"
              @input="reset(v$.signupForm.address)"
              id="inputAddress-signup"
            />
            <div class="invalid-feedback">
              <template v-for="error of v$.signupForm.address.$errors">
                {{ error.$message }}
              </template>
            </div>
          </div>
          <div class="form-group">
            <label for="inputPhoneNumber-signup">Số điện thoại</label>
            <input
              type="text"
              class="form-control"
              :class="[{ 'is-invalid': isInvalid(v$.signupForm.phoneNumber) }]"
              v-model="v$.signupForm.phoneNumber.$model"
              @focus="reset(v$.signupForm.phoneNumber)"
              @input="reset(v$.signupForm.phoneNumber)"
              id="inputPhoneNumber-signup"
            />
            <div class="invalid-feedback">
              <template v-for="error of v$.signupForm.phoneNumber.$errors">
                {{ error.$message }}
              </template>
            </div>
          </div>
          <div class="form-group">
            <label for="inputPassword-signup">Mật khẩu</label>
            <input
              type="password"
              class="form-control"
              :class="[{ 'is-invalid': isInvalid(v$.signupForm.password) }]"
              v-model="v$.signupForm.password.$model"
              @focus="reset(v$.signupForm.password)"
              @input="reset(v$.signupForm.password)"
              id="nputPassword-signup"
            />
            <div class="invalid-feedback">
              <template v-for="error of v$.signupForm.password.$errors">
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
            Tạo tài khoản
          </button>
        </div>
      </template>
    </basic-card>
  </div>
</template>

<script lang="ts">
import { SignupForm } from "@/components/Home/modal/AuthenticationModal/SignupForm.vue";
import accountService from "@/service/account-service";
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

@Component({
  components: { BasicCard },
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  validations() {
    return {
      signupForm: {
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
        password: {
          required: helpers.withMessage(
            "Mật khẩu không được để trống!",
            required
          ),
          minLength: helpers.withMessage(
            "Mật khẩu phải từ 8 ký tự",
            minLength(8)
          ),
          maxLength: helpers.withMessage(
            "Mật chỉ có tối đa 16 ký tự",
            maxLength(16)
          ),
        },
      },
    };
  },
})
export default class extends Vue {
  v$!: any;

  error: Error | null = null;

  isLoading = false;

  successMessage: string | null = "";

  signupForm: SignupForm = {
    username: "",
    fullName: "",
    email: "",
    address: "",
    phoneNumber: "",
    password: "",
  };

  isInvalid(field: { $invalid: boolean; $dirty: boolean }): boolean {
    return field.$invalid && field.$dirty;
  }

  get isSignupDisabled() {
    return this.isLoading || !!this.error;
  }

  reset(field: { $reset: () => void }): void {
    field.$reset();
    this.error = null;
  }

  resetForm() {
    this.error = null;
    this.v$.signupForm.$reset();
    this.signupForm = {
      username: "",
      fullName: "",
      email: "",
      address: "",
      phoneNumber: "",
      password: "",
    };
  }

  makeToast() {
    this.$store.commit("toast/setToastInfo", {
      message: `Tài khoản "${this.signupForm.username}" đã được tạo thành công`,
      title: "Tạo tài khoản thành công",
      variant: "success",
    });
    this.$bvToast.show("messageToast");
  }

  createHandle(): void {
    this.v$.signupForm.$touch();
    if (!this.v$.$invalid) {
      this.isLoading = true;
      accountService
        .createGuestAccount(this.signupForm)
        .then((res) => {
          this.successMessage = res.data.message + "";
          this.error = null;
          this.isLoading = false;
          this.$router.go(-1);
          this.makeToast();
          this.resetForm();
        })
        .catch((err) => {
          this.error = err.response.data.message;
          this.isLoading = false;
        });
    }
  }
}
</script>
