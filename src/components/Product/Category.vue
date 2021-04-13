<template>
  <div class="side-bar category category-md">
    <h5 class="title">Category</h5>
    <ul class="dropdown-list-menu">
      <li>
        <a href="#"
          ><i class="fa fa-angle-double-right" aria-hidden="true"></i> Mobile</a
        >
      </li>
      <li>
        <a href="#"
          ><i class="fa fa-angle-double-right" aria-hidden="true"></i> Tablet</a
        >
      </li>
      <li>
        <a href="#"
          ><i class="fa fa-angle-double-right" aria-hidden="true"></i>
          Accessories</a
        >
      </li>
      <li>
        <a href="#"
          ><i class="fa fa-angle-double-right" aria-hidden="true"></i> Visual</a
        >
      </li>
      <li class="sidebar-dropdown">
        <p>
          <i class="fa fa-angle-double-right" aria-hidden="true"></i> Handset
        </p>
        <ul class="dropdown-sub-menu">
          <li>
            <a href="#"
              ><i class="fa fa-angle-right" aria-hidden="true"></i> Touch</a
            >
          </li>
          <li>
            <a href="#"
              ><i class="fa fa-angle-right" aria-hidden="true"></i> Button</a
            >
          </li>
          <li>
            <a href="#"
              ><i class="fa fa-angle-right" aria-hidden="true"></i> Speaker</a
            >
          </li>
          <li>
            <a href="#"
              ><i class="fa fa-angle-right" aria-hidden="true"></i> Protector</a
            >
          </li>
        </ul>
      </li>
      <li>
        <a href="#"
          ><i class="fa fa-angle-double-right" aria-hidden="true"></i>
          Mini-pad</a
        >
      </li>
      <li>
        <a href="#"
          ><i class="fa fa-angle-double-right" aria-hidden="true"></i>
          Headphones</a
        >
      </li>
      <li>
        <a href="#"
          ><i class="fa fa-angle-double-right" aria-hidden="true"></i> Camera</a
        >
      </li>
      <li>
        <a href="#"
          ><i class="fa fa-angle-double-right" aria-hidden="true"></i> Lens</a
        >
      </li>
      <li>
        <a href="#"
          ><i class="fa fa-angle-double-right" aria-hidden="true"></i> Laptop</a
        >
      </li>
      <li>
        <a href="#"
          ><i class="fa fa-angle-double-right" aria-hidden="true"></i>
          Desktop</a
        >
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
.category {
  a {
    &:hover {
      i {
        margin-right: 10px;
      }
    }
  }
  li {
    margin-bottom: 12px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  i {
    margin-right: 4px;
    transition: 0.5s;
  }
  .dropdown-sub-menu {
    padding: 8px 0 0 17px;
    cursor: pointer;
  }
  .sidebar-dropdown {
    p {
      cursor: pointer;
      transition: 0.5s;
    }
    &:hover {
      p {
        color: #ff9800;
      }
    }
  }
}
@media (min-width: 768px) {
  .category-md {
    display: block;
  }
}
</style>