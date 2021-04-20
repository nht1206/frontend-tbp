<template>
  <div class="home">
    <HeaderTop></HeaderTop>
    <Header></Header>
    <NavBar></NavBar>
    <router-view></router-view>
    <product-view-modal></product-view-modal>
    <NewsLetter></NewsLetter>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header/Header.vue";
import HeaderTop from "@/components/HeaderTop/HeaderTop.vue";
import ProductViewModal from "@/components/modal/ProductViewModal.vue";
import NavBar from "@/components/NavBar/NavBar.vue";
import NewsLetter from "@/components/NewsLetter.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    HeaderTop,
    Header,
    NavBar,
    Footer,
    NewsLetter,
    ProductViewModal,
  },
})
export default class Home extends Vue {}
</script>
