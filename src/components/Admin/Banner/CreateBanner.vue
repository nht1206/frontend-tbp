<template>
  <div>
    <basic-card title="Thêm mới banner">
      <template v-slot:content>
        <div>
          <div v-if="error" class="alert alert-danger" role="alert">
            {{ error }}
          </div>
          <div class="form-group">
            <label for="inputName">Tiêu đề</label>
            <input
              type="text"
              class="form-control"
              :class="[{ 'is-invalid': isInvalid(v$.createForm.title) }]"
              v-model="v$.createForm.title.$model"
              @focus="reset(v$.createForm.title)"
              @input="reset(v$.createForm.title)"
              id="inputName"
            />
            <div class="invalid-feedback">
              <template v-for="error of v$.createForm.title.$errors">
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
            <label for="inputImage">Hình ảnh</label>
            <input
              type="text"
              class="form-control"
              :class="[{ 'is-invalid': isInvalid(v$.createForm.imageUrl) }]"
              v-model="v$.createForm.imageUrl.$model"
              @focus="reset(v$.createForm.imageUrl)"
              @input="reset(v$.createForm.imageUrl)"
              id="inputImage"
            />
            <div class="invalid-feedback">
              <template v-for="error of v$.createForm.imageUrl.$errors">
                {{ error.$message }}
              </template>
            </div>
          </div>
          <div class="form-group">
            <label for="inputUrl">Đường dẫn</label>
            <input
              type="text"
              class="form-control"
              :class="[{ 'is-invalid': isInvalid(v$.createForm.redirectUrl) }]"
              v-model="v$.createForm.redirectUrl.$model"
              @focus="reset(v$.createForm.redirectUrl)"
              @input="reset(v$.createForm.redirectUrl)"
              id="inputUrl"
            />
            <div class="invalid-feedback">
              <template v-for="error of v$.createForm.redirectUrl.$errors">
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
            Thêm banner
          </button>
        </div>
      </template>
    </basic-card>
  </div>
</template>

<script lang="ts">
import bannerService, { BannerPayload } from "@/service/banner-service";
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
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
      createForm: {
        title: {
          required: helpers.withMessage(
            "Tiêu đề không được để trống!",
            required
          ),
        },
        description: {
          required: helpers.withMessage("Mô tả không được để trống!", required),
        },
        imageUrl: {
          required: helpers.withMessage(
            "Hình ảnh không được để trống!",
            required
          ),
        },
        redirectUrl: {
          required: helpers.withMessage(
            "Đường dẫn không được để trống!",
            required
          ),
        },
      },
    };
  },
})
export default class extends Vue {
  v$!: any;

  error = "";

  isLoading = false;

  createForm: BannerPayload = {
    title: "",
    description: "",
    imageUrl: "",
    redirectUrl: "",
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
      title: "",
      description: "",
      imageUrl: "",
      redirectUrl: "",
    };
  }

  makeToast() {
    this.$store.commit("toast/setToastInfo", {
      message: `Banner "${this.createForm.title}" đã được tạo thành công`,
      title: "Tạo banner thành công",
      variant: "success",
    });
    this.$bvToast.show("messageToast");
  }

  createHandle(): void {
    this.v$.createForm.$touch();
    if (!this.v$.$invalid) {
      this.isLoading = true;
      bannerService
        .createBanner(this.createForm)
        .then((res) => {
          this.error = "";
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
