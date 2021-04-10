<template>
  <li :class="{ open: isOpen }">
    <div @click="toggle" class="link">
      {{ title }}<i class="fa fa-chevron-down"></i>
    </div>
    <ul class="submenu font-sky">
      <slot name="submenu-item"></slot>
    </ul>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ type: String, required: true })
  title!: string;

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
li {
  .link {
    cursor: pointer;
    display: block;
    padding: 15px 15px 15px 42px;
    color: #4d4d4d;
    font-size: 15px;
    border-bottom: 1px solid #ccc;
    position: relative;
    -webkit-transition: all 0.4s ease;
    -o-transition: all 0.4s ease;
    transition: all 0.4s ease;
    font-family: "Museo-500";
    font-family: "Roboto";
    text-transform: uppercase;

    a:hover {
      color: #0f0606;
    }
  }

  i {
    position: absolute;
    top: 16px;
    left: 12px;
    font-size: 18px;
    color: #595959;
    -webkit-transition: all 0.4s ease;
    -o-transition: all 0.4s ease;
    transition: all 0.4s ease;
  }

  i.fa-chevron-down {
    right: 12px;
    left: auto;
    font-size: 16px;
  }

  .submenu {
    display: none;
    background: #fff;
    font-size: 14px;
    text-align: left;
    li {
      border-bottom: 1px solid #e0e1e0;
      h4 {
        color: #ffa725;
        margin-left: 40px;
        padding: 8px 0px;
        font-size: 17px;
        font-family: "Museo-500";
      }
    }

    a {
      display: block;
      text-decoration: none;
      color: #483f3f !important;
      padding: 12px;
      padding-left: 42px;
      -webkit-transition: all 0.25s ease;
      -o-transition: all 0.25s ease;
      transition: all 0.25s ease;
      color: #ddd;
      font-size: 13px !important;
    }

    a:hover {
      background: transparent;
    }
  }
}

li.open {
  .submenu {
    display: block !important;
  }
  .link {
    color: #b63b4d;
  }

  i.fa-chevron-down {
    -webkit-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
  }
}

li:last-child {
  .link {
    border-bottom: 0;
  }
}
</style>