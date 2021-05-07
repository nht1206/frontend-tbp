<template>
  <div>
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>
    <div class="form-group">
      <label for="inputUsername">Tên tài khoản</label>
      <input
        type="text"
        class="form-control"
        :class="[{ 'is-invalid': isInvalid(v$.loginForm.username) }]"
        id="inputUsername"
        v-model="v$.loginForm.username.$model"
        @focus="reset(v$.loginForm.username)"
      />
      <div class="invalid-feedback">
        <template v-for="error of v$.loginForm.username.$errors">
          {{ error.$message }}
        </template>
      </div>
    </div>
    <div class="form-group">
      <label for="inputPassword">Mật khẩu</label>
      <input
        type="password"
        class="form-control"
        :class="[{ 'is-invalid': isInvalid(v$.loginForm.password) }]"
        id="inputPassword"
        @focus="reset(v$.loginForm.password)"
        v-model="v$.loginForm.password.$model"
      />
      <div class="invalid-feedback">
        <template v-for="error of v$.loginForm.password.$errors">
          {{ error.$message }}
        </template>
      </div>
    </div>
    <button
      type="submit"
      class="btn btn-primary wd-login-btn"
      @click="loginHandle"
    >
      Đăng nhập
    </button>

    <div class="form-check">
      <label class="form-check-label">
        <input type="checkbox" class="form-check-input" />
        Lưu mật khẩu
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import useVuelidate from "@vuelidate/core";
import { Component, Vue } from "vue-property-decorator";
import { required, helpers } from "@vuelidate/validators";
import { mapGetters } from "vuex";
import { LoginForm } from "@/mixins/LoginMixin";

@Component({
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  validations() {
    return {
      loginForm: {
        username: {
          required: helpers.withMessage(
            "Tài khoản không được để trống!",
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
  computed: {
    ...mapGetters({
      error: "auth/error",
    }),
  },
})
export default class extends Vue {
  v$!: any;

  error!: Error;

  loginForm: LoginForm = {
    username: "",
    password: "",
  };

  isInvalid(field: { $invalid: boolean; $dirty: boolean }): boolean {
    return field.$invalid && field.$dirty;
  }

  reset(field: { $reset: () => void }): void {
    field.$reset();
    this.$store.commit("auth/setError", null);
  }

  loginHandle(): void {
    this.v$.loginForm.$touch();
    if (!this.v$.$invalid) {
      this.$store.dispatch("auth/login", this.loginForm);
    }
  }
}
</script>