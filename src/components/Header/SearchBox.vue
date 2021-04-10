<template>
  <div class="input-group">
    <input
      type="text"
      class="form-control"
      placeholder="Tìm kiếm ..."
      aria-label="Search for..."
    />
    <span class="input-group-btn">
      <button class="btn" type="button">
        <i class="fa fa-search" aria-hidden="true"></i>
      </button>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.input-group {
  margin-left: 10px;
  input {
    border-color: #ececec;
    background: whitesmoke;
    color: #a5a5a5;
    font-size: 14px;
    padding: 14px;
    margin-bottom: 0;
    height: auto;
  }
}
.btn {
  border-left: 0;
  border-color: #ececec;
  background: whitesmoke;
  color: #a5a5a5;
  padding: 14px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  cursor: pointer;
  i {
    transition: 0.5s;
  }
}
.btn:hover {
  background: #ff9800;
  border-color: #ff9800;
  i {
    color: white;
  }
}
@media (max-width: 991px) {
  .input-group {
    padding: 0;
    margin: 0 0 20px;
  }
}
@media (max-width: 575px) {
  .input-group {
    padding: 0;
    margin: 0 0 20px;
  }
}
@media (max-width: 991px) {
  .input-group {
    margin: 0px;
  }
}
</style>