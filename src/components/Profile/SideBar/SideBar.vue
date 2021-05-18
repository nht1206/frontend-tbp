<template>
  <nav
    id="sidebarMenu"
    class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
  >
    <!-- <div class="profile-userpic d-flex justify-content-center">
      <img
        src="http://keenthemes.com/preview/metronic/theme/assets/admin/pages/media/profile/profile_user.jpg"
        class="img-responsive"
        alt=""
      />
    </div> -->

    <div class="profile-usertitle">
      <div class="profile-usertitle-name">{{ user.fullName }}</div>
      <div class="profile-usertitle-job">{{ getRoleName(user.role) }}</div>
    </div>
    <div class="profile-userbuttons">
      <button
        v-if="user.role === 'ROLE_GUEST'"
        type="button"
        class="btn btn-sm"
      >
        Đăng ký chủ cửa hàng
      </button>
      <router-link to="/admin" custom v-slot="{ href }">
        <a
          v-if="user.role === 'ROLE_ADMIN'"
          :href="href"
          type="button"
          class="btn btn-sm"
        >
          Đến trang admin
        </a>
      </router-link>
    </div>
    <hr class="sidebar-divider" />
    <div class="sidebar-sticky pt-3">
      <ul class="nav flex-column">
        <li class="nav-item active">
          <a class="nav-link" href="#">
            <i class="fas fa-user"></i>
            Thông tin cá nhân <span class="sr-only">(current)</span>
          </a>
        </li>
        <li v-if="isRetailer(user.role)" class="nav-item">
          <a class="nav-link" href="#"
            ><i class="fas fa-store"></i> Cửa hàng
          </a>
        </li>
        <li v-if="isRetailer(user.role)" class="nav-item">
          <a class="nav-link" href="#"><i class="fas fa-box"></i> Sản phẩm </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
})
export default class extends Vue {
  getRoleName(role: string): string {
    if (role === "ROLE_ADMIN") {
      return "Admin";
    }
    if (role === "ROLE_RETAILER") {
      return "Chủ cửa hàng";
    }
    return "Khách";
  }

  isRetailer(role: string): boolean {
    return role === "ROLE_RETAILER";
  }
}
</script>

<style lang="scss" scoped>
</style>

