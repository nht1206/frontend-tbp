<template>
  <div class="side-bar category category-md">
    <h5 class="title">Danh mục</h5>
    <ul class="dropdown-list-menu">
      <ul class="dropdown-list-menu">
        <side-bar-dropdown
          v-for="category in categories"
          :category="category"
          :key="category.id"
        ></side-bar-dropdown>
      </ul>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import SideBarDropdown from "../ProductList/SideBarDropdown.vue";

@Component({
  components: { SideBarDropdown },
  computed: {
    ...mapGetters({
      categories: "category/categories",
    }),
  },
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
@media (min-width: 768px) {
  .category-md {
    display: block;
  }
}
</style>
