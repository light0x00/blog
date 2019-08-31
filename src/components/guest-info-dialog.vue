<template>
  <el-dialog :close-on-click-modal="false" :visible.sync="guestInfoDialogVisible" title="游客信息设置">
    <guest-info @commit="guestInfoDialogVisible=false"></guest-info>
  </el-dialog>
</template>

<script>
export default {
  name: "GuestInfoDialog",
  data() {
    return { guestInfoDialogVisible: false };
  },
  computed: {
    isNilGuestInfo() {
      return this.$store.getters["guest/isNilInfo"];
    }
  },
  methods: {
    validate() {
      if (this.isNilGuestInfo) {
          this.show()
          return false;
      }
      return true;
    },
    show() {
      this.guestInfoDialogVisible = true;
    },
    hide() {
      this.guestInfoDialogVisible = false;
    }
  }
};
</script>

<style>
</style>