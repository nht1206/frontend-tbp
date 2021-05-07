<template>
  <nav
    class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"
  >
    <button
      id="sidebarToggleTop"
      @click="toggleSidebar"
      class="btn btn-link d-md-none rounded-circle mr-3"
    >
      <i class="fa fa-bars"></i>
    </button>

    <search-box></search-box>

    <!-- Topbar Navbar -->
    <ul class="navbar-nav ml-auto">
      <!-- Nav Item - Search Dropdown (Visible Only XS) -->
      <li class="nav-item dropdown no-arrow d-sm-none">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="searchDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i class="fa fa-search fa-fw"></i>
        </a>
        <!-- Dropdown - Messages -->
        <div
          class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
          aria-labelledby="searchDropdown"
        >
          <form class="form-inline mr-auto w-100 navbar-search">
            <div class="input-group">
              <input
                type="text"
                class="form-control bg-light border-0 small"
                placeholder="Search for..."
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
              <div class="input-group-append">
                <button class="btn btn-primary" type="button">
                  <i class="fas fa-search fa-sm"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </li>

      <!-- Nav Item - Alerts -->
      <dropdown-nav-item :menuClasses="['dropdown-list']">
        <template v-slot:title>
          <i class="fa fa-bell fa-fw"></i>
          <span class="badge badge-danger badge-counter">3+</span>
        </template>
        <template v-slot:items>
          <h6 class="dropdown-header">Alerts Center</h6>
          <a class="dropdown-item d-flex align-items-center" href="#">
            <div class="mr-3">
              <div class="icon-circle bg-primary">
                <i class="fa fa-file-alt text-white"></i>
              </div>
            </div>
            <div>
              <div class="small text-gray-500">December 12, 2019</div>
              <span class="font-weight-bold"
                >A new monthly report is ready to download!</span
              >
            </div>
          </a>
          <a class="dropdown-item d-flex align-items-center" href="#">
            <div class="mr-3">
              <div class="icon-circle bg-success">
                <i class="fas fa-donate text-white"></i>
              </div>
            </div>
            <div>
              <div class="small text-gray-500">December 7, 2019</div>
              $290.29 has been deposited into your account!
            </div>
          </a>
          <a class="dropdown-item d-flex align-items-center" href="#">
            <div class="mr-3">
              <div class="icon-circle bg-warning">
                <i class="fas fa-exclamation-triangle text-white"></i>
              </div>
            </div>
            <div>
              <div class="small text-gray-500">December 2, 2019</div>
              Spending Alert: We've noticed unusually high spending for your
              account.
            </div>
          </a>
          <a class="dropdown-item text-center small text-gray-500" href="#"
            >Show All Alerts</a
          >
        </template>
      </dropdown-nav-item>

      <!-- Nav Item - Messages -->
      <dropdown-nav-item :menuClasses="['dropdown-list']">
        <template v-slot:title>
          <i class="fa fa-envelope fa-fw"></i>
          <span class="badge badge-danger badge-counter">7</span>
        </template>
        <template v-slot:items>
          <h6 class="dropdown-header">Message Center</h6>
          <a class="dropdown-item d-flex align-items-center" href="#">
            <div class="dropdown-list-image mr-3">
              <img
                class="rounded-circle"
                src="img/undraw_profile_1.svg"
                alt="..."
              />
              <div class="status-indicator bg-success"></div>
            </div>
            <div class="font-weight-bold">
              <div class="text-truncate">
                Hi there! I am wondering if you can help me with a problem I've
                been having.
              </div>
              <div class="small text-gray-500">Emily Fowler · 58m</div>
            </div>
          </a>
          <a class="dropdown-item d-flex align-items-center" href="#">
            <div class="dropdown-list-image mr-3">
              <img
                class="rounded-circle"
                src="img/undraw_profile_2.svg"
                alt="..."
              />
              <div class="status-indicator"></div>
            </div>
            <div>
              <div class="text-truncate">
                I have the photos that you ordered last month, how would you
                like them sent to you?
              </div>
              <div class="small text-gray-500">Jae Chun · 1d</div>
            </div>
          </a>
          <a class="dropdown-item d-flex align-items-center" href="#">
            <div class="dropdown-list-image mr-3">
              <img
                class="rounded-circle"
                src="img/undraw_profile_3.svg"
                alt="..."
              />
              <div class="status-indicator bg-warning"></div>
            </div>
            <div>
              <div class="text-truncate">
                Last month's report looks great, I am very happy with the
                progress so far, keep up the good work!
              </div>
              <div class="small text-gray-500">Morgan Alvarez · 2d</div>
            </div>
          </a>
          <a class="dropdown-item d-flex align-items-center" href="#">
            <div class="dropdown-list-image mr-3">
              <img
                class="rounded-circle"
                src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
                alt="..."
              />
              <div class="status-indicator bg-success"></div>
            </div>
            <div>
              <div class="text-truncate">
                Am I a good boy? The reason I ask is because someone told me
                that people say this to all dogs, even if they aren't good...
              </div>
              <div class="small text-gray-500">Chicken the Dog · 2w</div>
            </div>
          </a>
          <a class="dropdown-item text-center small text-gray-500" href="#"
            >Read More Messages</a
          >
        </template>
      </dropdown-nav-item>

      <nav-bar-divider></nav-bar-divider>

      <!-- Nav Item - User Information -->
      <dropdown-nav-item v-if="user">
        <template v-slot:title>
          <span class="mr-2 d-none d-lg-inline text-gray-600 small">{{
            user.fullName
          }}</span>
          <img
            class="img-profile rounded-circle"
            src="@/assets/img/undraw_profile.svg"
          />
        </template>
        <template v-slot:items>
          <a class="dropdown-item" href="#">
            <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
            Hồ sơ cá nhân
          </a>
          <a class="dropdown-item" href="#">
            <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
            Cài đặt
          </a>
          <div class="dropdown-divider"></div>
          <button v-b-modal.logout-modal class="dropdown-item">
            <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
            Đăng xuất
          </button>
          <logout-modal></logout-modal>
        </template>
      </dropdown-nav-item>
    </ul>
  </nav>
  <!-- End of Topbar -->
</template>

<script lang="ts">
import User from "@/models/User";
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import LogoutModal from "../Modal/LogoutModal.vue";
import DropdownNavItem from "./DropdownNavItem.vue";
import NavBarDivider from "./NavBarDivider.vue";
import SearchBox from "./SearchBox.vue";

@Component({
  components: { DropdownNavItem, NavBarDivider, SearchBox, LogoutModal },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
})
export default class extends Vue {
  user!: User;

  toggleSidebar(): void {
    this.$root.$emit("toggleSidebar");
  }

  mounted(): void {
    this.$store.commit("auth/loadUser");
  }
}
</script>
