<template>
  <div class="input-group" v-click-outside="clickOutSide">
    <input
      v-model="search"
      @input="onChange"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
      type="text"
      class="form-control"
      placeholder="Tìm kiếm ..."
      aria-label="Search for..."
    />
    <ul class="autocomplete-results" :class="{ show: isOpen }">
      <li
        v-for="(result, idx) in results"
        :key="idx"
        class="autocomplete-result"
        @click="setResult(result)"
        :class="{ 'is-active': idx === arrowCounter }"
      >
        {{ result }}
      </li>
    </ul>
    <span class="input-group-btn">
      <button class="btn" type="button">
        <i class="fa fa-search" aria-hidden="true"></i>
      </button>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  search = "";
  results: Array<string> = [];
  isOpen = false;
  arrowCounter = -1;

  @Prop({ type: Array, required: true })
  items!: Array<string>;

  onChange(): void {
    this.results = this.items.filter(
      (item) => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1
    );
    if (this.results.length !== 0 && this.search !== "") {
      this.isOpen = true;
    } else {
      this.isOpen = false;
    }
  }

  setResult(result: string): void {
    this.search = result;
    this.isOpen = false;
  }

  onArrowDown(): void {
    if (this.arrowCounter < this.results.length) {
      this.arrowCounter = this.arrowCounter + 1;
    }
  }

  onArrowUp(): void {
    if (this.arrowCounter > 0) {
      this.arrowCounter = this.arrowCounter - 1;
    }
  }

  onEnter(): void {
    this.search = this.results[this.arrowCounter];
    this.arrowCounter = -1;
    this.isOpen = false;
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
    padding: 4px 2px;
    cursor: pointer;
  }

  .autocomplete-result.is-active,
  .autocomplete-result:hover {
    background-color: #4aae9b;
    color: white;
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