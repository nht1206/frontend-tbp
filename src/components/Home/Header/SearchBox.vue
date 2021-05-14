<template>
  <div class="input-group">
    <input
      v-model="search"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
      v-click-outside="clickOutSide"
      v-debounce:1500ms="getSuggestion"
      @change="openSuggestion"
      type="text"
      class="form-control"
      placeholder="Tìm kiếm ..."
      aria-label="Search for..."
    />
    <ul class="autocomplete-results" :class="{ show: isOpen }">
      <li
        v-for="(s, idx) in suggestions"
        :key="idx"
        class="autocomplete-result"
        @click="setResult(s)"
        :class="{ 'is-active': idx === arrowCounter }"
      >
        <div class="row">
          <div class="col-7">
            {{ s.title }}
          </div>
          <div class="col-5 price">
            giá: <span>{{ formatPrice(s.price) }}</span> VNĐ ({{ s.totalStore }}
            nơi bán)
          </div>
        </div>
      </li>
    </ul>
    <span class="input-group-btn">
      <button @click="onSearch" class="btn" type="button">
        <i class="fa fa-search" aria-hidden="true"></i>
      </button>
    </span>
  </div>
</template>

<script lang="ts">
import Suggestion from "@/models/Suggestion";
import productService from "@/service/product-service";
import { Component, Prop, Vue } from "vue-property-decorator";
import trackingService from "@/service/tracking-service";

@Component
export default class extends Vue {
  search = "";
  isOpen = false;
  arrowCounter = -1;
  suggestions: Suggestion[] = [];

  @Prop({ type: Array, required: true })
  items!: Array<string>;

  onSearch(): void {
    if (this.$route.path !== "/danh-sach-san-pham") {
      this.$router.push("/danh-sach-san-pham");
    }
    this.$store.dispatch("product/searchProducts", {
      keyword: this.search,
    });

    trackingService.trackingKeyword({
      keyword: this.search,
    });
  }

  openSuggestion(): void {
    this.isOpen = true;
  }

  getSuggestion(): void {
    if (this.search) {
      productService.getSuggestion(this.search).then((res) => {
        this.suggestions = res.data;
        if (!(this.suggestions.length !== 0 && this.search !== "")) {
          this.isOpen = false;
        }
      });
    }
  }

  setResult(result: Suggestion): void {
    if (result.id) {
      this.$router.push("/chi-tiet-san-pham/" + result.id);
    }
    this.isOpen = false;
  }

  onArrowDown(): void {
    if (this.arrowCounter === this.suggestions.length - 1) {
      this.arrowCounter = 0;
      return;
    }
    if (this.arrowCounter < this.suggestions.length) {
      this.arrowCounter = this.arrowCounter + 1;
      return;
    }
  }

  onArrowUp(): void {
    if (this.arrowCounter > 0) {
      this.arrowCounter = this.arrowCounter - 1;
      return;
    }
    if (this.arrowCounter === -1 || this.arrowCounter === 0) {
      this.arrowCounter = this.suggestions.length - 1;
      return;
    }
    if (this.arrowCounter === this.suggestions.length - 1) {
      this.arrowCounter = 0;
      return;
    }
  }

  onEnter(): void {
    if (this.arrowCounter !== -1) {
      const suggestion = this.suggestions[this.arrowCounter];
      if (!suggestion.id) {
        this.search = suggestion.title;
        this.arrowCounter = -1;
        this.onSearch();
      } else {
        this.$router.push("product-detail/" + suggestion.id);
        this.arrowCounter = -1;
      }
    }
    this.isOpen = false;
  }

  formatPrice(price: number): string {
    return Intl.NumberFormat().format(price);
  }

  clickOutSide(): void {
    this.arrowCounter = -1;
    this.isOpen = false;
  }
}
</script>

<style lang="scss" scoped>
.input-group {
  margin-left: 10px;
  input {
    background: whitesmoke;
    color: #a5a5a5;
    font-size: 14px;
    padding: 14px;
    margin-bottom: 0;
    height: auto;
    display: block;
  }

  .autocomplete-results {
    position: absolute;
    display: none;
    width: 100%;
    background: #f0f0f0;
    padding: 0;
    margin: 0;
    border: 1px solid #eeeeee;
    height: auto;
    overflow: auto;
    z-index: 1025;
    top: 100%;
  }

  .autocomplete-results.show {
    display: block;
  }

  .autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 10px;
    cursor: pointer;
    font-size: 13px;
    .price {
      span {
        color: red;
      }
    }
  }

  .autocomplete-result.is-active,
  .autocomplete-result:hover {
    color: #ff9800;
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
