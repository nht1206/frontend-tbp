<template>
  <div>
    <div id="wrapper">
      <side-bar></side-bar>
      <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
          <nav-bar></nav-bar>
          <div class="container-fluid">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
    <message-toast></message-toast>
  </div>
</template>

<script lang="ts">
import NavBar from "@/components/Admin/NavBar/NavBar.vue";
import SideBar from "@/components/Admin/SideBar/SideBar.vue";
import { Component, Vue } from "vue-property-decorator";

import "@/assets/styles/sb-admin-2.min.css";
import "@/assets/js/sb-admin-2.min";
import MessageToast from "@/components/Admin/Toast/MessageToast.vue";

@Component({
  components: { SideBar, NavBar, MessageToast },
})
export default class extends Vue {}
</script>

<style lang="scss">
.page-item.active .page-link {
  background-color: #fea82f;
  border-color: #fea82f;
}
</style>
