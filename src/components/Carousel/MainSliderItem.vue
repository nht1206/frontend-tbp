<template>
  <div class="item slider-bg d-flex align-items-center">
    <div class="container">
      <div class="row no-gutters">
        <div
          class="slider-text fadeInUp animated order-2 order-sm-1 col-sm-6 col-md-7"
        >
          <slot name="content"></slot>
        </div>
        <div
          class="col-sm-6 col-md-5 order-1 order-sm-2 slider-img fadeInDown animated"
        >
          <slot name="image"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.slider-bg {
  position: relative;
  width: 100%;
  height: 60vh;
  background-size: cover;
  background-position: center;
}
.slider-text {
  top: 50%;
  color: #fff;
}
.slider-title {
  font-weight: 300;
  margin-bottom: 20px;
  font-size: 50px;
}
.slider-content {
  margin-bottom: 40px;
  font-size: 18px;
}
.slider-btn {
  font-size: 18px;
  i {
    font-size: 15px;
    margin-left: 8px;
  }
}
.strong {
  font-weight: 700;
}
.slider-btn:hover {
  border-color: #fff;
}

@media (max-width: 768px) {
  .slider-btn {
    font-size: 12px !important;
    padding: 5px !important;
    margin-top: 9px;
  }
  .slider-btn i {
    font-size: 12px;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .slider-title {
    font-size: 28px;
  }
  .slider-content {
    font-size: 12px;
    margin-bottom: 20px;
  }
}
@media (max-width: 1024px) {
  /* Slider Section */
  .slider-title {
    font-size: 20px;
    margin-bottom: 10px;
  }
  .slider-btn {
    font-size: 13px;
    padding: 7px 10px;
  }
  .owl-item img {
    height: auto;
  }
}
@media (min-width: 992px) and (max-width: 1024px) {
  .slider-content {
    display: block;
    margin: 10px 10px 15px;
    margin-left: 0;
    font-size: 14px;
  }
  .slider-content br {
    display: none;
  }
}
@media (min-width: 1025px) and (max-width: 1638px) {
  .slider-content {
    font-size: 14px;
    margin-bottom: 20px;
  }
  .slider-content br {
    display: none;
  }
}
@media (min-width: 1025px) and (max-width: 1638px) {
  .slider-title {
    font-size: 35px;
  }
}
@media (max-width: 575px) {
  .owl-carousel {
    .owl-stage-outer {
      padding-bottom: 30px;
    }
  }
  .slider-title {
    font-size: 12px;
    margin-bottom: 10px;
    margin-top: 5px;
  }
  .slider-content {
    display: none;
  }
  .slider-text {
    margin-top: 0px;
    margin-bottom: 30px;
    text-align: center;
  }
}

@media (max-width: 1024px) {
  .owl-carousel .owl-item img {
    height: auto;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .slider-content {
    margin-bottom: 19px;
    font-size: 13px;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .slider-title {
    font-size: 40px;
  }
}
</style>
