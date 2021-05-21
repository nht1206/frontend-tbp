<template>
  <form
    class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search"
  >
    <div class="input-group">
      <input
        type="text"
        class="form-control bg-light border-0 small"
        placeholder="Tìm kiếm"
        aria-label="Search"
        v-model="keyword"
      />
      <div class="input-group-append">
        <button @click="search" class="btn btn-search" type="button">
          <i class="fa fa-search fa-sm"></i>
        </button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  keyword = "";

  search() {
    this.$store.commit("search/setKeyword", this.keyword);
  }
}
</script>

<style lang="scss" scoped>
.btn-search {
  background-color: #fea82f;
  border-color: #fea82f;
}
</style>