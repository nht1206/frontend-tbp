<template>
  <div class="acc-header-wrapper">
    <div class="account-section">
      <button
        class="btn btn-primary"
        data-toggle="modal"
        data-target=".bd-example-modal-lg2"
      >
        <i class="fa fa-sign-in" aria-hidden="true"></i
        ><span>Đăng nhập/Đăng ký</span>
      </button>
    </div>
    <div class="search-wrapper" v-click-outside="closeMiniSearch">
      <div class="search">
        <input
          class="search-input"
          :class="{ active: isMiniSearchShow }"
          placeholder="Search"
          type="text"
        />
        <a @click="openMiniSearch"><i class="fa fa-search"></i></a>
      </div>
    </div>
    <compare-cart></compare-cart>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CompareCart from "./CompareCart.vue";

@Component({ components: { CompareCart } })
export default class extends Vue {
  isMiniSearchShow = false;
  openMiniSearch(): void {
    this.isMiniSearchShow = !this.isMiniSearchShow;
  }
  closeMiniSearch(): void {
    this.isMiniSearchShow = false;
  }
}
</script>

<style lang="scss" scoped>
.acc-header-wrapper {
  .btn {
    span {
      font-size: 14px;
    }
  }
  float: right;
  padding-top: 9px;
  padding-right: 17px;
  .account-section {
    display: inline-block;
    margin-top: 4px;
    i {
      margin-right: 4px;
    }
    button {
      color: #333333;
      padding: 0;
      background: transparent;
      border-color: transparent;
      cursor: pointer;
      transition: 0.5s;
    }
    button:focus {
      outline: none;
    }
    button:first-child {
      margin-right: 11px;
    }
    button:hover {
      color: #f44336;
      background: transparent;
      border-color: transparent;
    }
  }
  .search-wrapper {
    display: none;
    i {
      color: black;
    }
    .search-input {
      visibility: hidden;
      border: 2px solid #333;
      position: absolute;
      right: 29px;
      padding: 6px 10px;
      top: -4px;
      width: 275px;
      -webkit-transition: all 0.3s ease 0s;
      transition: all 0.3s ease 0s;
      opacity: 0;
      border-radius: 0px;
      z-index: 18;
    }
    .search-input.active {
      visibility: visible;
      -webkit-transition: all 0.5s ease 0s;
      transition: all 0.5s ease 0s;
      opacity: 1;
    }
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .acc-header-wrapper {
    padding-top: 0px;
    padding-right: 9px;
    .account-section {
      button:first-child {
        margin-right: 0px;
      }
    }
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .acc-header-wraper {
    float: right;
    padding-top: 0px;
    padding-right: 0px;
  }
}
@media (max-width: 991px) {
  .account-section,
  .header-cart {
    padding: 0 15px;
  }
  .acc-header-wrapper {
    .search-wrapper {
      display: block;
      float: left;
      margin-top: 6px;
      position: relative;

      i {
        font-size: 18px;
      }
    }
  }
  .account-section {
    float: left;
    padding: 0;
    button {
      padding: 0;
    }
    span {
      display: none;
    }
    i {
      font-size: 20px;
    }
  }
}
@media (max-width: 767px) {
  .acc-header-wrapper {
    float: right;
    padding-top: 5px;
    padding-right: 17px;
  }
}
@media (max-width: 575px) {
  .acc-header-wrapper {
    padding-right: 0px;
  }
  .search-input {
    right: -75px;
    top: 37px;
  }
}
</style>