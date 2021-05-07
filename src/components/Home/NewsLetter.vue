<template>
  <section id="subscribe">
    <div class="container">
      <div class="row subscribe-body">
        <div class="col-12 col-md-12 col-lg-5">
          <h4 class="subscribe-title">Đăng ký để cập nhật mới nhất</h4>
        </div>
        <div class="col-12 col-md-9 col-lg-5 p0">
          <div class="input-group h-100">
            <input
              type="text"
              class="form-control h-100"
              :class="[
                { 'is-invalid': isEmailInvalid },
                { 'is-valid': success },
              ]"
              aria-label="Text input with segmented button dropdown"
              v-model="v$.email.$model"
              @input="reset"
              @focus="reset"
            />
            <div v-if="success" class="valid-feedback">{{ success }}</div>
            <div v-if="isEmailInvalid" class="invalid-feedback">
              <p v-if="error">
                {{ error }}
              </p>
              <template v-for="err of v$.email.$errors">
                {{ err.$message }}
              </template>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-3 col-lg-2">
          <button
            @click="subscribe"
            :disabled="isLoading || !!error"
            type="button"
            class="btn wd-shop-btn subscribe-btn"
          >
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import useVuelidate from "@vuelidate/core";
import { Component, Vue } from "vue-property-decorator";
import { helpers, email, required } from "@vuelidate/validators";
import subscribeService from "@/service/subscribe-service";

@Component({
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  validations() {
    return {
      email: {
        email: helpers.withMessage("Email không đúng định dạng", email),
        required: helpers.withMessage(
          "Vui lòng nhập vào địa chỉ email",
          required
        ),
      },
    };
  },
})
export default class extends Vue {
  v$!: any;

  isLoading = false;

  email = "";

  success = "";

  error = "";

  get isEmailInvalid(): boolean {
    return !!this.error || (this.v$.email.$invalid && this.v$.email.$dirty);
  }

  reset(): void {
    this.v$.email.$reset();
    this.error = "";
  }

  subscribe(): void {
    this.v$.email.$touch();
    if (!this.v$.$invalid) {
      this.isLoading = true;
      subscribeService
        .subscribe({
          email: this.email,
        })
        .then((res) => {
          this.success = res.data.message;
          this.isLoading = false;
        })
        .catch((err) => {
          this.error = err.response.data.message;
          this.isLoading = false;
          this.success = "";
        });
    }
  }
}
</script>

<style lang="scss" scoped>
#subscribe {
  .subscribe-body {
    background: white;
    padding: 20px;
    box-shadow: 0px 0px 42px 0px rgba(130, 156, 199, 0.2);
    transform: translateY(37px);
    position: relative;
    z-index: 10;
    text-align: center;
  }
  .wd-shop-btn {
    padding: 8px 21px;
    color: bisque;

    &:hover {
      color: #ff9800;
    }
  }
  .subscribe-title {
    padding-top: 7px;
    font-weight: 300;
  }
  .subscribe-btn {
    cursor: pointer;
    &:hover {
      border-color: #ff9800;
    }
  }
}
@media (max-width: 575px) {
  .subscribe-body {
    padding: 20px 0;
  }
  .subscribe-btn {
    margin-top: 10px;
  }
}
@media (max-width: 991px) {
  .subscribe-title {
    font-size: 18px;
    margin-bottom: 15px;
  }
}
@media (max-width: 767px) {
  .subscribe-title {
    font-size: 18px;
    margin-bottom: 15px;
  }
  .subscribe-btn {
    margin-top: 15px;
  }
}
</style>
