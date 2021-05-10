<template>
  <div class="side-bar check-box">
    <h5 class="title">Chọn cửa hàng</h5>
    <ul>
      <li>
        <a @click="selectAll"
          ><i
            class="fa"
            :class="[
              {
                'fa-square-o': !isSelectedAll,
                'fa-check-square-o': isSelectedAll,
              },
            ]"
            aria-hidden="true"
          >
          </i>
          Tất cả
        </a>
      </li>
      <li v-for="r in retailers" :key="r.id">
        <a @click="select(r.id.toString())"
          ><i
            class="fa"
            :class="[
              {
                'fa-square-o': !isIdSelected(r.id.toString()),
                'fa-check-square-o': isIdSelected(r.id.toString()),
              },
            ]"
            aria-hidden="true"
          ></i>
          {{ r.name }}</a
        >
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Option from "@/models/Option";
import Retailer from "@/models/Retailer";
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  computed: {
    ...mapGetters({
      retailers: "retailer/retailers",
      option: "product/currentOption",
    }),
  },
})
export default class extends Vue {
  retailers!: Retailer[];
  option!: Option;
  isSelectedAll = false;
  mounted(): void {
    this.$store.dispatch("retailer/loadRetailers");
  }

  private selectedRetailerIds: string[] = [];

  selectAll(): void {
    this.isSelectedAll = !this.isSelectedAll;
    if (this.isSelectedAll) {
      this.selectedRetailerIds = this.retailers.map((r) => r.id + "");
    } else {
      this.selectedRetailerIds = [];
    }
    this.filter();
  }

  isIdSelected(id: string): boolean {
    const idx = this.selectedRetailerIds.indexOf(id);
    if (idx !== -1) {
      return true;
    }
    return false;
  }
  select(id: string): void {
    if (this.isIdSelected(id)) {
      this.selectedRetailerIds = this.selectedRetailerIds.filter(
        (sId) => sId !== id
      );
      if (this.isSelectedAll) {
        this.isSelectedAll = false;
      }
    } else {
      this.selectedRetailerIds.push(id);
    }
    console.log(this.selectedRetailerIds);
    this.filter();
  }

  filter(): void {
    this.$store.dispatch("product/searchProducts", {
      ...this.option,
      retailerIds: this.selectedRetailerIds,
    });
  }
}
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
