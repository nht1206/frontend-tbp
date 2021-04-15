<template>
  <div
    id="main-review-slider"
    class="slider-bg1 owl-carousel owl-theme product-review"
  >
    <slot name="items"></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import $ from "jquery";
@Component
export default class extends Vue {
  @Prop({ type: Boolean, default: true })
  loop!: boolean;
  @Prop({ type: Boolean, default: true })
  nav!: boolean;
  @Prop({ type: Number, default: 1 })
  items!: number;
  @Prop({
    default() {
      return [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>",
      ];
    },
  })
  navTexts!: Array<string>;
  @Prop({ type: Boolean, default: false })
  dots!: boolean;

  animate(): void {
    $("#main-slider").on("translate.owl.carousel", function () {
      $(".slider-text").removeClass("fadeInUp animated").hide();
    });
    $("#main-slider").on("translated.owl.carousel", function () {
      $(".slider-text").addClass("fadeInUp animated").show();
    });

    $("#main-slider").on("translate.owl.carousel", function () {
      $(".slider-img").removeClass("fadeInDown animated").hide();
    });
    $("#main-slider").on("translated.owl.carousel", function () {
      $(".slider-img").addClass("fadeInDown animated").show();
    });

    $("#main-slider").on("translate.owl.carousel", function () {
      $(".slider-img-two").removeClass("fadeInDown animated").hide();
    });
    $("#main-slider").on("translated.owl.carousel", function () {
      $(".slider-img-two").addClass("fadeInDown animated").show();
    });

    $("#main-slider").on("translate.owl.carousel", function () {
      $(".slider-countdown").removeClass("fadeInUp animated").hide();
    });
    $("#main-slider").on("translated.owl.carousel", function () {
      $(".slider-countdown").addClass("fadeInUp animated").show();
    });

    $("#main-slider").on("translate.owl.carousel", function () {
      $(".cou-slider-img").removeClass("fadeInDown animated").hide();
    });
    $("#main-slider").on("translated.owl.carousel", function () {
      $(".cou-slider-img").addClass("fadeInDown animated").show();
    });
  }
  mounted(): void {
    ($("#main-review-slider") as any).owlCarousel({
      loop: this.loop,
      nav: this.nav,
      items: this.items,
      navText: this.navTexts,
      dots: this.dots,
    });
    this.animate();
  }
}
</script>

<style lang="scss" scoped>
.slider-bg1 {
  background-image: url(~@/assets/img/slider-img/slider-bg-img.jpg);
  position: relative;
  width: 100%;
  height: 60vh;
  background-size: cover;
  background-position: center;
}
.product-review {
  padding: 0;
  margin: 0;
  text-align: left;
}
</style>
