<template>
  <div>
    <nav
      class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow"
    >
      <router-link to="/" custom v-slot="{ href }">
        <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" :href="href"
          >The best price</a
        >
      </router-link>
      <button
        class="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-toggle="collapse"
        data-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <input
        class="form-control form-control-dark w-100"
        type="text"
        placeholder="Search"
        aria-label="Search"
      />
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" :class="{ disabled: isLoading }" @click="logout"
            ><div
              v-if="isLoading"
              class="spinner-border spinner-border-sm"
              role="status"
            >
              <span class="sr-only">Loading...</span>
            </div>
            Đăng xuất</a
          >
        </li>
      </ul>
    </nav>
    <div class="container-fluid">
      <div class="row">
        <side-bar></side-bar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SideBar from "@/components/Profile/SideBar/SideBar.vue";
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  components: { SideBar },
  computed: {
    ...mapGetters({
      isLoading: "auth/isLoading",
    }),
  },
})
export default class extends Vue {
  logout() {
    this.$store.dispatch("auth/logout");
  }
}
</script>

<style lang="scss">
.navbar-brand {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-size: 1rem;
  background-color: #fea82f;
  box-shadow: inset -1px 0 0 #fea82f;
}
.navbar {
  .navbar-toggler {
    top: 0.25rem;
    right: 1rem;
  }
  .form-control {
    padding: 0.75rem 1rem;
    border-width: 0;
    border-radius: 0;
  }
}

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
  padding: 48px 0 0;
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
      background-color: #fea82f;
      border: #fea82f;
      color: #fff;
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
          color: #fea82f;
        }
      }
    }
    .nav-item.active {
      border-bottom: none;
      a {
        color: #fea82f;
        background-color: #f6f9fb;
        border-left: 5px solid #fea82f;
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
.bg-dark {
  background-color: #fea82f !important;
}
.nav-link {
  cursor: pointer;
}
.sticky-top {
  z-index: 999 !important;
}
</style>