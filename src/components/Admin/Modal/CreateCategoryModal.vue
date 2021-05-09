<template>
  <b-modal
    id="create-category-modal"
    title="Tạo mới danh mục"
    @shown="resetData"
  >
    <form>
      <div v-if="!!success" class="alert alert-success">{{ success }}</div>
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
      <b-button variant="warning" @click="submitCreate" class="float-right">
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
import { Component, Vue } from "vue-property-decorator";

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

  success = "";

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
    this.success = "";
  }

  submitCreate(): void {
    this.v$.categoryForm.$touch();
    if (!this.v$.categoryForm.$invalid) {
      //   this.$bvModal.hide("create-category-modal");
      categoryService
        .createCategory(this.categoryForm)
        .then((res) => {
          this.success = res.data.message;
          setTimeout(() => {
            this.success = "";
          }, 5000);
          this.categoryForm = {
            title: "",
            description: "",
          };
          this.$store.dispatch("category/loadCategories");
        })
        .catch((err) => {
          this.error = err.response.data.message;
        });
    }
  }
}
</script>