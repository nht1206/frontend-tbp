<template>
  <div class="loader-wrapper" v-if="isLoading">
    <svg
      class="loader"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 340 340"
    >
      <circle cx="170" cy="170" r="160" stroke="#E2007C" />
      <circle cx="170" cy="170" r="135" stroke="#404041" />
      <circle cx="170" cy="170" r="110" stroke="#E2007C" />
      <circle cx="170" cy="170" r="85" stroke="#404041" />
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({
    default: false,
  })
  isLoading!: boolean;
}
</script>

<style lang="scss" scoped>
.loader-wrapper {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  span {
    display: block;
  }
}
.loader {
  max-width: 4rem;
  width: 100%;
  height: auto;
  stroke-linecap: round;
}
circle {
  fill: none;
  stroke-width: 3.5;
  -webkit-animation-name: preloader;
  animation-name: preloader;
  -webkit-animation-duration: 3s;
  animation-duration: 3s;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
  -webkit-transform-origin: 170px 170px;
  transform-origin: 170px 170px;
  will-change: transform;
  &:nth-of-type(1) {
    stroke-dasharray: 550;
    -webkit-animation-delay: -0.15s;
    animation-delay: -0.15s;
  }
  &:nth-of-type(2) {
    stroke-dasharray: 500;
    -webkit-animation-delay: -0.3s;
    animation-delay: -0.3s;
  }
  &:nth-of-type(3) {
    stroke-dasharray: 450;
    -webkit-animation-delay: -0.45s;
    -moz-animation-delay: -0.45s;
    animation-delay: -0.45s;
  }
  &:nth-of-type(4) {
    stroke-dasharray: 300;
    -webkit-animation-delay: -0.6s;
    -moz-animation-delay: -0.6s;
    animation-delay: -0.6s;
  }
}

@-webkit-keyframes preloader {
  50% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes preloader {
  50% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
