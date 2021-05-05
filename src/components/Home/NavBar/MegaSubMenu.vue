<template>
  <li @mouseenter="open" @mouseleave="close" class="pos-inherit">
    <a class="main-menu-list"
      >{{ title }} <i class="fa fa-angle-down angle-down" aria-hidden="true"></i
    ></a>
    <ul class="single-dropdown main" :class="[{ 'show-menu': isShow }]">
      <slot name="submenu-1"></slot>
      <slot name="submenu-2"></slot>
      <slot name="submenu-3"></slot>
    </ul>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ type: String, default: "", required: true })
  title!: string;

  isShow = false;

  open(): void {
    this.isShow = true;
  }
  close(): void {
    this.isShow = false;
  }
}
</script>

<style lang="scss" scoped>
.show-menu {
  display: block !important;
}
.main-menu-list {
  font-size: 15px;
  padding: 15px 21px;
  text-transform: uppercase;
  font-weight: 400;
  color: #333;
  i {
    margin-right: 5px;
  }
}
.main-menu-list:hover {
  color: #ff9800;
}

.single-dropdown.megamenu > li {
  border-bottom: 0px solid #000;
}

li {
  background: transparent;
  transition: 0.5s;
  float: left;
  padding: 0;
  margin: 0;
  a {
    text-decoration: none;
    display: block;
    color: #777;
  }
  ul.main {
    display: none;
    width: 100%;
    background: #f0f0f0;
    padding: 15px 6px;
    position: absolute;
    z-index: 1024;
    left: 0;
    margin: 0;
    list-style: none;
    box-sizing: border-box;
  }
  .single-dropdown {
    .menu-subtitle {
      font-size: 14px;
      color: #333333;
    }
    li {
      width: 25%;
      a {
        transform: translateX(0);
      }
      a:hover {
        color: #ff9800;
        transform: translateX(10px);
      }
    }
    li:last-child {
      border-bottom: 0;
    }
    .sub-menu-list {
      display: block;
      line-height: 1.5rem;
      background: #f0f0f0;
      padding: 20px;
      left: 0;
      margin: 0;
      li {
        transition: 0.5s;
        border: none !important;
        padding: 2px 0;
        width: 100%;
      }
      a {
        margin-top: 0;
        font-size: 13px;
        transition: 0.5s;
        color: #777;
      }
    }
  }
}
li:hover {
  background: #f0f0f0;
}
@media only screen and (max-width: 959px) {
  li {
    width: 100%;
    float: none;
    display: block;
    a {
      padding: 1.5em;
      width: 100%;
      display: block;
    }
    > ul {
      position: relative;
      > li {
        float: none;
        width: 100%;
        margin-top: 20px;
        &:first-child {
          margin: 0;
        }
        > ul {
          position: relative;
          > li {
            float: none;
          }
        }
      }
    }
  }
}
@media (max-width: 767px) {
  > li {
    background: #f7f7f7;
    width: 315px;
  }
}
@media (min-width: 992px) {
  .main-menu-list {
    padding: 15px 5px;
    font-size: 12px;
  }
}
@media (min-width: 1024px) {
  .main-menu-list {
    font-size: 15px;
    padding: 15px;
  }
}
</style>
