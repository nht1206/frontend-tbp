<template>
  <div class="acc-header-wrapper">
    <div class="account-section">
      <button
        v-if="!user"
        class="btn btn-primary btn-login"
        v-b-modal.sigin-signup
      >
        <i class="fas fa-sign-in-alt" aria-hidden="true"></i
        ><span>Đăng nhập/Đăng ký</span>
        <authentication-modal></authentication-modal>
      </button>
      <div class="search-wrapper" v-click-outside="closeMiniSearch">
        <div class="search">
          <input
            class="search-input"
            :class="{ active: isMiniSearchShow }"
            v-model="keyword"
            @keydown.enter="search"
            placeholder="Search"
            type="text"
          />
          <a @click="openMiniSearch"><i class="fas fa-search"></i></a>
        </div>
      </div>
      <compare-cart></compare-cart>

      <account-dropdown v-if="user" :title="user.fullName">
        <router-link to="/tai-khoan" custom v-slot="{ href }">
          <a class="dropdown-item" :href="href">
            <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
            Hồ sơ cá nhân
          </a>
        </router-link>

        <div class="dropdown-divider"></div>
        <a
          class="dropdown-item"
          :class="{ disabled: isLoading }"
          @click="logout"
        >
          <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
          Đăng xuất
        </a>
      </account-dropdown>
    </div>
  </div>
</template>
<script lang="ts">
import User from "@/models/User";
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import AuthenticationModal from "../modal/AuthenticationModal/AuthenticationModal.vue";
import AccountDropdown from "./AccountDropdown.vue";
import CompareCart from "./CompareCart.vue";

@Component({
  components: { CompareCart, AuthenticationModal, AccountDropdown },
  computed: {
    ...mapGetters({
      user: "auth/user",
      isLoading: "auth/isLoading",
    }),
  },
})
export default class extends Vue {
  keyword = "";
  user!: User;
  isMiniSearchShow = false;
  openMiniSearch(): void {
    this.isMiniSearchShow = !this.isMiniSearchShow;
  }
  closeMiniSearch(): void {
    this.isMiniSearchShow = false;
  }

  search(): void {
    if (this.$route.path !== "/danh-sach-san-pham") {
      this.$router.push("/danh-sach-san-pham");
    }
    this.$store.dispatch("product/searchProducts", {
      keyword: this.keyword,
    });
  }

  logout(): void {
    this.$store.dispatch("auth/logout");
  }

  mounted(): void {
    this.$store.commit("auth/loadUser");
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

    .btn-login:hover {
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
      left: -200px;
      padding: 6px 10px;
      top: 100%;
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
  .dropdown-item {
    cursor: pointer;
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
