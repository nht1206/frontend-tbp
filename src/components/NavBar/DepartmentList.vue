<template>
  <div class="col-xl-3 d-none d-xl-block">
    <div class="department" @click="toggle" v-click-outside="close">
      <img src="@/assets/img/menu-bar.png" alt="menu-bar" />
      Danh mục sản phẩm
      <div
        id="department-list"
        class="department-list"
        :class="{ active: isShow }"
      >
        <ul class="list-group">
          <list-group-item
            v-for="category in categories"
            :key="category.id"
            :category="category"
          ></list-group-item>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import ListGroupItem from "./ListGroupItem.vue";

@Component({
  components: { ListGroupItem },
  computed: {
    ...mapGetters({
      categories: "category/categories",
    }),
  },
})
export default class extends Vue {
  isShow = false;

  toggle(): void {
    this.isShow = !this.isShow;
  }

  close(): void {
    this.isShow = false;
  }

  created(): void {
    this.$store.dispatch("category/loadCategories");
  }
}
</script>

<style lang="scss">
.department {
  background: #232f3e;
  color: #fff;
  padding: 14px 20px;
  border-radius: 4px;
  position: relative;
  width: 249px;
  text-align: left;
  cursor: pointer;

  .department-list {
    position: absolute;
    display: none;
    top: 100%;
    left: 0;
    width: 100%;
    z-index: 10;
    transform: translateY(2px);

    li {
      border: 0;

      .department-list-logo {
        width: 40px;
        display: inline-block;
      }

      a {
        color: #666666;
        font-size: 16px;
        transition: 0.5s;
      }

      i {
        font-size: 20px;
        transition: 0.5s;
        transform: translate(5px, 3px);
      }
    }

    .list-group {
      box-shadow: 0px 0px 33px 0px rgba(0, 0, 0, 0.22);
      .list-group-item {
        &:first-child {
          border-radius: 0;
        }
        &:last-child {
          border-radius: 0;
        }
        .wd-sub-list {
          width: 250px;
          height: auto;
          background: #fff;
          position: absolute;
          left: 100%;
          top: 0;
          padding: 20px 6px;
          transition: 0.5s;
          display: none;
          .wd-sub-list-title {
            font-size: 14px;
            font-weight: 500;
            padding-bottom: 10px;
            border-bottom: 1px solid #ebebeb;
            margin-bottom: 10px;
          }
          .wd-sub-menu {
            margin-bottom: 30px;
            li {
              margin-bottom: 5px;
              transition: 0.5s;
            }
            a {
              color: #666666;
              font-size: 13px;
              transition: 0.5s;
              &:hover {
                color: #ff9800;
              }
            }
          }
        }
        .wd-sub-list.big {
          width: 556px;
        }
      }
      .list-group-item.active {
        background-color: #ebebeb;
        .wd-sub-list {
          display: block;
        }

        &:hover {
          .sub-list-main-menu {
            color: #ff9800;
            transition: 0.5s;
          }
          i {
            opacity: 1;
            color: #ff9800;
            transform: translate(5px, 3px);
          }
        }
      }
    }
  }
  .department-list.active {
    display: block;
  }
}
@media (max-width: 1200px) {
  .department {
    display: none;
  }
}

@media (min-width: 1280px) and (max-width: 1400px) {
  .list-group-item {
    padding: 4px 15px;
  }
}

@media (min-width: 1025px) and (max-width: 1680px) {
  .list-group-item {
    padding: 10px;
  }
}

@media (min-width: 1200px) and (max-width: 1700px) {
  .department-sub-list-img {
    width: 100% !important;
  }
}
</style>