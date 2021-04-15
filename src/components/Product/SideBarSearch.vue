<template>
  <div class="sidebar-search">
    <div class="input-group wd-btn-group col-12 p0">
      <input
        type="text"
        class="form-control"
        placeholder="Tìm kiếm ..."
        aria-label="Search for..."
        v-model="keyword"
      />
      <span class="input-group-btn">
        <button
          class="btn btn-secondary wd-btn-search"
          @click="search"
          type="button"
        >
          <i class="fa fa-search" aria-hidden="true"></i>
        </button>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  keyword = "";

  search(): void {
    this.$store.dispatch("product/searchProducts", { keyword: this.keyword });
  }
}
</script>

<style lang="scss" scoped>
.sidebar-search {
  margin-bottom: 20px;
  border: 1px solid #ececec;
  background: #fff;
  .wd-btn-group {
    margin-left: 0;
  }
  input {
    border: 0;
    padding: 13px 20px;
    border-radius: 0;
    color: #a5a5a5;
    background: #fff;
    height: auto;
    &:focus {
      color: #a5a5a5;
    }
  }
  button {
    border: 0;
    padding: 13px 20px;
    border-radius: 0;
  }
  .btn-secondary {
    background: white;
    color: #a5a5a5;
    &:hover {
      background: #ff9800;
      i {
        color: #ececec;
      }
    }
  }
}
</style>