<template>
  <div id="main-menu" class="sticker-nav">
    <div class="container">
      <div class="row">
        <department-list></department-list>
        <div class="col-2 col-md-6 col-lg-9">
          <div class="menu-container wd-megamenu">
            <div class="menu">
              <ul class="wd-megamenu-ul">
                <normal-sub-menu title="Trang chủ">
                  <template v-slot:icon>
                    <i class="fa fa-home" aria-hidden="true"></i>
                  </template>
                  <template v-slot:submenu-item>
                    <li><a href="abc.html">Abc</a></li>
                    <li><a href="abc.html">Abc</a></li>
                    <li><a href="abc.html">Abc</a></li>
                    <li><a href="abc.html">Abc</a></li>
                    <li><a href="abc.html">Abc</a></li>
                  </template>
                </normal-sub-menu>
                <normal-sub-menu title="So sánh sản phẩm">
                  <template v-slot:submenu-item>
                    <li>
                      <a href="compare-products.html">So sánh sản phẩm </a>
                    </li>
                    <li>
                      <a href="compare-products-single.html">So sánh giá</a>
                    </li>
                    <li>
                      <a href="compare-products-choose-market.html"
                        >So sánh các cửa hàng được chọn</a
                      >
                    </li>
                    <li><a href="contact-us.html">Liên hệ chúng tôi</a></li>
                  </template>
                </normal-sub-menu>
                <normal-sub-menu title="Shop">
                  <template v-slot:submenu-item>
                    <li>
                      <a href="shop-left-sidebar.html">Danh sách sản phẩm</a>
                    </li>

                    <li>
                      <a href="product-details.html">Chi tiết sản phẩm</a>
                    </li>
                    <li><a href="wishlist.html">Danh sách mong muốn</a></li>
                  </template>
                </normal-sub-menu>
                <mega-sub-menu title="Demo menu">
                  <template v-slot:submenu-1>
                    <li>
                      <a href="#" class="menu-subtitle">Menu con 1</a>
                      <ul class="sub-menu-list">
                        <li>
                          <a href="abc.html"
                            ><i
                              class="fa fa-angle-double-right"
                              aria-hidden="true"
                            ></i>
                            Abc</a
                          >
                        </li>
                        <li>
                          <a href="abc.html"
                            ><i
                              class="fa fa-angle-double-right"
                              aria-hidden="true"
                            ></i>
                            Abc</a
                          >
                        </li>
                      </ul>
                    </li>
                  </template>
                  <template v-slot:submenu-2>
                    <li>
                      <a href="#" class="menu-subtitle">Menu con 2</a>
                      <ul class="sub-menu-list">
                        <li>
                          <a href="abc.html"
                            ><i
                              class="fa fa-angle-double-right"
                              aria-hidden="true"
                            ></i>
                            Abc</a
                          >
                        </li>
                        <li>
                          <a href="abc.html"
                            ><i
                              class="fa fa-angle-double-right"
                              aria-hidden="true"
                            ></i>
                            Abc</a
                          >
                        </li>
                        <li>
                          <a href="abc.html"
                            ><i
                              class="fa fa-angle-double-right"
                              aria-hidden="true"
                            ></i>
                            Abc</a
                          >
                        </li>
                      </ul>
                    </li>
                  </template>
                  <template v-slot:submenu-3>
                    <li>
                      <a href="#" class="menu-subtitle">Menu con 3</a>
                      <ul class="sub-menu-list">
                        <li>
                          <a href="abc.html"
                            ><i
                              class="fa fa-angle-double-right"
                              aria-hidden="true"
                            ></i>
                            Abc</a
                          >
                        </li>
                        <li>
                          <a href="abc.html"
                            ><i
                              class="fa fa-angle-double-right"
                              aria-hidden="true"
                            ></i>
                            Abc</a
                          >
                        </li>
                      </ul>
                    </li>
                  </template>
                </mega-sub-menu>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DepartmentList from "./DepartmentList.vue";
import MegaSubMenu from "./MegaSubMenu.vue";
import NormalSubMenu from "./NormalSubMenu.vue";

@Component({
  components: { NormalSubMenu, MegaSubMenu, DepartmentList },
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
#main-menu {
  border-bottom: 2px solid #fdb813;
  .wd-megamenu {
    width: 100%;
    text-align: left;
    .menu {
      > ul {
        margin: 0 auto;
        width: 100%;
        list-style: none;
        padding: 0;
        position: relative;
        box-sizing: border-box;
      }
      > ul:before,
      > ul:after {
        content: "";
        display: table;
      }
      > ul:after {
        clear: both;
      }
      .wd-megamenu-ul {
        position: static !important;
        height: auto;
        width: auto !important;
        float: right;
        overflow: visible;
      }
    }
  }
  .menu-container {
    width: 80%;
    margin: 0 auto;
    background: #e9e9e9;
  }
}
@media only screen and (max-width: 959px) {
  .menu-container {
    width: 100%;
  }
  .menu-mobile {
    display: block;
  }
  .menu-dropdown-icon {
    &:before {
      display: block;
    }
  }
  .menu {
    > ul {
      display: none;
    }
    .show-on-mobile {
      display: block;
    }
  }
}
</style>
