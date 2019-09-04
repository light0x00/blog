<template>
  <div class="guest-info">
    <el-form ref="guest-form" :model="guestInfo" :rules="rormRules">
      <el-form-item prop="nickname">
        <el-input
          type="text"
          prefix-icon="el-icon-user"
          placeholder="起个名字~"
          v-model="guestInfo.nickname"
          maxlength="20"
          show-word-limit
        />
        <template v-slot:error="scope">
          <el-alert type="error">{{scope.error}}</el-alert>
        </template>
      </el-form-item>
      <el-form-item prop="email">
        <el-input
          type="text"
          prefix-icon="el-icon-message"
          placeholder="留下邮箱(不会公开)"
          v-model="guestInfo.email"
          maxlength="50"
          show-word-limit
        />
        <template v-slot:error="scope">
          <el-alert type="error">{{scope.error}}</el-alert>
        </template>
      </el-form-item>
      <el-form-item prop="website">
        <el-input
          prefix-icon="el-icon-position"
          placeholder="你的个人网站(可选)"
          v-model="guestInfo.website"
          maxlength="100"
          show-word-limit
        ></el-input>
        <template v-slot:error="scope">
          <el-alert type="error">{{scope.error}}</el-alert>
        </template>
      </el-form-item>
    </el-form>
    <div style="display:flex;justify-content:center;">
      <el-button type="primary" @click="commit" style="width:100px">确认</el-button>
    </div>
  </div>
</template>

<script>
import rules from "@/common/rules";
//
import { mapState } from "vuex";

export default {
  name: "GuestInfo",
  data() {
    return {
      editingGuestInfo: this.guestInfo,
      rormRules: {
        nickname: { required: true,trigger: "change", message: "起个名字,让别人记住你" },
        email: [
          { required: true, message: "留下邮箱,在被回复时将发送邮件提醒", trigger: "change" },
          {
            validator: rules.forEmail({ errorMsg: "邮箱格式不正确" }),
            trigger: "change"
          }
        ],
        website: [
          { required: false},
          {
            validator: rules.forURL({
              errorMsg: "网址格式不正确",
              allowEmpty: true
            }),
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapState("guest", {
      guestInfo: "info"
    })
  },
  created() {},
  methods: {
    async commit() {
      try {
        await this.$refs["guest-form"].validate();
      } catch (e) {
        return;
      }
      await this.$store.commit("guest/setInfo", this.guestInfo);
      this.$notify({ type: "success", message: "设置成功!" });
      this.$emit("commit");
    }
  }
};
</script>

<style>
.guest-info .el-form-item {
  margin-bottom: 15px;
}
.guest-info .el-alert {
  margin: 2px 0 5px 0;
}
.guest-info .el-alert,
.el-alert__content,
.el-alert__description {
  height: 35px;
  line-height: 35px;
}
.guest-info .el-alert__description {
  margin: 0px !important;
}
</style>