<template>
  <div class="service">
    <div class="container">
      <div class="row">
        <service-box color="blue">
          <template v-slot:content>
            <img src="@/assets/img/service/social.png" alt="social" />
            <div class="box-text d-flex align-items-center">
              <h5>Kết nối doanh nghiệp</h5>
            </div>
          </template>
        </service-box>
        <service-box color="yellow"
          ><template v-slot:content>
            <img src="@/assets/img/service/price.png" alt="social" />
            <div class="box-text d-flex align-items-center">
              <h5>So sánh giá</h5>
            </div>
          </template>
          ></service-box
        >
        <service-box color="orange"
          ><template v-slot:content>
            <img src="@/assets/img/service/multivendor.png" alt="social" />
            <div class="box-text d-flex align-items-center">
              <h5>Đa gian hàng</h5>
            </div>
          </template>
          ></service-box
        >
        <service-box color="light-blue"
          ><template v-slot:content>
            <img src="@/assets/img/service/product.png" alt="social" />
            <div class="box-text d-flex align-items-center">
              <h5>Đánh giá sản phẩm</h5>
            </div>
          </template>
          ></service-box
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ServiceBox from "./ServiceBox.vue";

@Component({
  components: { ServiceBox },
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.service {
  background: #f5f5f5;
  padding: 50px 0;
}
</style>
