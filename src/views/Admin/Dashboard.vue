<template>
  <div>
    <div id="wrapper">
      <side-bar></side-bar>
      <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
          <nav-bar></nav-bar>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import NavBar from "@/components/Admin/NavBar.vue";
import SideBar from "@/components/Admin/SideBar/SideBar.vue";
import { Component, Vue } from "vue-property-decorator";

import "@/assets/styles/sb-admin-2.min.css";
import "@/assets/js/sb-admin-2.min";

@Component({
  components: { SideBar, NavBar },
})
export default class extends Vue {}
</script>

<style scoped></style>
