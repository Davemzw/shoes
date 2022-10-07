<template>
  <div class="person">
    <div class="header">
      <span class="iconfont" @click="$router.push('/home')">首页&#xe699;</span
      ><i style="color: #888">个人中心</i>
    </div>
    <div class="body">
      <div class="person-nav">
        <ul>
          <li class="title">订单中心</li>
          <li
            v-for="item in nav1"
            :key="item"
            :data-liname="item"
            :class="[{ active: title == item }]"
            @click="goOrderList"
          >
            {{ item }}
          </li>
        </ul>
        <ul>
          <li class="title">个人中心</li>
          <li :class="[{ active: title == '个人信息' }]" @click="goPersonInfo">
            个人信息
          </li>
          <li :class="[{ active: title == '密码修改' }]" @click="goChangePsw">
            密码修改
          </li>
          <li :class="[{ active: title == '收货地址' }]" @click="goAddress">
            收货地址
          </li>
        </ul>
      </div>
      <div class="content-box">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nav1: [
        "全部订单",
        "未付款",
        "已付款",
        "已发货",
        "已收货",
        "退货中",
        "已取消",
      ],
      nav2: ["个人信息", "密码修改", "收货地址"],
      title: "全部订单",
    };
  },
  mounted() {
    this.title = this.$route.meta.item;
  },
  methods: {
    goOrderList(e) {
      this.check(e.target.dataset.liname);
      this.$router.push({
        name: "orderlist",
        query: {
          title: this.title,
        },
      });
    },
    goPersonInfo() {
      this.check("个人信息");
      this.$router.push("/person/personinfo");
    },
    goChangePsw() {
      this.check("密码修改");
      this.$router.push("/person/changepsw");
    },
    goAddress() {
      this.check("收货地址");
      this.$router.push("/person/address");
    },
    check(item) {
      this.title = item;
    },
  },
};
</script>

<style scoped>
.person {
  width: 100%;
}
.active {
  color: orange !important;
}
.header {
  width: 100%;
  height: 40px;
  text-indent: 2em;
  line-height: 40px;
}
.body {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.person-nav {
  width: 20%;
  height: 100%;
  background-color: #fff;
  box-sizing: border-box;
  margin-right: 20px;
  padding: 60px 50px;
}
.person-nav ul .title {
  font-size: 18px;
  font-weight: 500;
  color: black;
}
.person-nav ul {
  margin: 30px 0;
}
.person-nav ul li {
  font-size: 14px;
  color: #888;
  margin: 20px 0;
}
.content-box {
  width: 75%;
  /* height: 1000px; */
  box-sizing: border-box;
  background-color: #fff;
  padding: 30px 40px;
}
</style>