<template>
  <div class="home">
    <HeaderTop></HeaderTop>
    <Header></Header>
    <NavBar></NavBar>
    <router-view></router-view>
    <NewsLetter></NewsLetter>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header/Header.vue";
import HeaderTop from "@/components/HeaderTop/HeaderTop.vue";
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
  },
})
export default class Home extends Vue {}
</script>
