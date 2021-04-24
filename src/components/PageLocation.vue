<template>
  <div class="page-location">
    <ul>
      <li>
        <router-link to="/" v-slot="{ navigate, href }" custom>
          <a :href="href" @click="navigate">
            Trang chủ <span class="divider">/</span>
          </a>
        </router-link>
      </li>
      <li v-for="(l, idx) in pageLocation" :key="idx">
        <a class="page-location-active">
          {{ l }}
          <span class="divider">/</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ default: [] })
  pageLocation!: string[];
}
</script>

<style lang="scss" scoped>
.page-location {
  padding: 5px 0 5px 17px;
  li {
    display: inline-block;
    margin-right: 3px;
    &:last-child {
      a {
        color: #333333;
        .divider {
          display: none;
        }
      }
    }
  }
  a {
    color: #999999;
    &:hover {
      color: #ff9800;
    }
  }
}
</style>
