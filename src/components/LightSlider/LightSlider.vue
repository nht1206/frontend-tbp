<template>
  <ul id="lightSlider">
    <li v-for="(image, idx) in images" :key="idx" :data-thumb="image">
      <img class="figure-img img-fluid" :src="image" alt="product-img" />
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({
    required: true,
  })
  images!: string[];
  mounted(): void {
    // eslint-disable-next-line
    ($("#lightSlider") as any).lightSlider({
      gallery: true,
      item: 1,
      loop: true,
      slideMargin: 0,
      thumbItem: 5,
    });
  }
}
</script>

<style lang="scss">
.lSSlideOuter {
  .lSPager.lSGallery {
    li {
      margin: 0 !important;
      border: 1px solid #ececec;
      border-radius: 0 !important;
      &:hover {
        border-color: #ff9800 !important;
      }
    }
    li.active {
      border-color: #ff9800 !important;
    }
  }
}
.lSAction {
  a {
    opacity: 1;
    &:after {
      font-family: FontAwesome;
      font-size: 25px;
      position: absolute;
      background: #fff;
      width: 52px;
      height: 52px;
      border-radius: 100px;
      border: 1px solid #f1f1f2;
      transition: 0.5s;
    }
    &:before {
      font-family: FontAwesome;
      font-size: 25px;
      position: absolute;
      background: #fff;
      width: 52px;
      height: 52px;
      border-radius: 100px;
      border: 1px solid #f1f1f2;
      transition: 0.5s;
    }
    &:hover {
      &:after {
        background: #ff9800;
      }
      &:before {
        background: #ff9800;
      }
    }
  }
  a.lSPrev {
    &:before {
      content: "\f104";
      padding: 7px 19px;
      transform: translate(-10px);
    }
  }
  a.lSNext {
    &:after {
      content: "\f105";
      padding: 7px 21px;
      transform: translate(-10px);
    }
  }
}
</style>
