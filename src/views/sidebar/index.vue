<template>
  <el-drawer style="position:fixed;max-width:700px" size="70%" :visible="visible" @update:visible="syncVisible" :show-close="false" direction="ltr">
      <!-- 标题!! -->
    <div slot="title" style="display:flex; align-items: center;justify-content: center;">
      <el-avatar size="medium" src="https://avatars1.githubusercontent.com/u/29830476?s=460&amp;v=4"></el-avatar>
    </div>
    <PostMenu :visible="visible" @update:visible="syncVisible"></PostMenu>
  </el-drawer>

</template>

<script>

import PostMenu from '@/views/menu/index'

export default {
  components:{PostMenu},
  props: {
    visible: Boolean
  },
  data: function() {
    return {
    };
  },
  methods: {
    syncVisible(e) {
      this.$emit("update:visible",e)
    }
  }
};
</script>

<style >
.el-dialog__wrapper {
  background-color: rgba(0, 0, 0, 0.009);
   color: #fff;
}

.el-drawer.ltr {
  background-color: #24292e;
}
</style>
