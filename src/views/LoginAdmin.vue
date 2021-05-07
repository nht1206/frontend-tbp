<template>
  <div class="container">
    <!-- Outer Row -->
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="row">
              <div class="col-lg-12">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">The best price</h1>
                  </div>
                  <form class="user">
                    <div v-if="error" class="alert alert-danger" role="alert">
                      {{ error }}
                    </div>
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control form-control-user"
                        :class="[
                          { 'is-invalid': isInvalid(v$.loginForm.username) },
                        ]"
                        id="inputUsername"
                        v-model="v$.loginForm.username.$model"
                        @focus="reset(v$.loginForm.username)"
                        aria-describedby="username"
                        placeholder="Nhập tên đăng nhập"
                      />
                      <div class="invalid-feedback">
                        <template
                          v-for="error of v$.loginForm.username.$errors"
                        >
                          {{ error.$message }}
                        </template>
                      </div>
                    </div>
                    <div class="form-group">
                      <input
                        type="password"
                        class="form-control form-control-user"
                        :class="[
                          { 'is-invalid': isInvalid(v$.loginForm.password) },
                        ]"
                        id="inputPassword"
                        @focus="reset(v$.loginForm.password)"
                        v-model="v$.loginForm.password.$model"
                        placeholder="Nhập mật khẩu"
                      />
                      <div class="invalid-feedback">
                        <template
                          v-for="error of v$.loginForm.password.$errors"
                        >
                          {{ error.$message }}
                        </template>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="custom-control custom-checkbox small">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="customCheck"
                        />
                        <label class="custom-control-label" for="customCheck"
                          >Nhớ mật khẩu</label
                        >
                      </div>
                    </div>
                    <a
                      @click="loginHandle"
                      class="btn btn-primary btn-user btn-block btn-login"
                    >
                      Đăng nhập
                    </a>
                  </form>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import "@fortawesome/fontawesome-free/css/all.min.css";

import "@/assets/styles/sb-admin-2.min.css";
import "@/assets/js/sb-admin-2.min";
import useVuelidate from "@vuelidate/core";
import { helpers, maxLength, minLength, required } from "@vuelidate/validators";
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
          minLength: helpers.withMessage(
            "Tài khoản phải từ 8 ký tự",
            minLength(8)
          ),
          maxLength: helpers.withMessage(
            "Tài khoản chỉ có tối đa 16 ký tự",
            maxLength(16)
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
            "Mật khẩu chỉ có tối đa 16 ký tự",
            maxLength(16)
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

<style lang="scss" scoped>
.btn-login {
  background-color: #fea82f;
  border-color: #fea82f;
  cursor: pointer;
}
</style>