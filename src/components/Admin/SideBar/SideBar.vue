<template>
  <!-- Sidebar -->
  <ul
    class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    :class="{ toggled }"
    id="accordionSidebar"
  >
    <!-- Sidebar - Brand -->
    <router-link to="/" custom v-slot="{ href, navigate }">
      <a
        class="sidebar-brand d-flex align-items-center justify-content-center"
        :href="href"
        target="_blank"
        @click="navigate"
      >
        <div class="sidebar-brand-text mx-3">The best price</div>
      </a>
    </router-link>

    <!-- Divider -->
    <hr class="sidebar-divider my-0" />

    <!-- Nav Item - Dashboard -->
    <router-link to="/admin" custom v-slot="{ href, navigate, isActive }">
      <li class="nav-item" :class="{ active: isActive }">
        <a class="nav-link" @click="navigate" :href="href">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span></a
        >
      </li>
    </router-link>

    <!-- Divider -->
    <hr class="sidebar-divider" />

    <!-- Heading -->
    <div class="sidebar-heading">Website</div>

    <collapse-menu title="Tài khoản" subTitle="Quản lý tài khoản">
      <template v-slot:icon>
        <i class="fas fa-users"></i>
      </template>
      <template v-slot:items>
        <router-link
          to="/tai-khoan-nguoi-dung"
          custom
          v-slot="{ href, navigate, isActive }"
        >
          <a
            class="collapse-item"
            :class="{ active: isActive }"
            :href="href"
            @click="navigate"
            >Tài khoản người dùng</a
          >
        </router-link>
        <router-link
          to="/tai-khoan-chu-cua-hang"
          custom
          v-slot="{ href, navigate, isActive }"
        >
          <a
            class="collapse-item"
            :class="{ active: isActive }"
            :href="href"
            @click="navigate"
            >Tài khoản chủ cửa hàng</a
          >
        </router-link>
      </template>
    </collapse-menu>

    <collapse-menu title="Nhà bán lẻ" subTitle="Quản lý nhà bán lẻ">
      <template v-slot:icon>
        <i class="fas fa-store"></i>
      </template>
      <template v-slot:items>
        <router-link
          to="/nha-ban-le-da-duyet"
          custom
          v-slot="{ href, navigate, isActive }"
        >
          <a
            class="collapse-item"
            :class="{ active: isActive }"
            :href="href"
            @click="navigate"
            >Nhà bán lẻ đã duyệt</a
          >
        </router-link>
        <router-link
          to="/nha-ban-le-chua-duyet"
          custom
          v-slot="{ href, navigate, isActive }"
        >
          <a
            class="collapse-item"
            :class="{ active: isActive }"
            :href="href"
            @click="navigate"
            >Nhà bán lẻ chưa duyệt</a
          >
        </router-link>
      </template>
    </collapse-menu>

    <collapse-menu title="Sản phẩm" subTitle="Quản lý sản phẩm">
      <template v-slot:icon>
        <i class="fas fa-box"></i>
      </template>
      <template v-slot:items>
        <router-link
          to="/san-pham-da-duyet"
          custom
          v-slot="{ href, navigate, isActive }"
        >
          <a
            class="collapse-item"
            :class="{ active: isActive }"
            :href="href"
            @click="navigate"
            >Sản phẩm đã duyệt</a
          >
        </router-link>
        <router-link
          to="/san-pham-chua-duyet"
          custom
          v-slot="{ href, navigate, isActive }"
        >
          <a
            class="collapse-item"
            :class="{ active: isActive }"
            :href="href"
            @click="navigate"
            >Sản phẩm chưa duyệt</a
          >
        </router-link>
        <router-link
          to="/gia-chua-duyet"
          custom
          v-slot="{ href, navigate, isActive }"
        >
          <a
            class="collapse-item"
            :class="{ active: isActive }"
            :href="href"
            @click="navigate"
            >Giá chưa duyệt</a
          >
        </router-link>
      </template>
    </collapse-menu>

    <collapse-menu title="Thiết lập" subTitle="Thiết lập trang web">
      <template v-slot:icon>
        <i class="fas fa-fw fa-cog"></i>
      </template>
      <template v-slot:items>
        <router-link
          to="/danh-muc"
          custom
          v-slot="{ href, navigate, isActive }"
        >
          <a
            class="collapse-item"
            :class="{ active: isActive }"
            :href="href"
            @click="navigate"
            >Quản lý danh mục</a
          >
        </router-link>
        <a class="collapse-item" href="#.html">Quản lý banner</a>
      </template>
    </collapse-menu>

    <collapse-menu title="Thống kê" subTitle="Báo cáo thống kê">
      <template v-slot:icon>
        <i class="fas fa-chart-bar"></i>
      </template>
      <template v-slot:items>
        <router-link
          to="/thong-ke-luot-truy-cap"
          custom
          v-slot="{ href, navigate, isActive }"
        >
          <a
            class="collapse-item"
            :class="{ active: isActive }"
            :href="href"
            @click="navigate"
            >Lượt truy cập website</a
          >
        </router-link>
        <router-link
          to="/thong-ke-san-pham"
          custom
          v-slot="{ href, navigate, isActive }"
        >
          <a
            class="collapse-item"
            :class="{ active: isActive }"
            :href="href"
            @click="navigate"
            >Lượt xem sản phẩm</a
          >
        </router-link>
        <router-link
          to="/thong-ke-tu-khoa"
          custom
          v-slot="{ href, navigate, isActive }"
        >
          <a
            class="collapse-item"
            :class="{ active: isActive }"
            :href="href"
            @click="navigate"
            >Từ khóa</a
          >
        </router-link>
      </template>
    </collapse-menu>

    <!-- Divider -->
    <!-- <hr class="sidebar-divider" /> -->
    <!-- Nav Item - Tables -->
    <!-- <li class="nav-item">
      <a class="nav-link" href="tables.html">
        <i class="fa fa-fw fa-table"></i>
        <span>Tables</span></a
      >
    </li> -->

    <!-- Divider -->
    <hr class="sidebar-divider d-none d-md-block" />

    <!-- Sidebar Toggler (Sidebar) -->
    <div class="text-center d-none d-md-inline">
      <button
        @click="toggle"
        class="rounded-circle border-0"
        id="sidebarToggle"
      ></button>
    </div>
  </ul>
  <!-- End of Sidebar -->
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CollapseMenu from "./CollapseMenu.vue";

@Component({ components: { CollapseMenu } })
export default class extends Vue {
  toggled = false;

  toggle(): void {
    this.toggled = !this.toggled;
  }

  mounted(): void {
    this.$root.$on("toggleSidebar", this.toggle);
  }
}
</script>

<style lang="scss" scoped>
.navbar-nav {
  background-color: #ffc288;
  background-image: linear-gradient(180deg, #fea82f 10%, #fea82f 100%);
  background-size: cover;
}
</style>
