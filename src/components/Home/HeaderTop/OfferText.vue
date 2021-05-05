<template>
  <div class="offer-text text-center">
    <p class="text-uppercase">{{ offerText }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ required: true })
  offerText!: string;
}
</script>

<style lang="scss" scoped>
.offer-text {
  p {
    font-size: 16px;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    color: #dc4b3e;
  }
}
@media (max-width: 768px) {
  .offer-text {
    p {
      font-size: 13px;
    }
  }
}
@media (max-width: 575px) {
  .offer-text {
    p {
      font-size: 11px;
    }
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .offer-text {
    p {
      font-size: 14px;
    }
  }
}
@media (max-width: 991px) {
  .offer-text {
    p {
      font-size: 10px;
      margin-top: 7px;
    }
  }
}
</style>
