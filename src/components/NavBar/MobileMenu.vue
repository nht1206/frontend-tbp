<template>
  <div
    v-click-outside="close"
    class="order-2 order-sm-1 col-2 col-sm-2 col-md-4 d-block d-lg-none"
  >
    <div class="accordion-wrapper hide-sm-up">
      <a @click="open" class="mobile-open"><i class="fa fa-bars"></i></a>

      <ul id="mobilemenu" class="accordion" :class="[{ active: isOpen }]">
        <li>
          <a @click="close" class="closeme" href="#"
            ><i class="fa fa-times"></i
          ></a>
        </li>
        <li class="mob-logo">
          <a href="index.html"><img src="img/logo.png" alt="" /></a>
        </li>
        <mobile-sub-menu
          v-for="category in categories"
          :key="category.id"
          :title="category.title"
        >
          <template v-slot:submenu-item>
            <li v-for="sc in category.categories" :key="sc.id">
              <a @click="click(sc.id)">{{ sc.title }}</a>
            </li>
          </template>
        </mobile-sub-menu>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Category from "@/models/Category";
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import MobileSubMenu from "./MobileSubMenu.vue";

@Component({
  components: { MobileSubMenu },
  computed: {
    ...mapGetters({
      categories: "category/categories",
    }),
  },
})
export default class extends Vue {
  categories!: Category[];
  isOpen = false;

  open(): void {
    this.isOpen = true;
  }

  close(): void {
    this.isOpen = false;
  }

  click(catId: number): void {
    this.close();
    if (this.$route.path !== "/product-list") {
      this.$router.push("/product-list");
    }
    this.$store.dispatch("product/searchProducts", {
      catId,
    });
  }
}
</script>

<style lang="scss" scoped>
.mobile-open {
  position: relative;
  right: 0;
  top: 0;
  font-size: 27px;
  color: #03a9f4;
  float: left;
  margin-top: 5px;
}
.mobile-open:hover,
.mobile-open:focus {
  color: #f44336;
}
.accordion {
  position: fixed;
  left: -110%;
  top: 0px;
  width: 100%;
  z-index: 99999999999;
  background: #fff;
  -webkit-transition: all 0.25s ease;
  -o-transition: all 0.25s ease;
  transition: all 0.25s ease;
  padding-top: 40px;
  height: 100%;
  overflow-y: scroll;
  -webkit-box-shadow: 8px 3px 21px 0px rgba(0, 0, 0, 0.22);
  -moz-box-shadow: 8px 3px 21px 0px rgba(0, 0, 0, 0.22);
  box-shadow: 8px 3px 21px 0px rgba(0, 0, 0, 0.22);

  .closeme {
    position: absolute;
    right: 11px;
    top: 3px;
    padding: 3px;
    i {
      position: relative !important;
      left: 0 !important;
      top: 0 !important;
    }
  }
  .mob-logo {
    width: 100%;
    padding-left: 42px;
    text-align: center;
  }

  .top-contact-btn {
    margin-left: 42px;
    margin-top: 24px;
    float: left;
  }

  .out-link {
    cursor: pointer;
    display: block;
    padding: 15px 15px 15px 42px;
    color: #4d4d4d;
    font-size: 14px;
    border-bottom: 1px solid #ccc;
    position: relative;
    -webkit-transition: all 0.4s ease;
    -o-transition: all 0.4s ease;
    transition: all 0.4s ease;
    font-family: "Museo-500";
  }

  a {
    font-size: 15px;
    text-transform: uppercase;
    font-family: "Roboto";
    color: #505050;
  }
}
.accordion.active {
  left: -30px;
  -webkit-transition: all 0.25s ease;
  -o-transition: all 0.25s ease;
  transition: all 0.25s ease;
}
</style>
