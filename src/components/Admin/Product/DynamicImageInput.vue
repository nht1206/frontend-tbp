<template>
  <div class="form-group">
    <label>{{ title }}</label>
    <div v-for="(image, idx) in images" :key="idx" class="input-group mt-2">
      <input
        type="text"
        v-model="image.value"
        class="form-control"
        :class="[{ 'is-invalid': isInvalid }]"
        @change="onChange"
        @focus="reset()"
        @input="reset()"
      />
      <div class="input-group-prepend" v-if="!isTheLast(idx)">
        <button
          @click="removeImageInput(idx)"
          class="btn btn-danger"
          type="button"
        >
          Xóa
        </button>
      </div>
      <div class="input-group-prepend" v-if="isTheLast(idx)">
        <button @click="addImageInput" class="btn btn-success" type="button">
          Thêm
        </button>
      </div>
      <div v-if="isTheLast(idx)" class="invalid-feedback">
        <template v-for="error of errors">
          {{ error.$message }}
        </template>
      </div>
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

  isTheLast(idx: number) {
    return idx === this.images.length - 1;
  }

  addImageInput() {
    this.images.push({
      value: "",
    });
  }

  reset() {
    this.$emit("reset");
  }

  removeImageInput(index: number) {
    this.images = this.images.filter((image, idx) => idx !== index);
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