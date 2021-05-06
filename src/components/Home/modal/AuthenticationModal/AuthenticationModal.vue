<template>
  <b-modal id="sigin-signup" hide-footer hide-header size="md">
    <div class="container">
      <div class="row text-left">
        <div class="col-md-12 p0">
          <div class="modal-tab-section wd-modal-tabs">
            <ul
              class="nav nav-tabs wd-modal-tab-menu text-center"
              id="myTab"
              role="tablist"
            >
              <li class="nav-item">
                <a
                  class="nav-link"
                  @click="openLoginTab"
                  :class="{ active: login }"
                  >Đăng nhập</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  @click="openSignupTab"
                  :class="{ active: signup }"
                  >Đăng ký</a
                >
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade"
                :class="[{ show: login }, { active: login }]"
              >
                <div class="login-section text-center">
                  <div class="login-form text-left">
                    <login-form></login-form>
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade"
                :class="[{ show: signup }, { active: signup }]"
              >
                <div class="sign-up-section text-center">
                  <div class="login-form text-left">
                    <signup-form></signup-form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginForm from "./LoginForm.vue";
import SignupForm from "./SignupForm.vue";

@Component({
  components: { LoginForm, SignupForm },
})
export default class extends Vue {
  login = true;
  signup = false;

  openLoginTab(): void {
    this.login = true;
    this.signup = false;
  }

  openSignupTab(): void {
    this.signup = true;
    this.login = false;
  }
}
</script>

<style lang="scss">
#sigin-signup {
  .login-section {
    padding: 25px;
  }
  .nav-tabs {
    .nav-link.active {
      border-color: transparent;
      box-shadow: none;
      border-left: 1px solid #ececec;
      border-right: 1px solid #ececec;
    }
  }
  .login-form {
    margin-top: 36px;
    color: #666666;
    .form-control {
      border-radius: 0;
      padding: 16px;
      background: #f6f6f6;
      font-size: 14px;
    }
    .wd-login-btn {
      width: 100%;
      padding: 12px !important;
      background: #ff9800 !important;
      color: #fff !important;
      font-size: 16px;
      margin-bottom: 17px;
      border-radius: 0;
      cursor: pointer;
      text-transform: uppercase;
      &:hover {
        background: #fff !important;
        color: #ff9800 !important;
        border-color: #ff9800 !important;
      }
    }
    .form-check {
      margin-bottom: 20px;
      font-weight: 300;
    }
  }
  .sign-up-section {
    padding: 30px;
    .form-control {
      padding: 10px 16px;
      font-size: 14px;
    }
  }
  .wd-policy {
    font-weight: 300;
  }
  .wd-modal-tabs {
    position: relative;
  }
  .wd-modal-tab-menu {
    z-index: 10;
    background: #f4f4f4;
    a {
      padding: 23px 0;
      font-size: 20px;
      color: #999999;
      width: 199px;
      text-transform: uppercase;
    }
    .active {
      color: #000000 !important;
    }
  }
  .nav-link {
    cursor: pointer;
  }
}
</style>
