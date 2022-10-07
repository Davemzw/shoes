<template>
  <div class="change-password">
    <div class="title">密码修改</div>
    <div class="change-box">
      <input type="password" placeholder="旧密码" v-model="password" />
      <input type="password" placeholder="新密码" v-model="newPassword" />
      <input type="password" placeholder="确认新密码" v-model="confirm" />
      <button @click="changePsd">确认修改</button>
    </div>
  </div>
</template>

<script>
import axios from "../axios/axios";
export default {
  data() {
    return {
      password: "",
      newPassword: "",
      confirm: "",
    };
  },
  methods: {
    changePsd() {
      if (!this.password) {
        alert("旧密码不能为空");
        return;
      } else if (!this.newPassword) {
        alert("新密码不能为空");
        return;
      } else if (this.newPassword !== this.confirm) {
        alert("两次密码不一致");
        return;
      } else {
        const userId = JSON.parse(localStorage.getItem("user")).userId;
        console.log(typeof userId);
        axios
          .put(
            "/user/mima?userId=" +
              userId +
              "&password=" +
              this.password +
              "&newPassword=" +
              this.newPassword
          )
          .then((res) => {
            console.log(res);
            if (res.flag) {
              alert("修改成功");
              this.password = "";
              this.newPassword = "";
              this.confirm = "";
            } else {
              alert("修改失败");
            }
          });
      }
    },
  },
};
</script>


<style scoped>
.title {
  font-size: 26px;
  color: #888;
  margin-bottom: 20px;
}
.change-box {
  height: 500px;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.change-box input {
  width: 350px;
  height: 55px;
  margin: 10px 0;
  text-indent: 1.5em;
}
button {
  width: 360px;
  height: 55px;
  background-color: orange;
  color: #fff;
  margin-top: 10px;
}
</style>