<template>
  <div class="home">
    <HeaderTop></HeaderTop>
    <Header></Header>
    <NavBar></NavBar>
    <router-view></router-view>
    <product-view-modal></product-view-modal>
    <NewsLetter></NewsLetter>
    <Footer></Footer>
    <ScrollUp></ScrollUp>
    <login-inform-modal></login-inform-modal>
  </div>
</template>

<script lang="ts">
import Footer from "@/components/Home/Footer.vue";
import Header from "@/components/Home/Header/Header.vue";
import HeaderTop from "@/components/Home/HeaderTop/HeaderTop.vue";
import ProductViewModal from "@/components/Home/modal/ProductViewModal.vue";
import NavBar from "@/components/Home/NavBar/NavBar.vue";
import NewsLetter from "@/components/Home/NewsLetter.vue";
import ScrollUp from "@/components/Home/ScrollUp.vue";
import { Component, Vue } from "vue-property-decorator";

import "lightslider/dist/css/lightslider.css";
import "lightslider/dist/js/lightslider";

import "jquery-circle-progress/dist/circle-progress";

import "@/assets/styles/animate.css";
import trackingService from "@/service/tracking-service";
import LoginInformModal from "@/components/Home/modal/LoginInformModal.vue";

@Component({
  components: {
    HeaderTop,
    Header,
    NavBar,
    Footer,
    NewsLetter,
    ProductViewModal,
    ScrollUp,
    LoginInformModal,
  },
})
export default class Home extends Vue {
  created(): void {
    trackingService.trackingAccess();
  }
}
</script>
