<template>
  <div class="page-location">
    <ul>
      <li>
        <router-link to="/" v-slot="{ navigate, href }">
          <a :href="href" @click="navigate">
            Home <span class="divider">/</span>
          </a>
        </router-link>
      </li>
      <li>
        <a class="page-location-active" href="#">
          Shop
          <span class="divider">/</span>
        </a>
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
.page-location {
  padding: 5px 0 5px 17px;
  li {
    display: inline-block;
    margin-right: 3px;
  }
  a {
    color: #999999;
    &:hover {
      color: #ff9800;
    }
  }
  .page-location-active {
    color: #333333;
    .divider {
      display: none;
    }
  }
}
</style>
