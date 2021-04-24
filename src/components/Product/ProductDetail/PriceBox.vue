<template>
  <div class="col-12 col-md-12 col-lg-12 col-xl-4 price-history-box">
    <div class="row price-box">
      <div class="col-5 col-lg-2 col-xl-5 p0">
        <div :id="id" class="circle-progress">
          <strong class="total-price">{{ value }}%</strong>
        </div>
      </div>
      <div class="col-7 col-lg-6 col-lg-7 p0">
        <div class="main-price">
          <strong>{{ sinceValue }}%</strong>
          <p class="since-price">{{ sinceText }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  id!: string;

  @Prop({ type: Number, required: true, default: 0 })
  value!: number;

  @Prop({ type: Number, required: true })
  sinceValue!: number;
  @Prop({ type: String, required: true })
  sinceText!: string;

  mounted(): void {
    // eslint-disable-next-line
    ($("#" + this.id) as any).circleProgress({
      value: this.value / 100,
      fill: {
        gradient: ["yellow", "#82b1ff"],
      },
    });
  }

  created(): void {
    this.id =
      "circle-progress-" +
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
  }
}
</script>

<style lang="scss" scoped>
.price-box {
  padding: 15px 10px;
  box-shadow: 0px 0px 17px 3px rgba(149, 161, 167, 0.2);
}
.main-price {
  padding-top: 10px;
  strong {
    font-size: 16px;
    padding-top: 10px;
    display: inline-block;
    color: #0065cd;
  }
}
.since-price {
  font-size: 12px;
  color: #999999;
}
.price-history-box {
  padding: 20px;
  margin-bottom: 20px;
}
.total-price {
  position: absolute;
  top: 4px;
  left: 33px;
  transform: translate(-50%, 50%);
  font-size: 18px;
  color: #0065cd;
  font-weight: 300;
}
</style>
