<template>
  <div class="form-group">
    <label>{{ title }}</label>
    <small id="imageHelp" class="form-text text-muted"
      >Nhấn enter để nhập thêm ảnh</small
    >
    <input
      type="text"
      v-for="(image, idx) in images"
      :key="idx"
      v-model="image.value"
      class="form-control mt-2"
      :class="[{ 'is-invalid': isInvalid }]"
      @keyup.enter="addImageInput(idx)"
      @change="onChange"
      @focus="reset()"
      @input="reset()"
      @dblclick="removeImageInput(idx)"
    />
    <div class="invalid-feedback">
      <template v-for="error of errors">
        {{ error.$message }}
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ type: String, default: () => "Hình ảnh" })
  title!: string;
  @Prop({ required: true })
  errors!: any[];
  @Prop({ required: true, type: Boolean })
  isInvalid!: boolean;
  @Prop({ required: false })
  existedImages!: string[];
  @Prop({ required: false })
  v$!: any;

  images = [
    {
      value: "",
    },
    {
      value: "",
    },
    {
      value: "",
    },
  ];

  addImageInput(index: number) {
    if (index === this.images.length - 1) {
      this.images.push({
        value: "",
      });
    }
  }

  reset() {
    this.$emit("reset");
  }

  removeImageInput(index: number) {
    if (index !== this.images.length - 1) {
      this.images = this.images.filter((image, idx) => idx !== index);
    }
    this.onChange();
  }

  onChange() {
    this.$emit(
      "change",
      this.images
        .filter((image) => image.value !== "")
        .map((image) => image.value)
    );
  }

  mounted() {
    if (this.existedImages) {
      this.images = this.existedImages.map((image) => ({ value: image }));
    }
  }
}
</script>

<style scoped>
</style>