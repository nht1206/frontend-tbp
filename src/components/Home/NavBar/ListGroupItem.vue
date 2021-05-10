<template>
  <li
    class="list-group-item"
    :class="[{ active: isShow }]"
    @mouseover="open"
    @mouseleave="close"
    @click="click(category.id)"
  >
    <a>
      <span class="sub-list-main-menu">{{ category.title }}</span>
      <i
        v-if="haveSubCategories"
        class="fa fa-angle-right"
        aria-hidden="true"
      ></i>
    </a>
    <div v-if="haveSubCategories" class="wd-sub-list">
      <div class="container">
        <div class="row">
          <div class="col-auto">
            <ul class="wd-sub-menu">
              <li
                v-for="c in category.categories"
                :key="c.id"
                @click="click(c.id)"
              >
                <a>{{ c.title }}</a>
              </li>
            </ul>
          </div>
          <!-- <div class="col-md-4">
            <h6 class="black-color wd-sub-list-title">Cameras and photos</h6>
            <ul class="wd-sub-menu">
              <li>
                <a href="shop-left-sidebar.html">Camera Electronice</a>
              </li>
              <li>
                <a href="shop-left-sidebar.html">Camera Appereances</a>
              </li>
              <li><a href="shop-left-sidebar.html">DSLR</a></li>
              <li>
                <a href="shop-left-sidebar.html">Video cameras</a>
              </li>
              <li><a href="shop-left-sidebar.html">Top Cameras</a></li>
              <li>
                <a href="shop-left-sidebar.html">Cheap Cameras</a>
              </li>
              <li><a href="shop-left-sidebar.html">Best Cameras</a></li>
              <li>
                <a href="shop-left-sidebar.html">Luxury Cameras</a>
              </li>
              <li>
                <a href="shop-left-sidebar.html">Simple Cameras</a>
              </li>
            </ul>
          </div> -->
        </div>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import Category from "@/models/Category";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  isShow = false;

  @Prop({ type: Object, required: true })
  category!: Category;

  haveSubCategories(): boolean {
    if (this.category.categories) {
      return this.category.categories.length !== 0;
    }
    return false;
  }

  open(): void {
    this.isShow = true;
  }

  close(): void {
    this.isShow = false;
  }

  click(catId: number): void {
    if (this.$route.path !== "/danh-sach-san-pham") {
      this.$router.push("/danh-sach-san-pham");
    }
    this.$store.dispatch("product/searchProducts", {
      catId,
    });
  }
}
</script>

<style lang="scss" scoped>
.list-group-item {
  i {
    float: right;
    margin-right: 20px;
  }
}
</style>