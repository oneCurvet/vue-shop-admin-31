<template>
  <div>
    <el-row type="flex" justify="space-between">
      <div>
        <i @click="handleClickArrow" class="el-icon-back cursorPointer"></i>
      </div>
      <div>
        {{uname}} {{realname}}
        <el-button @click="handleLoginOut" type="text">退出</el-button>
      </div>
    </el-row>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  data() {
    return {
      uname: "",
      realname: ""
    };
  },
  methods: {
    handleClickArrow() {
      this.$emit("clickArrow");
    },
    handleLoginOut() {
      this.$axios({
        method: "GET",
        url: "http://localhost:8899/admin/account/logout",
        withCredentials: true
      }).then(res => {
        console.log(res);
        if (res.data.status == 0) {
          this.$message({
            message: res.data.message,
            type: "success"
          });
          setTimeout(() => {
            this.$router.push("/login");
          }, 3000);
        }
      });
    }
  },
  mounted() {
    this.uname = localStorage.getItem("uname");
    this.realname = localStorage.getItem("realname");
  }
};
</script>

<style scoped lang="less">
i {
  font-size: 20px;
}
.cursorPointer {
  cursor: pointer;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
