<template>
  <b-modal
    id="create-category-modal"
    title="Tạo mới danh mục"
    @shown="resetData"
  >
    <form>
      <div v-if="!!error" class="alert alert-danger">{{ error }}</div>
      <div class="form-group">
        <label for="inputTitle">Tên danh mục</label>
        <input
          type="text"
          class="form-control"
          :class="[{ 'is-invalid': isInvalid(v$.categoryForm.title) }]"
          id="inputTitle"
          placeholder="Nhập tên danh mục"
          v-model="v$.categoryForm.title.$model"
          @focus="reset(v$.categoryForm.title)"
          @input="reset(v$.categoryForm.title)"
        />
        <div class="invalid-feedback">
          <template v-for="error of v$.categoryForm.title.$errors">
            {{ error.$message }}
          </template>
        </div>
      </div>
      <div class="form-group">
        <label for="inputDescription">Mô tả</label>
        <textarea
          type="text"
          class="form-control"
          :class="[{ 'is-invalid': isInvalid(v$.categoryForm.description) }]"
          id="inputDescription"
          placeholder="Nhập mô tả"
          v-model="v$.categoryForm.description.$model"
          @focus="reset(v$.categoryForm.description)"
          @input="reset(v$.categoryForm.description)"
        />
        <div class="invalid-feedback">
          <template v-for="error of v$.categoryForm.description.$errors">
            {{ error.$message }}
          </template>
        </div>
      </div>
    </form>
    <template #modal-footer>
      <b-button
        variant="secondary"
        @click="$bvModal.hide('create-category-modal')"
        class="float-right"
      >
        Đóng
      </b-button>
      <b-button
        :disabled="isLoading"
        variant="warning"
        @click="submitCreate"
        class="float-right"
      >
        <div
          v-if="isLoading"
          class="spinner-border spinner-border-sm"
          role="status"
        >
          <span class="sr-only">Loading...</span>
        </div>
        Tạo mới
      </b-button>
    </template>
  </b-modal>
</template>

<script lang="ts">
import categoryService, {
  CreateCategoryPayload,
} from "@/service/category-service";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  validations() {
    return {
      categoryForm: {
        title: {
          required: helpers.withMessage(
            "Tên danh mục không được để trống!",
            required
          ),
        },
        description: {
          required: helpers.withMessage("Mô tả không được để trống!", required),
        },
      },
    };
  },
})
export default class extends Vue {
  v$!: any;

  error = "";

  isLoading = false;

  categoryForm: CreateCategoryPayload = {
    title: "",
    description: "",
  };

  isInvalid(field: { $invalid: boolean; $dirty: boolean }): boolean {
    return field.$invalid && field.$dirty;
  }

  reset(field: { $reset: () => void }): void {
    field.$reset();
    this.error = "";
  }

  resetData(): void {
    this.v$.categoryForm.$reset();
    this.categoryForm = {
      title: "",
      description: "",
    };
    this.error = "";
  }

  makeToast() {
    this.$store.commit("toast/setToastInfo", {
      message: `Danh mục "${this.categoryForm.title}" đã được tạo thành công`,
      title: "Tạo danh mục thành công",
      variant: "success",
    });
    this.$bvToast.show("messageToast");
  }

  submitCreate(): void {
    this.v$.categoryForm.$touch();
    if (!this.v$.categoryForm.$invalid) {
      this.isLoading = true;
      categoryService
        .createCategory(this.categoryForm)
        .then((res) => {
          this.isLoading = false;
          this.$bvModal.hide("create-category-modal");
          this.$store.dispatch("category/loadCategories");
          this.makeToast();
          this.categoryForm = {
            title: "",
            description: "",
          };
          this.v$.categoryForm.$reset();
        })
        .catch((err) => {
          this.isLoading = false;
          this.error = err.response.data.message;
        });
    }
  }
}
</script>