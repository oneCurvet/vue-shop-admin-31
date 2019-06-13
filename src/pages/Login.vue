<template>
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="50px"
    class="demo-ruleForm login"
  >
    <el-form-item label="账号" prop="username">
      <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item class="el-form-item-btn">
      <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        username: "",
        pass: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: validateUsername, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      const data = {
        uname: this.ruleForm.username,
        upwd: this.ruleForm.pass
      };
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios({
            method: "POST",
            url: "http://localhost:8899/admin/account/login",
            data,
            withCredentials: true
          }).then(res => {
            console.log(res);
            const { status, message } = res.data;
            if (status == 0) {
              this.$router.push(`/`);
              
              this.$store.commit("setUser",message);

              localStorage.setItem("user",JSON.stringify(message))
              
            } else {
              this.$message.error(message);
            }
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  width: 400px;
  height: 300px;
  //   border: 1px solid #000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.el-form-item-btn {
  margin-left: 100px;
}
</style>
