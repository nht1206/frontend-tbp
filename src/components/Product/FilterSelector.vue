<template>
  <div class="d-flex filter-selector">
    <p>Sắp xếp theo:</p>
    <button
      type="button"
      @click="toggle"
      v-click-outside="close"
      class="btn dropdown-toggle filter-btn"
    >
      Default
    </button>
    <div class="dropdown-menu" :class="{ show: isOpen }">
      <a class="dropdown-item" href="#">Camara</a>
      <a class="dropdown-item" href="#">Joystick</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  isOpen = false;

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  close(): void {
    this.isOpen = false;
  }
}
</script>

<style lang="scss" scoped>
.filter-selector {
  button {
    font-size: 12px;
  }
  p {
    font-size: 12px;
    color: #666666;
    padding-top: 5px;
  }
  .show {
    > .btn.dropdown-toggle {
      background: #f7f7f7;
      border-color: #ececec;
    }
  }
  .dropdown-item {
    &:active {
      background-color: #ff9800;
    }
  }
  .dropdown-menu {
    border-radius: 0;
    font-size: 12px;
    padding: 0;
  }
  .filter-btn {
    padding: 6px 10px;
    border-radius: 0;
    margin-left: 10px;
    background: #f7f7f7;
    border: 1px solid #ececec;
    color: #666666;
  }
}
</style>