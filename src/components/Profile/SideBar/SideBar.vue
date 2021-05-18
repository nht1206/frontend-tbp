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
      <div class="profile-usertitle-name">Nguyễn Hữu Thọ</div>
      <div class="profile-usertitle-job">Khách</div>
    </div>
    <div class="profile-userbuttons">
      <button type="button" class="btn btn-sm">Đăng ký chủ cửa hàng</button>
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
        <li class="nav-item">
          <a class="nav-link" href="#"
            ><i class="fas fa-store"></i> Cửa hàng
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#"><i class="fas fa-box"></i> Sản phẩm </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {}
</script>

<style lang="scss" scoped>
</style>

