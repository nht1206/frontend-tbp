<template>
  <div>
    <basic-card title="Cập nhật banner">
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
              :class="[{ 'is-invalid': isInvalid(v$.updateForm.title) }]"
              v-model="v$.updateForm.title.$model"
              @focus="reset(v$.updateForm.title)"
              @input="reset(v$.updateForm.title)"
              id="inputName"
            />
            <div class="invalid-feedback">
              <template v-for="error of v$.updateForm.title.$errors">
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
            <label for="inputImage">Hình ảnh</label>
            <input
              type="text"
              class="form-control"
              :class="[{ 'is-invalid': isInvalid(v$.updateForm.imageUrl) }]"
              v-model="v$.updateForm.imageUrl.$model"
              @focus="reset(v$.updateForm.imageUrl)"
              @input="reset(v$.updateForm.imageUrl)"
              id="inputImage"
            />
            <div class="invalid-feedback">
              <template v-for="error of v$.updateForm.imageUrl.$errors">
                {{ error.$message }}
              </template>
            </div>
          </div>
          <div class="form-group">
            <label for="inputUrl">Đường dẫn</label>
            <input
              type="text"
              class="form-control"
              :class="[{ 'is-invalid': isInvalid(v$.updateForm.redirectUrl) }]"
              v-model="v$.updateForm.redirectUrl.$model"
              @focus="reset(v$.updateForm.redirectUrl)"
              @input="reset(v$.updateForm.redirectUrl)"
              id="inputUrl"
            />
            <div class="invalid-feedback">
              <template v-for="error of v$.updateForm.redirectUrl.$errors">
                {{ error.$message }}
              </template>
            </div>
          </div>
          <button
            @click="updateHandle"
            :disabled="isUpdateDisabled"
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
      updateForm: {
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
  id!: string;
  v$!: any;

  error = "";

  isLoading = false;

  updateForm: BannerPayload = {
    title: "",
    description: "",
    imageUrl: "",
    redirectUrl: "",
  };

  isInvalid(field: { $invalid: boolean; $dirty: boolean }): boolean {
    return field.$invalid && field.$dirty;
  }

  get isUpdateDisabled() {
    return this.isLoading || !!this.error;
  }

  reset(field: { $reset: () => void }): void {
    field.$reset();
    this.error = "";
  }

  resetForm() {
    this.error = "";
    this.v$.updateForm.$reset();
    this.updateForm = {
      title: "",
      description: "",
      imageUrl: "",
      redirectUrl: "",
    };
  }

  makeToast() {
    this.$store.commit("toast/setToastInfo", {
      message: `Banner "${this.updateForm.title}" đã được cập nhật thành công`,
      title: "Cập nhật banner thành công",
      variant: "success",
    });
    this.$bvToast.show("messageToast");
  }

  updateHandle(): void {
    this.v$.updateForm.$touch();
    if (!this.v$.$invalid) {
      this.isLoading = true;
      bannerService
        .updateBanner(this.id, this.updateForm)
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

  created() {
    this.id = this.$route.params["id"];
    bannerService
      .findById(this.id)
      .then((res) => {
        this.updateForm = {
          title: res.data.title,
          description: res.data.description,
          imageUrl: res.data.imageUrl,
          redirectUrl: res.data.redirectUrl,
        };
      })
      .catch(() => {
        this.$router.go(-1);
      });
  }
}
</script>
