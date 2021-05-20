<template>
  <div>
    <basic-card title="Cập nhật sản phẩm">
      <template v-slot:content>
        <div>
          <div v-if="error" class="alert alert-danger" role="alert">
            {{ error }}
          </div>
          <div v-if="successMessage" class="alert alert-success" role="alert">
            {{ successMessage }}
          </div>
          <div class="form-group">
            <label for="inputTitle">Tiêu đề</label>
            <input
              type="text"
              class="form-control"
              :class="[{ 'is-invalid': isInvalid(v$.updateForm.title) }]"
              v-model="v$.updateForm.title.$model"
              @focus="reset(v$.updateForm.title)"
              @input="reset(v$.updateForm.title)"
              id="inputTitle"
            />
            <div class="invalid-feedback">
              <template v-for="error of v$.updateForm.title.$errors">
                {{ error.$message }}
              </template>
            </div>
          </div>
          <div class="form-group">
            <label for="inputShortDescription">Mô tả ngắn</label>
            <textarea
              type="text"
              class="form-control"
              :class="[
                { 'is-invalid': isInvalid(v$.updateForm.shortDescription) },
              ]"
              v-model="v$.updateForm.shortDescription.$model"
              @focus="reset(v$.updateForm.shortDescription)"
              @input="reset(v$.updateForm.shortDescription)"
              id="inputShortDescription"
            />
            <div class="invalid-feedback">
              <template v-for="error of v$.updateForm.shortDescription.$errors">
                {{ error.$message }}
              </template>
            </div>
          </div>
          <div class="form-group">
            <label for="inputLongDescription">Mô tả dài</label>
            <textarea
              type="text"
              class="form-control"
              :class="[
                { 'is-invalid': isInvalid(v$.updateForm.longDescription) },
              ]"
              v-model="v$.updateForm.longDescription.$model"
              @focus="reset(v$.updateForm.longDescription)"
              @input="reset(v$.updateForm.longDescription)"
              id="inputLongDescription"
            />
            <div class="invalid-feedback">
              <template v-for="error of v$.updateForm.longDescription.$errors">
                {{ error.$message }}
              </template>
            </div>
          </div>
          <dynamic-image-input
            v-if="!isLoading"
            :isInvalid="isInvalid(v$.updateForm.images)"
            :errors="v$.updateForm.images.$errors"
            @change="onImagesChange"
            @reset="reset(v$.updateForm.images)"
            :existedImages="v$.updateForm.images.$model"
          ></dynamic-image-input>
          <div class="form-group">
            <label for="selectBrand">Nhãn hiệu</label>
            <select
              v-if="!isLoading"
              class="form-control"
              :class="[{ 'is-invalid': isInvalid(v$.updateForm.brandId) }]"
              v-model="v$.updateForm.brandId.$model"
              @focus="reset(v$.updateForm.brandId)"
              @input="reset(v$.updateForm.brandId)"
              id="selectBrand"
            >
              <option v-for="b in brands" :key="b.id" :value="b.id">
                {{ b.name }}
              </option>
            </select>
            <div class="invalid-feedback">
              <template v-for="error of v$.updateForm.brandId.$errors">
                {{ error.$message }}
              </template>
            </div>
          </div>
          <div class="form-group">
            <label for="selectBrand">Danh mục</label>
            <select
              v-if="!isLoading"
              class="form-control"
              :class="[{ 'is-invalid': isInvalid(v$.updateForm.categoryId) }]"
              v-model="v$.updateForm.categoryId.$model"
              @focus="reset(v$.updateForm.categoryId)"
              @input="reset(v$.updateForm.categoryId)"
              id="selectBrand"
            >
              <option v-for="c in categories" :key="c.id" :value="c.id">
                {{ c.title }}
              </option>
            </select>
            <div class="invalid-feedback">
              <template v-for="error of v$.updateForm.categoryId.$errors">
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
import Brand from "@/models/Brand";
import Category from "@/models/Category";
import categoryService from "@/service/category-service";
import brandService from "@/service/brand-service";
import productService, { ProductPayload } from "@/service/product-service";
import useVuelidate from "@vuelidate/core";
import { helpers, minLength, required } from "@vuelidate/validators";
import { Component, Vue } from "vue-property-decorator";
import BasicCard from "../Card/BasicCard.vue";
import DynamicImageInput from "./DynamicImageInput.vue";

@Component({
  components: { BasicCard, DynamicImageInput },
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
        shortDescription: {
          required: helpers.withMessage("Mô tả không được để trống!", required),
        },
        longDescription: {
          required: helpers.withMessage("Mô tả không được để trống!", required),
        },
        images: {
          required: helpers.withMessage("Bắt buộc ít nhất 3 ảnh!", required),
          minLength: helpers.withMessage(
            "Bắt buộc ít nhất 3 ảnh!",
            minLength(3)
          ),
        },
        brandId: {},
        categoryId: {},
      },
    };
  },
})
export default class extends Vue {
  v$!: any;

  error = "";

  isLoading = false;

  successMessage: string | null = "";

  id!: string;

  categories: Category[] = [];
  brands: Brand[] = [];

  updateForm: ProductPayload = {
    title: "",
    brandId: 0,
    categoryId: 0,
    images: [],
    shortDescription: "",
    longDescription: "",
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
      brandId: 0,
      categoryId: 0,
      images: [],
      shortDescription: "",
      longDescription: "",
    };
  }

  onImagesChange(images: string[]) {
    this.v$.updateForm.images.$model = images;
  }

  updateHandle(): void {
    this.v$.updateForm.$touch();
    if (!this.v$.$invalid) {
      this.isLoading = true;
      productService
        .updateProduct(this.id, this.updateForm)
        .then((res) => {
          console.log(this.updateForm.images);
          this.successMessage = res.data.message + "";
          this.resetForm();
          this.error = "";
          this.isLoading = false;
          this.$router.push("/san-pham-da-duyet");
        })
        .catch((err) => {
          this.error = err.response.data.message;
          this.isLoading = false;
        });
    }
  }

  mounted() {
    this.isLoading = true;

    this.id = this.$route.params["id"];
    productService
      .findById(this.id)
      .then((res) => {
        this.updateForm = {
          brandId: res.data.brand.id,
          categoryId: res.data.category.id,
          images: res.data.images,
          longDescription: res.data.longDescription,
          shortDescription: res.data.shortDescription,
          title: res.data.title,
        };
        categoryService.getSubCategories().then((res) => {
          if (res.data && res.data.length > 0) {
            this.categories = res.data;
          }
        });
        brandService.getBrands().then((res) => {
          if (res.data && res.data.length > 0) {
            this.brands = res.data;
          }
        });
        this.isLoading = false;
      })
      .catch(() => {
        this.isLoading = false;
        this.$router.push(this.$route.redirectedFrom || "/danh-sach-san-pham");
      });
  }
}
</script>
