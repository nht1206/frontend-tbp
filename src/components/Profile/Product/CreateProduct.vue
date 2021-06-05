<template>
  <div class="mb-3">
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h4">Đăng sản phẩm</h1>
    </div>
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
          :class="[{ 'is-invalid': isInvalid(v$.createForm.title) }]"
          v-model="v$.createForm.title.$model"
          @focus="reset(v$.createForm.title)"
          @input="reset(v$.createForm.title)"
          id="inputTitle"
        />
        <div class="invalid-feedback">
          <template v-for="error of v$.createForm.title.$errors">
            {{ error.$message }}
          </template>
        </div>
      </div>
      <div class="form-group">
        <label for="inputShortDescription">Mô tả ngắn</label>
        <textarea
          type="text"
          class="form-control"
          :class="[{ 'is-invalid': isInvalid(v$.createForm.shortDescription) }]"
          v-model="v$.createForm.shortDescription.$model"
          @focus="reset(v$.createForm.shortDescription)"
          @input="reset(v$.createForm.shortDescription)"
          id="inputShortDescription"
        />
        <div class="invalid-feedback">
          <template v-for="error of v$.createForm.shortDescription.$errors">
            {{ error.$message }}
          </template>
        </div>
      </div>
      <div class="form-group">
        <label for="inputLongDescription">Mô tả dài</label>
        <textarea
          type="text"
          class="form-control"
          :class="[{ 'is-invalid': isInvalid(v$.createForm.longDescription) }]"
          v-model="v$.createForm.longDescription.$model"
          @focus="reset(v$.createForm.longDescription)"
          @input="reset(v$.createForm.longDescription)"
          id="inputLongDescription"
        />
        <div class="invalid-feedback">
          <template v-for="error of v$.createForm.longDescription.$errors">
            {{ error.$message }}
          </template>
        </div>
      </div>
      <dynamic-image-input
        :isInvalid="isInvalid(v$.createForm.images)"
        :errors="v$.createForm.images.$errors"
        @change="onImagesChange"
        @reset="reset(v$.createForm.images)"
      ></dynamic-image-input>
      <div class="form-group">
        <label for="selectBrand">Nhãn hiệu</label>
        <select
          class="form-control"
          :class="[{ 'is-invalid': isInvalid(v$.createForm.brandId) }]"
          v-model="v$.createForm.brandId.$model"
          @focus="reset(v$.createForm.brandId)"
          @input="reset(v$.createForm.brandId)"
          id="selectBrand"
        >
          <option v-for="b in brands" :key="b.id" :value="b.id">
            {{ b.name }}
          </option>
        </select>
        <div class="invalid-feedback">
          <template v-for="error of v$.createForm.brandId.$errors">
            {{ error.$message }}
          </template>
        </div>
      </div>
      <div class="form-group">
        <label for="selectBrand">Danh mục</label>
        <select
          class="form-control"
          :class="[{ 'is-invalid': isInvalid(v$.createForm.categoryId) }]"
          v-model="v$.createForm.categoryId.$model"
          @focus="reset(v$.createForm.categoryId)"
          @input="reset(v$.createForm.categoryId)"
          id="selectBrand"
        >
          <option v-for="c in categories" :key="c.id" :value="c.id">
            {{ c.title }}
          </option>
        </select>
        <div class="invalid-feedback">
          <template v-for="error of v$.createForm.categoryId.$errors">
            {{ error.$message }}
          </template>
        </div>
      </div>
      <div class="form-group">
        <label for="selectRetailer">Cửa hàng</label>
        <select
          class="form-control"
          :class="[{ 'is-invalid': isInvalid(v$.createForm.retailerId) }]"
          v-model="v$.createForm.retailerId.$model"
          @focus="reset(v$.createForm.retailerId)"
          @input="reset(v$.createForm.retailerId)"
          id="selectRetailer"
        >
          <option v-for="r in retailers" :key="r.id" :value="r.id">
            {{ r.name }}
          </option>
        </select>
        <div class="invalid-feedback">
          <template v-for="error of v$.createForm.retailerId.$errors">
            {{ error.$message }}
          </template>
        </div>
      </div>
      <div class="form-group">
        <label for="inputPrice">Đường dẫn</label>
        <input
          type="text"
          class="form-control"
          :class="[{ 'is-invalid': isInvalid(v$.createForm.url) }]"
          v-model="v$.createForm.url.$model"
          @focus="reset(v$.createForm.url)"
          @input="reset(v$.createForm.url)"
          id="inputPrice"
        />
        <div class="invalid-feedback">
          <template v-for="error of v$.createForm.url.$errors">
            {{ error.$message }}
          </template>
        </div>
      </div>
      <div class="form-group">
        <label for="inputPrice">Giá</label>
        <input
          type="number"
          class="form-control"
          :class="[{ 'is-invalid': isInvalid(v$.createForm.price) }]"
          v-model="v$.createForm.price.$model"
          @focus="reset(v$.createForm.price)"
          @input="reset(v$.createForm.price)"
          id="inputPrice"
        />
        <div class="invalid-feedback">
          <template v-for="error of v$.createForm.price.$errors">
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
        Đăng sản phẩm
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Brand from "@/models/Brand";
import Category from "@/models/Category";
import categoryService from "@/service/category-service";
import brandService from "@/service/brand-service";
import productService, { ProductPayload } from "@/service/product-service";
import useVuelidate from "@vuelidate/core";
import { helpers, maxLength, minLength, required } from "@vuelidate/validators";
import { Component, Vue } from "vue-property-decorator";
import DynamicImageInput from "@/components/Admin/Product/DynamicImageInput.vue";
import Retailer from "@/models/Retailer";
import retailerService from "@/service/retailer-service";

@Component({
  components: { DynamicImageInput },
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
          minLength: helpers.withMessage(
            "Tiêu đề có ít nhất 10 ký tự!",
            minLength(10)
          ),
          maxLength: helpers.withMessage(
            "Tiêu đề có tối đa 255 ký tự!",
            maxLength(255)
          ),
        },
        shortDescription: {
          required: helpers.withMessage("Mô tả không được để trống!", required),
          minLength: helpers.withMessage(
            "Mô tả có ít nhất 10 ký tự!",
            minLength(10)
          ),
        },
        longDescription: {
          required: helpers.withMessage("Mô tả không được để trống!", required),
          minLength: helpers.withMessage(
            "Mô tả có ít nhất 10 ký tự!",
            minLength(10)
          ),
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
        retailerId: {},
        price: {
          required: helpers.withMessage("Giá không được để trống!", required),
        },
        url: {
          required: helpers.withMessage(
            "Đường dẫn không được để trống!",
            required
          ),
          minLength: helpers.withMessage(
            "Đường dẫn có ít nhất 50 ký tự!",
            minLength(50)
          ),
          maxLength: helpers.withMessage(
            "Đường dẫn có ít nhất 50 ký tự!",
            maxLength(255)
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

  successMessage: string | null = "";

  categories: Category[] = [];
  brands: Brand[] = [];
  retailers: Retailer[] = [];

  createForm: ProductPayload = {
    title: "",
    brandId: 0,
    categoryId: 0,
    images: [],
    shortDescription: "",
    longDescription: "",
    retailerId: "",
    price: "",
    url: "",
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
      brandId: 0,
      categoryId: 0,
      images: [],
      shortDescription: "",
      longDescription: "",
      url: "",
    };
  }

  onImagesChange(images: string[]) {
    this.v$.createForm.images.$model = images;
  }

  createHandle(): void {
    this.v$.createForm.$touch();
    if (!this.v$.$invalid) {
      this.isLoading = true;
      productService
        .createProductByRetailer(this.createForm)
        .then((res) => {
          this.successMessage = res.data.message + "";
          this.resetForm();
          this.error = "";
          this.isLoading = false;
          this.$router.push("/san-pham-cua-ban");
        })
        .catch((err) => {
          this.error = err.response.data.message;
          this.isLoading = false;
        });
    }
  }

  mounted() {
    categoryService.getSubCategories().then((res) => {
      if (res.data && res.data.length > 0) {
        this.categories = res.data;
        this.createForm.categoryId = res.data[0].id;
      }
    });
    brandService.getBrands().then((res) => {
      if (res.data && res.data.length > 0) {
        this.brands = res.data;
        this.createForm.brandId = res.data[0].id;
      }
    });
    retailerService.getUserRetailers().then((res) => {
      if (res.data && res.data.length > 0) {
        this.retailers = res.data.filter(
          (r: any) => r.enable === true && r.approve === true
        );
        this.createForm.retailerId = this.retailers[0].id + "";
      }
    });
  }
}
</script>
