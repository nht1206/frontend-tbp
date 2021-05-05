<template>
  <li @mouseenter="open" @mouseleave="close">
    <a class="main-menu-list"
      ><slot name="icon"></slot> {{ title }}
      <i class="fa fa-angle-down angle-down" aria-hidden="true"></i
    ></a>
    <ul class="single-dropdown normal-sub" :class="[{ 'show-menu': isShow }]">
      <slot name="submenu-item"></slot>
    </ul>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  isShow = false;

  @Prop({ type: String, default: "", required: true })
  title!: string;

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
  ul {
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
    li {
      width: 100%;
      border-bottom: 1px solid #f7f7f7;
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
  }
  ul.normal-sub {
    width: 300px;
    left: auto;
    padding: 10px 20px;
  }
  ul.normal-sub > li {
    width: 100%;
    text-align: -webkit-match-parent;
  }
  ul.normal-sub > li a {
    border: 0;
    padding: 1em 0;
  }
}
li:hover {
  background: #f0f0f0;
}
@media only screen and (max-width: 959px) {
  .menu-container {
    width: 100%;
  }
  .menu-mobile {
    display: block;
  }
  .menu-dropdown-icon {
    &:before {
      display: block;
    }
  }
  .menu {
    > li {
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
      > ul.normal-sub {
        width: 100%;
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
