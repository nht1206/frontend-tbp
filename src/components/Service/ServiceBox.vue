<template>
  <div class="col-6 col-md-6 col-lg-3">
    <div class="service-box wow fadeIn animated" :class="getColor()">
      <slot name="content"></slot>
      <div class="hover-img">
        <slot name="image"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ type: String, default: "blue" })
  color!: string;

  getColor(): any {
    if (this.color === "blue") {
      return {
        blue: true,
      };
    }
    if (this.color === "orange") {
      return {
        orange: true,
      };
    }
    if (this.color === "light-blue") {
      return {
        "light-blue": true,
      };
    }
    if (this.color === "yellow") {
      return {
        yellow: true,
      };
    }
  }
}
</script>

<style lang="scss" scoped>
.service-box {
  background: #fff;
  padding: 35px 20px;
  background-repeat: no-repeat;
  background-position: bottom right;
  position: relative;
  overflow: hidden;
  transition: 0.5s;
  transform: translateY(0);

  .hover-img {
    position: absolute;
    right: 0;
    bottom: 0;
    img {
      transition: 0.5s;
    }
  }
}
.service-box:before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  transition: 0.5s;
}
.service-box:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 0%;
  height: 3px;
  transition: 0.5s;
}
.service-box:hover {
  box-shadow: 0px 8px 16px 0px rgba(130, 156, 199, 0.2);
  transform: translateY(-10px);
  .hover-img {
    img {
      transform: scale(1.3);
    }
  }
}
.service-box:hover:before {
  width: 0;
}
.service-box:hover:after {
  width: 100%;
}
.service-box {
  display: flex;
}
.box-text {
  margin-left: 15px;
}
.blue:before {
  background: #19b2f7;
}
.blue:after {
  background: #19b2f7;
}
.yellow:before {
  background: #f7cf00;
}
.yellow:after {
  background: #f7cf00;
}
.orange:before {
  background: #ff6969;
}
.orange:after {
  background: #ff6969;
}
.light-blue:before {
  background: #00c9e2;
}
.light-blue:after {
  background: #00c9e2;
}
</style>