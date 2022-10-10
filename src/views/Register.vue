<template>
  <div class="register">
    <div class="register-box">
      <div class="box-header">用户注册</div>
      <div class="account-info">
        <div class="account">
          <input
            type="text"
            placeholder="请输入你的用户名"
            v-model="user.username"
            required
          />
        </div>
        <div class="phone" style="margin-bottom: 15px">
          <input
            type="text"
            placeholder="请输入你的手机号"
            v-model="user.phone"
            required
          />
        </div>
        <div class="password">
          <input
            type="password"
            placeholder="请输入你的密码"
            v-model="user.password"
            required
          />
        </div>
        <div class="confirm">
          <input
            type="password"
            placeholder="请再次输入密码"
            v-model="confirm"
            required
          />
        </div>
        <button @click="register">注册</button>
        <div class="otherthing">
          <span class="return" @click="$router.push('/home')">返回首页</span>
          <span class="login" @click="$router.push('/login')">前往登录</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../axios/axios";
export default {
  data() {
    return {
      user: {
        username: "",
        phone: "",
        password: "",
      },
      confirm: "",
    };
  },
  methods: {
    register() {
      if (this.user.password !== this.confirm) {
        alert("输入的两次密码不一致");
        return;
      } else if (!this.user.username) {
        alert("输入的用户名不能为空");
        return;
      } else if (!this.user.phone) {
        alert("输入的手机号不能为空");
        return;
      } else if (!this.user.password) {
        alert("输入的密码不能为空");
        return;
      } else {
        axios.post("/user/reg", this.user).then((res) => {
          if (res.flag) {
            alert("注册成功");
            this.$router.push("/login");
          } else {
            alert(res.msg);
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.register {
  position: relative;
  width: 100%;
  height: 600px;
  background-image: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01762957202bc26ac72538128e031c.jpg%401280w_1l_2o_100sh.png&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1667979068&t=f03e2e56308fe8ea92d65bc619b418d0");
  background-size: 100% 100%;
}
.register-box {
  width: 400px;
  height: 400px;
  box-sizing: border-box;
  position: absolute;
  right: 100px;
  top: 80px;
  background-color: rgba(255, 255, 255, 0.6);
  box-shadow: 5px 5px 0 0 rgba(0, 0, 0, 0.2);
  padding: 10px 20px;
  text-align: center;
}
.box-header {
  font-size: 30px;
  color: #888;
  font-weight: 600;
  margin: 25px 0;
}
.account,
.password,
.confirm {
  margin-bottom: 20px;
}
.account-info input {
  width: 250px;
  height: 35px;
  background-color: transparent;
  text-indent: 1em;
  font-size: 18px;
}
input::placeholder {
  color: black;
}
input:-internal-autofill-previewed,
input:-internal-autofill-selected {
  -webkit-text-fill-color: transparent;
  transition: background-color 5000s ease-out 0.5s;
}
button {
  width: 254px;
  height: 46px;
  background-color: transparent;
  font-size: 18px;
}
.otherthing {
  width: 100%;
  position: absolute;
  bottom: 10px;
  font-size: 14px;
  color: black;
}
.return {
  float: left;
}
.login {
  float: right;
  margin-right: 40px;
}
</style>