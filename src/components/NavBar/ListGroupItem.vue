<template>
  <li
    class="list-group-item"
    :class="[{ active: isShow }]"
    @mouseover="open"
    @mouseleave="close"
  >
    <a @click="click(category.id)">
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
              <li v-for="c in category.categories" :key="c.id">
                <a @click="click(c.id)">{{ c.title }}</a>
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
import Category from "@/models/category";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  isShow = false;

  @Prop({ type: Object, required: true })
  category!: Category;

  haveSubCategories(): boolean {
    return this.category.categories.length !== 0;
  }

  open(): void {
    this.isShow = true;
  }

  close(): void {
    this.isShow = false;
  }

  click(catId: number) {
    if (this.$route.path !== "/product-list") {
      this.$router.push("/product-list");
    }
    this.$store.dispatch("product/searchProducts", {
      catId,
    });
  }
}
</script>
