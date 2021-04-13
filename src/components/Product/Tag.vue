<template>
  <div class="side-bar tags-box">
    <h5 class="title">Tags</h5>
    <ul>
      <li><a href="#">Comerce </a></li>
      <li><a href="#">Trending</a></li>
      <li><a href="#">Business</a></li>
      <li><a href="#">market</a></li>
      <li><a href="#">mobile</a></li>
      <li><a href="#">Business</a></li>
      <li><a href="#">Comerce </a></li>
      <li><a href="#">Trending</a></li>
      <li><a href="#">Business</a></li>
      <li><a href="#">market</a></li>
      <li><a href="#">mobile</a></li>
      <li><a href="#">Business</a></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.tags-box {
  a {
    background: #f1f1f1;
    padding: 3px 8px;
    font-size: 11px;
    margin-bottom: 2px;
    display: inline-block;
  }
  li {
    display: inline-block;
  }
}
</style>