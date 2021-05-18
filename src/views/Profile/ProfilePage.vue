<template>
  <div class="container-fluid">
    <div class="row">
      <side-bar></side-bar>
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
        <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
        >
          <h1 class="h2">Dashboard</h1>
        </div>
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import SideBar from "@/components/Profile/SideBar/SideBar.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({ components: { SideBar } })
export default class extends Vue {}
</script>

<style lang="scss">
@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
  }
}
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
  .profile-userpic {
    img {
      width: 50%;
      height: 50%;
      -webkit-border-radius: 50% !important;
      -moz-border-radius: 50% !important;
      border-radius: 50% !important;
    }
  }
  .profile-usertitle {
    text-align: center;
    margin-top: 20px;
    .profile-usertitle-name {
      color: #5a7391;
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 7px;
    }

    .profile-usertitle-job {
      text-transform: uppercase;
      color: #5b9bd1;
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 15px;
    }
  }

  .profile-userbuttons {
    text-align: center;
    margin-top: 10px;
    .btn {
      text-transform: uppercase;
      font-size: 11px;
      font-weight: 600;
      padding: 6px 15px;
      margin-right: 5px;
      &:last-child {
        margin-right: 0px;
      }
    }
  }

  .nav {
    .nav-item {
      border-bottom: 1px solid #f0f4f7;
      &:last-child {
        border-bottom: none;
      }
      .nav-link {
        color: #93a3b5;
        font-size: 14px;
        font-weight: 400;
        i {
          margin-right: 8px;
          font-size: 14px;
        }
        &:hover {
          background-color: #fafcfd;
          color: #5b9bd1;
        }
      }
    }
    .nav-item.active {
      border-bottom: none;
      a {
        color: #5b9bd1;
        background-color: #f6f9fb;
        border-left: 5px solid #e93b81;
        margin-left: -2px;
      }
    }
  }
}
.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto;
}
.sidebar-heading {
  font-size: 0.75rem;
  text-transform: uppercase;
}
@media (max-width: 767.98px) {
  .sidebar {
    top: 5rem;
  }
}
</style>