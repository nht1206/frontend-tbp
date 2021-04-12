<template>
  <footer class="footer wow fadeInUp animated" data-wow-delay="900ms">
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <!-- ===========================
    						Footer About
    					 =========================== -->
          <div class="footer-about">
            <a href="#" class="footer-about-logo">
              <img src="@/assets/img/logo.png" alt="Logo" />
            </a>
            <div class="footer-description">
              <p>
                Lorem ipsum dolor sit amet, anim id est laborum. Sed ut
                perspconsectetur, adipisci vam aliquam qua.
              </p>
            </div>
            <div class="wb-social-media">
              <a href="#" class="bh"><i class="fa fa-behance"></i></a>
              <a href="#" class="fb"><i class="fa fa-facebook-official"></i></a>
              <a href="#" class="db"><i class="fa fa-dribbble"></i></a>
              <a href="#" class="gp"><i class="fa fa-google-plus"></i></a>
              <a href="#" class="vn"><i class="fa fa-vine"></i></a>
              <a href="#" class="yt"><i class="fa fa-youtube-play"></i></a>
            </div>
          </div>
        </div>
        <div class="col-md-2 footer-view-controller">
          <!-- ===========================
    						Festival Deals
    					 =========================== -->
          <div class="footer-nav">
            <h6 class="footer-subtitle active-color">Footer Menu</h6>
            <ul>
              <li><a href="index.html"> Home </a></li>
              <li><a href="compare-products.html">Comparison Product </a></li>
              <li><a href="shop-left-sidebar.html">Shop </a></li>
              <li><a href="review-left-sidebar.html">Reviews</a></li>
              <li><a href="blog-four-grid-left-sidebar.html">Blog</a></li>
            </ul>
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
                <li><a href="shop-left-sidebar.html">Affiliate Market 1</a></li>
                <li><a href="shop-left-sidebar.html">Affiliate Market 2</a></li>
                <li><a href="shop-left-sidebar.html">Affiliate Market 3</a></li>
                <li><a href="shop-left-sidebar.html">Affiliate Market 4</a></li>
                <li><a href="shop-left-sidebar.html">Affiliate Market 5</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-2 footer-view-controller">
          <!-- ===========================
    						Need Help ?
    					 =========================== -->
          <div class="footer-nav">
            <h6 class="footer-subtitle">Need Help ?</h6>
            <ul>
              <li><a href="#">Getting Started</a></li>
              <li><a href="contact-us.html">Contact us</a></li>
              <li><a href="#">FAQ's</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>
        </div>
        <div class="col-md-2 footer-view-controller">
          <!-- ===========================
    						About
    					 =========================== -->
          <div class="footer-nav">
            <h6 class="footer-subtitle">About</h6>
            <ul>
              <li><a href="conditions.html">Privacy</a></li>
              <li><a href="conditions.html">Return Policy</a></li>
              <li><a href="conditions.html">Order &#38; Return</a></li>
              <li><a href="conditions.html">Terms &#38; Conditions</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {}
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
</style>