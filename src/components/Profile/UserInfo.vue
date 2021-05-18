<template>
  <div class="row">
    <div class="col-12">
      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
      >
        <h1 class="h4">Thông tin cá nhân <i class="fas fa-edit"></i></h1>
      </div>
    </div>
    <div v-if="!!user" class="col-md-12 col-lg-6">
      <ul class="list-group mt-2">
        <li class="list-group-item">
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">Tên tài khoản</h6>
            </div>
            <div class="col-sm-9 text-secondary">{{ user.username }}</div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">Họ và tên</h6>
            </div>
            <div class="col-sm-9 text-secondary">{{ user.fullName }}</div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">Địa chỉ email</h6>
            </div>
            <div class="col-sm-9 text-secondary">{{ user.email }}</div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">Số điện thoại</h6>
            </div>
            <div class="col-sm-9 text-secondary">{{ user.phoneNumber }}</div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">Địa chỉ</h6>
            </div>
            <div class="col-sm-9 text-secondary">
              {{ user.address }}
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="col-md-12 col-lg-6">
      <div class="card mt-2">
        <div class="card-body">
          <form>
            <div class="form-group">
              <label for="inputCurrentPassword">Mật khẩu hiện tại</label>
              <input
                type="password"
                class="form-control"
                id="inputCurrentPassword"
              />
            </div>
            <div class="form-group">
              <label for="inputNewPassword">Mật khẩu mới</label>
              <input
                type="password"
                class="form-control"
                id="inputNewPassword"
              />
            </div>
            <div class="form-group">
              <label for="inputConfirmPassword">Xác nhận mật khẩu mới</label>
              <input
                type="password"
                class="form-control"
                id="inputConfirmPassword"
              />
            </div>
            <button type="submit" class="btn btn-primary">Đổi mật khẩu</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import User from "@/models/User";
import authService from "@/service/auth-service";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  user: User | null = null;

  created() {
    authService
      .getUserInfo()
      .then((res) => {
        this.user = res.data;
      })
      .catch(() => {
        this.$router.push("/");
      });
  }
}
</script>

<style lang="scss" scoped>
.fa-edit {
  margin: 0 5px;
  cursor: pointer;
  color: #fea82f;
}
.list-group-item {
  font-size: 16px;
  color: #333333;
  .text-secondary {
    color: #6c757d !important;
  }
}

.btn {
  background-color: #fea82f;
  border-color: #fea82f;
}
</style>