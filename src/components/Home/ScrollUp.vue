<template>
  <a
    id="scrollUp"
    @click="scrollTop"
    style="position: fixed; z-index: 2147483647; display: none"
    :class="{ visible: visible }"
    ><i class="fa fa-angle-double-up" aria-hidden="true"></i
  ></a>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  intervalId!: number;
  visible = false;
  scrollTop(): void {
    this.intervalId = setInterval(() => {
      if (window.pageYOffset === 0) {
        clearInterval(this.intervalId);
      }
      window.scroll(0, window.pageYOffset - 50);
    }, 20);
  }
  scrollListener(): void {
    this.visible = window.scrollY > 150;
  }
  mounted(): void {
    window.addEventListener("scroll", this.scrollListener);
  }
  beforeDestroy(): void {
    window.removeEventListener("scroll", this.scrollListener);
  }
}
</script>

<style lang="scss" scoped>
#scrollUp {
  bottom: 60px;
  right: 20px;
  padding: 13px 0;
  text-align: center;
  width: 50px;
  height: 50px;
  background-color: #555;
  color: #fff;
  border-radius: 100%;
  cursor: pointer;
  i {
    font-size: 25px;
  }
  &:hover {
    background: #ff9800;
  }
}
#scrollUp.visible {
  display: block !important;
}
</style>
