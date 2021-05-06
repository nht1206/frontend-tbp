<template>
  <!-- Sidebar -->
  <ul
    class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    id="accordionSidebar"
  >
    <!-- Sidebar - Brand -->
    <a
      class="sidebar-brand d-flex align-items-center justify-content-center"
      href="index.html"
    >
      <div class="sidebar-brand-text mx-3">The best price</div>
    </a>

    <!-- Divider -->
    <hr class="sidebar-divider my-0" />

    <!-- Nav Item - Dashboard -->
    <li class="nav-item active">
      <a class="nav-link" href="index.html">
        <i class="fa fa-fw fa-tachometer"></i>
        <span>Dashboard</span></a
      >
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider" />

    <!-- Heading -->
    <div class="sidebar-heading">Interface</div>

    <collapse-menu title="Components" subTitle="Custom components">
      <template v-slot:items>
        <a class="collapse-item" href="buttons.html">Buttons</a>
        <a class="collapse-item" href="cards.html">Cards</a>
      </template>
    </collapse-menu>
    <collapse-menu title="Utilities" subTitle="Custom Utilities:">
      <template v-slot:items>
        <a class="collapse-item" href="utilities-color.html">Colors</a>
        <a class="collapse-item" href="utilities-border.html">Borders</a>
        <a class="collapse-item" href="utilities-animation.html">Animations</a>
        <a class="collapse-item" href="utilities-other.html">Other</a>
      </template>
    </collapse-menu>

    <!-- Divider -->
    <hr class="sidebar-divider" />
    <!-- Nav Item - Tables -->
    <li class="nav-item">
      <a class="nav-link" href="tables.html">
        <i class="fa fa-fw fa-table"></i>
        <span>Tables</span></a
      >
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider d-none d-md-block" />

    <!-- Sidebar Toggler (Sidebar) -->
    <div class="text-center d-none d-md-inline">
      <button class="rounded-circle border-0" id="sidebarToggle"></button>
    </div>
  </ul>
  <!-- End of Sidebar -->
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CollapseMenu from "./CollapseMenu.vue";

@Component({ components: { CollapseMenu } })
export default class extends Vue {}
</script>

<style scoped></style>
