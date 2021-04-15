<template>
  <ul class="dropdown-list-menu">
    <li
      class="sidebar-dropdown"
      v-click-outside="close"
      :class="{ show: isOpen }"
      @click="toggle"
    >
      <p>
        <i class="fa fa-angle-double-right" aria-hidden="true"></i>
        {{ category.title }}
      </p>
      <ul class="dropdown-sub-menu">
        <li v-for="sc in category.categories" :key="sc.id">
          <a @click="filter(sc.id)"
            ><i class="fa fa-angle-right" aria-hidden="true"></i>
            {{ sc.title }}</a
          >
        </li>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts">
import Category from "@/models/category";
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  computed: {
    ...mapGetters({
      option: "product/currentOption",
    }),
  },
})
export default class extends Vue {
  @Prop({ required: true })
  category!: Category;
  isOpen = false;

  option!: any;

  filter(catId: number): void {
    this.$store.dispatch("product/searchProducts", {
      keyword: this.option.keyword,
      catId: catId,
    });
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  close(): void {
    this.isOpen = false;
  }
}
</script>

<style lang="scss" scoped>
li {
  margin-bottom: 12px;
  &:last-child {
    margin-bottom: 0;
  }
  .dropdown-sub-menu {
    padding: 8px 0 0 17px;
    cursor: pointer;
    display: none;
  }
  i {
    margin-right: 4px;
    transition: 0.5s;
  }
  a {
    &:hover {
      i {
        margin-right: 10px;
      }
    }
  }
}
li.show {
  .dropdown-sub-menu {
    display: block;
  }
}
.sidebar-dropdown {
  p {
    cursor: pointer;
    transition: 0.5s;
  }
  &:hover {
    p {
      color: #ff9800;
    }
  }
}
</style>