<template>
  <div class="side-bar color-box">
    <h5 class="title">Color Option</h5>
    <ul>
      <li>
        <a href="#"
          ><i class="fa fa-square color-black" aria-hidden="true"></i> Black
        </a>
      </li>
      <li>
        <a href="#"
          ><i class="fa fa-square color-red" aria-hidden="true"></i> Red</a
        >
      </li>
      <li>
        <a href="#"
          ><i class="fa fa-square color-purple" aria-hidden="true"></i>
          Purple</a
        >
      </li>
      <li>
        <a href="#"
          ><i class="fa fa-square color-yellow" aria-hidden="true"></i>
          Yellow</a
        >
      </li>
      <li>
        <a href="#"
          ><i class="fa fa-square color-cyan" aria-hidden="true"></i> Cyan</a
        >
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.color-box {
  a {
    color: #666666;
    &:hover {
      color: #ff9800;
    }
  }
  i {
    margin-right: 5px;
  }
  li {
    margin-bottom: 8px;
  }
  .color-black {
    color: #000000;
  }
  .color-red {
    color: #f44336;
  }
  .color-purple {
    color: #673ab7;
  }
  .color-yellow {
    color: #ffc107;
  }
  .color-cyan {
    color: #00bcd4;
  }
}
</style>
