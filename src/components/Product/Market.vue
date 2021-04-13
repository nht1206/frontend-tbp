<template>
  <div class="side-bar check-box">
    <h5 class="title">Choose Market</h5>
    <ul>
      <li>
        <a href="#"><i class="fa fa-square-o" aria-hidden="true"></i> All </a>
      </li>
      <li>
        <a href="#"
          ><i class="fa fa-square-o" aria-hidden="true"></i> Market 1</a
        >
      </li>
      <li>
        <a href="#"
          ><i class="fa fa-square-o" aria-hidden="true"></i> Market 2</a
        >
      </li>
      <li>
        <a href="#"
          ><i class="fa fa-square-o" aria-hidden="true"></i> Market 3</a
        >
      </li>
      <li>
        <a href="#"
          ><i class="fa fa-square-o" aria-hidden="true"></i> Market 4</a
        >
      </li>
      <li>
        <a href="#"
          ><i class="fa fa-square-o" aria-hidden="true"></i> Market 5</a
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
.check-box {
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
}
</style>