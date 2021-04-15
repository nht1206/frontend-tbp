<template>
  <section id="subscribe">
    <div class="container">
      <div class="row subscribe-body">
        <div class="col-12 col-md-12 col-lg-5">
          <h4 class="subscribe-title">Đăng ký để cập nhật mới nhất</h4>
        </div>
        <div class="col-12 col-md-9 col-lg-5 p0">
          <div class="input-group h-100">
            <input
              type="text"
              class="form-control h-100"
              aria-label="Text input with segmented button dropdown"
            />
          </div>
        </div>
        <div class="col-12 col-md-3 col-lg-2">
          <button type="button" class="btn wd-shop-btn subscribe-btn">
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {}
</script>

<style lang="scss" scoped>
#subscribe {
  .subscribe-body {
    background: white;
    padding: 20px;
    box-shadow: 0px 0px 42px 0px rgba(130, 156, 199, 0.2);
    transform: translateY(37px);
    position: relative;
    z-index: 10;
  }
  .wd-shop-btn {
    padding: 8px 21px;
    color: bisque;

    &:hover {
      color: #ff9800;
    }
  }
  .subscribe-title {
    padding-top: 7px;
    font-weight: 300;
  }
  .subscribe-btn {
    cursor: pointer;
    &:hover {
      border-color: #ff9800;
    }
  }
}
</style>
