<template>
  <footer class="footer wow fadeInUp animated" data-wow-delay="900ms">
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <!-- ===========================
    						Footer About
    					 =========================== -->
          <div class="footer-about">
            <router-link to="/" custom v-slot="{ href, navigate }">
              <a @click="navigate" :href="href" class="footer-about-logo">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/shop1-eeb2c.appspot.com/o/images%2Ffinal2.png?alt=media&token=b199fa1f-d1b7-4596-b77d-12f907dcd436"
                  alt="Logo"
                />
              </a>
            </router-link>
            <div class="footer-description">
              <p>
                Hệ thống so sánh giá, so sánh sản phẩm tốt nhất. Giá được cập
                nhật hằng ngày.
              </p>
            </div>
            <div class="wb-social-media">
              <a href="#" class="bh"><i class="fab fa-behance"></i></a>
              <a href="#" class="fb"><i class="fab fa-facebook"></i></a>
              <a href="#" class="db"><i class="fab fa-dribbble"></i></a>
              <a href="#" class="gp"><i class="fab fa-google-plus"></i></a>
              <a href="#" class="vn"><i class="fab fa-vine"></i></a>
              <a href="#" class="yt"><i class="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
        <div class="col-md-2 footer-view-controller">
          <!-- ===========================
    						Festival Deals
    					 =========================== -->
          <div class="footer-nav">
            <h6 class="footer-subtitle active-color">Menu</h6>
            <li>
              <router-link to="/danh-sach-san-pham" v-slot="{ href, navigate }"
                ><a @click="navigate" :href="href"
                  >Danh sách sản phẩm</a
                ></router-link
              >
            </li>
            <li>
              <router-link to="/login" v-slot="{ href, navigate }"
                ><a @click="navigate" :href="href">Đăng nhập</a></router-link
              >
            </li>
            <li>
              <a @click="checkLoginToNavigate('/tai-khoan')">Tài khoản</a>
            </li>
            <li>
              <a @click="checkLoginToNavigate('/dang-ky-cua-hang')"
                >Đăng ký cửa hàng</a
              >
            </li>
          </div>
        </div>
        <div class="col-md-3 footer-view-controller">
          <!-- ===========================
    						Top Stores
    					 =========================== -->
          <div class="footer-nav">
            <div class="stores-list">
              <h6 class="footer-subtitle">Top Stores</h6>
              <ul>
                <li v-for="r in retailers" :key="r.id">
                  <a target="_blank" :href="r.homePage"> {{ r.name }} </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-2 footer-view-controller">
          <!-- ===========================
    						Need Help ?
    					 =========================== -->
          <div class="footer-nav">
            <h6 class="footer-subtitle">Giúp đở ?</h6>
            <!-- <ul>
              <li><a href="#">Getting Started</a></li>
              <li><a href="#">Contact us</a></li>
              <li><a href="#">FAQ's</a></li>
              <li><a href="#">Press</a></li>
            </ul> -->
          </div>
        </div>
        <div class="col-md-2 footer-view-controller">
          <!-- ===========================
    						About
    					 =========================== -->
          <div class="footer-nav">
            <h6 class="footer-subtitle">Về The best price</h6>
            <!-- <ul>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Return Policy</a></li>
              <li><a href="#">Order &#38; Return</a></li>
              <li><a href="#">Terms &#38; Conditions</a></li>
            </ul> -->
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import Retailer from "@/models/Retailer";
import User from "@/models/User";
import retailerService from "@/service/retailer-service";
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
  retailers: Retailer[] = [];
  user!: User;

  created() {
    retailerService.getRetailers().then((res) => {
      this.retailers = res.data;
    });
  }

  checkLoginToNavigate(path: string) {
    if (!this.user) {
      this.$bvModal.show("login-inform-modal");
    } else {
      this.$router.push(path);
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  padding: 100px 0 70px;
  border-top: 1px solid #f3f3f3;
  a {
    color: #999;
    font-size: 14px;
    font-weight: 300;
    position: relative;
    &:before {
      content: "";
      position: absolute;
      bottom: 0;
      height: 1px;
      background: #ff9800;
      width: 0;
      transition: 0.5s;
    }
    &:hover {
      color: #ff9800;
      &:before {
        width: 100%;
      }
    }
  }
  li {
    margin-bottom: 8px;
  }
  .footer-subtitle {
    margin-bottom: 25px;
    font-weight: 400;
    font-size: 16px;
  }
  .footer-description {
    color: #999;
    font-weight: 300;
    margin-top: 20px;
    margin-bottom: 24px;
  }
  .wb-social-media {
    a {
      margin-right: 6px;
      &:hover {
        &:before {
          width: 0;
        }
      }
    }
  }
  // .stores-list {
  //   padding-left: 50px;
  // }
  .footer-about-logo {
    &:hover {
      &:before {
        background: transparent;
      }
    }
  }
  .newsletter-btn:hover {
    background: #fff;
    color: #ff9800;
    border-color: #ff9800;
  }
}
@media (max-width: 768px) {
  .footer-about {
    text-align: center;
  }
}

@media (max-width: 991px) {
  .footer {
    padding: 50px 0 70px;
    .footer-about {
      text-align: center;
      margin-bottom: 50px;
    }
    .stores-list {
      padding: 0;
    }
    .footer-subtitle {
      margin-bottom: 10px;
    }
    .footer-nav {
      text-align: center;
      margin-bottom: 30px;
    }
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .footer {
    .footer-about {
      text-align: left;
    }
    .footer-subtitle {
      text-align: left;
    }
    .footer-nav {
      text-align: left;
      a {
        cursor: pointer;
      }
    }
    .wb-social-media {
      a {
        display: inline-block;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
