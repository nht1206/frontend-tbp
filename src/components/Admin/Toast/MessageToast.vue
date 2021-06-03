<template>
  <b-toast
    v-if="!!toastInfo"
    id="messageToast"
    :title="toastInfo.title"
    :variant="toastInfo.variant"
  >
    {{ toastInfo.message }}
  </b-toast>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  computed: {
    ...mapGetters({
      toastInfo: "toast/toastInfo",
    }),
  },
})
export default class extends Vue {}
</script>
