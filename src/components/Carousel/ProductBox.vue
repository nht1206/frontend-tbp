<template>
  <div class="col-md-12">
    <figure class="figure product-box wow fadeIn animated" data-wow-delay="0ms">
      <div class="product-box-img">
        <a href="product-details.html">
          <img
            :src="product.img"
            class="figure-img img-fluid"
            alt="Product Img"
          />
        </a>
      </div>
      <div class="quick-view-btn">
        <div class="compare-btn">
          <button
            type="button"
            class="btn btn-primary btn-sm"
            @click="openQuickView"
          >
            <i class="fa fa-eye" aria-hidden="true"></i> Xem nhanh
          </button>
        </div>
      </div>
      <figcaption class="figure-caption text-center">
        <span
          v-if="product.isNew"
          class="badge badge-secondary wd-badge text-uppercase"
          >Mới</span
        >
        <div class="wishlist">
          <i
            class="fa fa-heart"
            :class="{ 'active-wishlist': true }"
            aria-hidden="true"
          ></i>
        </div>
        <div class="price-start">
          <p>
            Giá từ
            <strong class="active-color"
              ><u>{{ product.lowestPrice }}</u> -
              <u>{{ product.highestPrice }}</u></strong
            >
          </p>
        </div>
        <div class="content-excerpt">
          <p>
            <a href=""> {{ product.shortDescription }}</a>
          </p>
        </div>
        <div class="rating">
          <a class="active-color" href="#"
            ><i class="fa fa-star" aria-hidden="true"></i
          ></a>
          <a class="active-color" href="#"
            ><i class="fa fa-star" aria-hidden="true"></i
          ></a>
          <a class="active-color" href="#"
            ><i class="fa fa-star" aria-hidden="true"></i
          ></a>
          <a href="#"><i class="fa fa-star-o" aria-hidden="true"></i></a>
          <a href="#"><i class="fa fa-star-o" aria-hidden="true"></i></a>
        </div>
        <div class="compare-btn">
          <a class="btn btn-primary btn-sm" href="#"
            ><i class="fa fa-exchange" aria-hidden="true"></i> Thêm để so
            sánh</a
          >
        </div>
      </figcaption>
    </figure>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ type: Object, required: true })
  product!: any;

  openQuickView(): void {
    this.$bvModal.show("product-quick-view");
  }
}
</script>

<style lang="scss" scoped>
.compare-btn {
  margin-top: 10px;
  a {
    background: #ff9800;
    border-color: transparent;
    font-size: 12px;
    padding: 6px 10px;
    border-radius: 20px;
    &:hover {
      background: white;
      color: #ff9800;
      border-color: #ff9800;
    }
  }
}

.quick-view-btn {
  position: absolute;
  left: 50%;
  top: 50%;
  transition: 0.5s;
  opacity: 0;
  transform: translate(-50%, -50%);
  .compare-btn {
    button {
      background: #fff;
      color: #ff9800;
      border-radius: 20px;
      border-color: transparent;
      cursor: pointer;
    }
  }
  &:hover {
    .compare-btn {
      button {
        background: #ff9800;
        color: #fff;
      }
    }
  }
  .figure {
    margin: 0;
  }
  .figure-caption {
    padding: 18px 10px;
    border: 1px solid #e5e5e5;
    border-top: 0;
    background: white;
    transition: 0.5s;
  }
}
.product-box {
  transition: 0.5s;
  transform: translateY(0);
  width: 100%;
  .product-box-img {
    overflow: hidden;
  }
  img {
    transition: 0.5s;
  }
  .wd-badge {
    padding: 7px 12px;
    font-size: 12px;
    font-weight: 400;
    position: absolute;
    top: 20px;
    left: 20px;
    background: #ff4a4a;
  }
  .wishlist {
    font-size: 30px;
    color: white;
    position: absolute;
    top: 14px;
    right: 20px;
    cursor: pointer;
    i {
      transition: 0.5s;
    }
    &:hover {
      i {
        color: #ff4a4a;
      }
    }
  }
  .price-start {
    p {
      font-size: 14px;
      color: #666666;
    }
  }
  .content-excerpt {
    color: #333333;
    margin-bottom: 10px;
    margin-top: 5px;
    a {
      color: #333;
      font-size: 14px;
    }
  }

  .rating {
    i {
      color: #cecece;
    }
  }

  &:hover {
    box-shadow: 0px 8px 16px 0px rgba(130, 156, 199, 0.2);
    transform: translateY(5%);
    .figure-caption {
      background: #f5f2ed;
      color: white;
    }
    .active-color {
      color: #ff9800 !important;
    }
    .product-title {
      font-weight: 500;
    }
    .compare-btn {
      a {
        border-color: #ff9800;
        background: #fff;
        color: #ff9800;
      }
    }
    .quick-view-btn {
      top: 50%;
      opacity: 1;
    }
    img {
      transform: scale(1.1);
    }
  }
}
.product-box-img {
  overflow: hidden;
}
</style>