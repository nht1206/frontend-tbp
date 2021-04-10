<template>
  <div class="media">
    <img class="d-flex mr-3" src="@/assets/img/cart-img-1.jpg" alt="cart-img" />
    <div class="media-body">
      <h6 class="mt-0 list-group-title">Voyage Yoga Bag</h6>
      <div class="rating">
        <a href="#"
          ><i class="fa fa-star active-color" aria-hidden="true"></i
        ></a>
        <a href="#"
          ><i class="fa fa-star active-color" aria-hidden="true"></i
        ></a>
        <a href="#"
          ><i class="fa fa-star active-color" aria-hidden="true"></i
        ></a>
        <a href="#"><i class="fa fa-star-o" aria-hidden="true"></i></a>
        <a href="#"><i class="fa fa-star-o" aria-hidden="true"></i></a>
      </div>
      <div class="cart-price">$59</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.media {
  padding: 10px 10px;
  border-bottom: 1px solid #f3f3f3;
  .list-group-title {
    font-size: 14px;
    font-weight: 400;
  }
}
.media:last-child {
  border-bottom: 0;
}
</style>