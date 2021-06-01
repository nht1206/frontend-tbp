import { RouteConfig } from "vue-router";
import Dashboard from "@/views/Admin/Dashboard.vue";
import ListCategory from "@/components/Admin/Category/ListCategory.vue";
import ListBanner from "@/components/Admin/Banner/ListBanner.vue";
import CreateBanner from "@/components/Admin/Banner/CreateBanner.vue";
import UpdateBanner from "@/components/Admin/Banner/UpdateBanner.vue";
import ListGuestAccount from "@/components/Admin/Account/ListGuestAccount.vue";
import CreateGuestAccount from "@/components/Admin/Account/CreateAccount.vue";
import EditAccount from "@/components/Admin/Account/EditAccount.vue";
import ListRetailerAccount from "@/components/Admin/Account/ListRetailerAccount.vue";
import ListApprovedRetailer from "@/components/Admin/Retailer/ListApprovedRetailer.vue";
import ListPendingRetailer from "@/components/Admin/Retailer/ListPendingRetailer.vue";
import CreateRetailer from "@/components/Admin/Retailer/CreateRetailer.vue";
import UpdateRetailer from "@/components/Admin/Retailer/UpdateRetailer.vue";
import ListApprovedProduct from "@/components/Admin/Product/ListApprovedProduct.vue";
import ListPendingProduct from "@/components/Admin/Product/ListPendingProduct.vue";
import CreateProduct from "@/components/Admin/Product/CreateProduct.vue";
import UpdateProduct from "@/components/Admin/Product/UpdateProduct.vue";
import ListPrice from "@/components/Admin/Product/ListPrice.vue";
import ListPendingPrice from "@/components/Admin/Product/ListPendingPrice.vue";
import CreatePrice from "@/components/Admin/Product/CreatePrice.vue";
import ListKeyword from "@/components/Admin/Statistics/KeywordStatistics.vue";
import ProductStatistics from "@/components/Admin/Statistics/ProductStatistics.vue";
import TrafficStatistics from "@/components/Admin/Statistics/TrafficStatistics.vue";

export default [
  {
    path: "/",
    component: Dashboard,
  },
  {
    path: "/danh-muc",
    component: ListCategory,
    meta: {
      title: "Quản lý danh mục",
    },
  },
  {
    path: "/banner",
    component: ListBanner,
    meta: {
      title: "Quản lý banner",
    },
  },
  {
    path: "/them-banner",
    component: CreateBanner,
    meta: {
      title: "Thêm mới banner",
    },
  },
  {
    path: "/chinh-sua-banner/:id",
    component: UpdateBanner,
    meta: {
      title: "Thêm mới banner",
    },
  },
  {
    path: "/tai-khoan-nguoi-dung",
    component: ListGuestAccount,
    meta: {
      title: "Danh sách tài khoản người dùng",
    },
  },
  {
    path: "/tai-khoan-chu-cua-hang",
    component: ListRetailerAccount,
    meta: {
      title: "Danh sách tài khoản chủ cửa hàng",
    },
  },
  {
    path: "/tao-tai-khoan",
    component: CreateGuestAccount,
    meta: {
      title: "Tạo tài khoản",
    },
  },
  {
    path: "/chinh-sua-tai-khoan/:id",
    component: EditAccount,
    meta: {
      title: "Chỉnh sửa tài khoản",
    },
  },
  {
    path: "/nha-ban-le-da-duyet",
    component: ListApprovedRetailer,
    meta: {
      title: "Nhà bán lẻ đã duyệt",
    },
  },
  {
    path: "/nha-ban-le-chua-duyet",
    component: ListPendingRetailer,
    meta: {
      title: "Nhà bán lẻ chưa duyệt",
    },
  },
  {
    path: "/them-nha-ban-le",
    component: CreateRetailer,
    meta: {
      title: "Thêm nhà bán lẻ",
    },
  },
  {
    path: "/chinh-sua-nha-ban-le/:id",
    component: UpdateRetailer,
    meta: {
      title: "Chỉnh sửa nhà bán lẻ",
    },
  },
  {
    path: "/san-pham-chua-duyet",
    component: ListPendingProduct,
    meta: {
      title: "Sản phẩm chưa duyệt",
    },
  },
  {
    path: "/san-pham-da-duyet",
    component: ListApprovedProduct,
    meta: {
      title: "Sản phẩm đả duyệt",
    },
  },
  {
    path: "/them-san-pham",
    component: CreateProduct,
    meta: {
      title: "Thêm mới sản phẩm",
    },
  },
  {
    path: "/chinh-sua-san-pham/:id",
    component: UpdateProduct,
    meta: {
      title: "Chỉnh sửa sản phẩm",
    },
  },
  {
    path: "/them-gia-moi/:id",
    component: CreatePrice,
    meta: {
      title: "Thêm giá mới",
    },
  },
  {
    path: "/cap-nhat-gia/:id",
    component: ListPrice,
    meta: {
      title: "Chỉnh sửa giá",
    },
  },
  {
    path: "/gia-chua-duyet",
    component: ListPendingPrice,
    meta: {
      title: "Danh sách giá chưa duyệt",
    },
  },
  {
    path: "/thong-ke-tu-khoa",
    component: ListKeyword,
    meta: {
      title: "Thống kê từ khóa",
    },
  },
  {
    path: "/thong-ke-san-pham",
    component: ProductStatistics,
    meta: {
      title: "Thống kê sản phẩm",
    },
  },
  {
    path: "/thong-ke-luot-truy-cap",
    component: TrafficStatistics,
    meta: {
      title: "Thống kê lượt truy cập",
    },
  },
] as Array<RouteConfig>;
