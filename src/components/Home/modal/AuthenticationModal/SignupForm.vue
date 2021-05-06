<template>
  <div>
    <div class="alert alert-danger" role="alert">
      Tài khoản hoặc mật khẩu không chính xác!
    </div>
    <div class="form-group">
      <label for="inputUsername-signup">Tên tài khoản</label>
      <input
        type="text"
        class="form-control"
        :class="[{ 'is-invalid': isInvalid(v$.signupForm.username) }]"
        v-model="v$.signupForm.username.$model"
        @focus="reset(v$.signupForm.username)"
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
        id="nputPassword-signup"
      />
      <div class="invalid-feedback">
        <template v-for="error of v$.signupForm.password.$errors">
          {{ error.$message }}
        </template>
      </div>
    </div>
    <button
      @click="signupHandle"
      type="submit"
      class="btn btn-primary wd-login-btn"
    >
      Đăng ký
    </button>
  </div>
</template>

<script lang="ts">
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { Component, Vue } from "vue-property-decorator";

interface SignupForm {
  username: string;
  fullName: string;
  email: string;
  address: string;
  phoneNumber: string;
  password: string;
}

@Component({
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
        },
        fullName: {
          required: helpers.withMessage("Tên không được để trống!", required),
        },
        email: {
          required: helpers.withMessage("Email không được để trống!", required),
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
        },
      },
    };
  },
})
export default class extends Vue {
  v$!: any;
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

  reset(field: { $reset: () => void }): void {
    field.$reset();
  }

  signupHandle(): void {
    this.v$.signupForm.$touch();
    if (!this.v$.$invalid) {
      console.log(this.signupForm);
    }
  }
}
</script>
