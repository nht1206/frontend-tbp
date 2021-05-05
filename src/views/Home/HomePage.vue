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

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel";

import "lightslider/dist/css/lightslider.css";
import "lightslider/dist/js/lightslider";

import "jquery-circle-progress/dist/circle-progress";

import "@/assets/styles/animate.css";

@Component({
  components: {
    HeaderTop,
    Header,
    NavBar,
    Footer,
    NewsLetter,
    ProductViewModal,
    ScrollUp,
  },
})
export default class Home extends Vue {}
</script>
