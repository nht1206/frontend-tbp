<template>
  <div class="email-confirm">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <!-- LOGO -->
      <tr>
        <td bgcolor="#FFA73B" align="center">
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            <tr>
              <td
                align="center"
                valign="top"
                style="padding: 40px 10px 40px 10px"
              ></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td bgcolor="#FFA73B" align="center" style="padding: 0px 10px 0px 10px">
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            <tr>
              <td
                bgcolor="#ffffff"
                align="center"
                valign="top"
                class="table-content-header"
              >
                <h1 style="font-size: 48px; font-weight: 400; margin: 2">
                  Chào mừng!
                </h1>
                <img
                  src=" https://img.icons8.com/clouds/100/000000/handshake.png"
                  width="125"
                  height="120"
                  style="display: block; border: 0px"
                />
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px">
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            <tr>
              <td bgcolor="#ffffff" align="left" class="table-content">
                <p style="margin: 0">
                  Chào mừng bạn đến với hệ thống so sánh giá The best price.
                  Nhấn nút bên dưới để xác nhận tài khoản.
                </p>
              </td>
            </tr>
            <tr v-if="!!error">
              <td bgcolor="#ffffff" align="left" class="table-content">
                <div class="alert alert-danger">{{ error }}</div>
              </td>
            </tr>
            <tr v-if="!!success">
              <td bgcolor="#ffffff" align="left" class="table-content">
                <div class="alert alert-success">{{ success }}</div>
              </td>
            </tr>
            <tr>
              <td bgcolor="#ffffff" align="left">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td
                      bgcolor="#ffffff"
                      align="center"
                      style="padding: 20px 30px 60px 30px"
                    >
                      <table border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td
                            align="center"
                            style="border-radius: 3px"
                            bgcolor="#FFA73B"
                          >
                            <a
                              @click="confirm"
                              class="btn-confirm"
                              :class="{ disabled: disableButton }"
                            >
                              Xác nhận tài khoản
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import accountService from "@/service/account-service";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  token!: string | (string | null)[];

  isLoading = false;

  get disableButton(): boolean {
    return this.isLoading || !!this.success;
  }

  success = "";

  error = "";

  confirm(): void {
    this.isLoading = true;
    accountService
      .confirmEmail(this.token.toString())
      .then((res) => {
        this.success = res.data.message;
        setTimeout(() => {
          this.$router.push("/");
        }, 5000);
        this.isLoading = false;
      })
      .catch((err) => {
        this.error = err.response.data.message;
        this.isLoading = false;
      });
  }

  created(): void {
    this.token = this.$route.query["token"];
    if (!this.token) {
      this.$router.push("/");
    }
  }
}
</script>

<style lang="scss" scoped>
a.disabled {
  pointer-events: none;
  cursor: default;
}
.email-confirm {
  background-color: #f4f4f4;
  margin: 0 !important;
  padding: 0 !important;

  .table-content-header {
    padding: 40px 20px 20px 20px;
    border-radius: 4px 4px 0px 0px;
    color: #111111;
    font-family: "Lato", Helvetica, Arial, sans-serif;
    font-size: 48px;
    font-weight: 400;
    letter-spacing: 4px;
    line-height: 48px;
  }

  .table-content {
    padding: 20px 30px 40px 30px;
    color: #666666;
    font-family: "Lato", Helvetica, Arial, sans-serif;
    font-size: 18px;
    font-weight: 400;
    line-height: 25px;
  }
  .btn-confirm {
    font-size: 20px;
    font-family: Helvetica, Arial, sans-serif;
    color: #ffffff;
    text-decoration: none;
    color: #ffffff;
    text-decoration: none;
    padding: 15px 25px;
    border-radius: 2px;
    border: 1px solid #ffa73b;
    display: inline-block;
    cursor: pointer;
  }
}
</style>