<template>
  <b-modal
    id="edit-sub-category-modal"
    title="Chỉnh sửa danh mục"
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
        @click="$bvModal.hide('edit-sub-category-modal')"
        class="float-right"
      >
        Đóng
      </b-button>
      <b-button variant="warning" @click="submitUpdate" class="float-right">
        Cập nhật
      </b-button>
    </template>
  </b-modal>
</template>

<script lang="ts">
import Category from "@/models/Category";
import categoryService, {
  CreateCategoryPayload,
  CreateSubCategoryPayload,
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
  @Prop({ required: false, type: Number })
  parentId!: number;

  error = "";

  success = "";

  categoryForm: CreateSubCategoryPayload = {
    title: "",
    description: "",
    parentId: this.parentId,
  };

  @Prop({ required: true })
  category!: Category;

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
      title: this.category.title,
      description: this.category.description || "",
      parentId: this.parentId,
    };
    this.error = "";
    this.success = "";
  }

  submitUpdate(): void {
    this.v$.categoryForm.$touch();
    if (!this.v$.categoryForm.$invalid) {
      //   this.$bvModal.hide("create-category-modal");
      categoryService
        .updateSubCategory(this.category.id, this.categoryForm)
        .then((res) => {
          this.success = res.data.message;
          setTimeout(() => {
            this.success = "";
          }, 5000);
          this.$store.dispatch("category/loadCategories");
        })
        .catch((err) => {
          this.error = err.response.data.message;
        });
    }
  }
}
</script>