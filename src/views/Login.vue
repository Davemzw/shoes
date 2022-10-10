<template>
  <div class="login">
    <div class="login-box">
      <div class="box-header">用户登录</div>
      <div class="account-info">
        <div class="account">
          <input
            type="text"
            placeholder="请输入你的用户名"
            v-model="user.username"
          />
        </div>
        <div class="password">
          <input
            type="password"
            placeholder="请输入你的密码"
            v-model="user.password"
          />
        </div>
        <button @click="login">登录</button>
        <div class="otherthing">
          <span class="return" @click="$router.push('/home')">返回首页</span>
          <span class="register" @click="$router.push('/register')"
            >前往注册</span
          >
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
        password: "",
      },
    };
  },
  methods: {
    login() {
      axios.post("/user/login", this.user).then((res) => {
        console.log(res);
        const data = res.data;
        if (res.flag) {
          localStorage.setItem("user", JSON.stringify(res.data));
          localStorage.setItem("isLogin", 1);
          this.$router.push("/home");
        } else {
          alert(res.msg);
        }
      });
    },
  },
};
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 600px;
  background-image: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01762957202bc26ac72538128e031c.jpg%401280w_1l_2o_100sh.png&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1667979068&t=f03e2e56308fe8ea92d65bc619b418d0");
  background-size: 100% 100%;
}
.login-box {
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
  margin: 40px 0;
}
.account,
.password {
  margin-bottom: 20px;
}
.account-info input {
  width: 250px;
  height: 40px;
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
  height: 50px;
  background-color: transparent;
}
.otherthing {
  width: 100%;
  position: absolute;
  bottom: 20px;
  font-size: 14px;
  color: black;
}
.return {
  float: left;
}
.register {
  float: right;
  margin-right: 40px;
}
</style>