<template>
  <div class="header">
    <div class="header-top" v-if="!$route.meta.Logining">
      <div v-if="isLogined">
        <div class="shop-car" @click="goShopCar">购物车</div>
        <div class="order" @click="goOrder">我的订单</div>
        <div class="user-info iconfont" @click="toggleShow">
          {{ username }}&nbsp;&nbsp;&#xe6cc;
        </div>
      </div>
      <div v-else>
        <span style="float: right; margin-right: 40px" @click="goLogin"
          >还未登录，请先登录</span
        >
      </div>
    </div>
    <div class="header-bottom">
      <div class="logo">
        <img src="../assets/imgs/shoe-logo.png" alt="" />
      </div>
      <div v-if="!headerInfo">
        <div class="nav">
          <ul @click="toSearch">
            <li
              v-for="keyword in keywordList"
              :key="keyword"
              :data-words="keyword"
            >
              {{ keyword }}
            </li>
          </ul>
        </div>
        <div class="search" v-if="ifSearchShow">
          <input
            type="text"
            placeholder="按品牌/版型/男鞋/女鞋"
            @keyup.enter="goSearch"
            v-model="keyword"
          />
          <span class="iconfont" @click="goSearch">&#xe651;</span>
        </div>
      </div>
      <div v-else class="header-title">
        <span>{{ headerInfo }}</span>
      </div>
    </div>
    <div class="nav-box" v-if="isShow" @click="toggleShow">
      <ul>
        <li @click="$router.push('/person')">个人中心</li>
        <li @click="$router.push('/person/changepsw')">密码修改</li>
        <li @click="logout">退出登录</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Header",
  data() {
    return {
      isShow: false,
      ifSearchShow: true,
      username: " ",
      isLogined: "",
      keyword: "",
      keywordList: [
        "高跟鞋",
        "篮球鞋",
        "网球鞋",
        "足球鞋",
        "跑步鞋",
        "登山鞋",
        "凉鞋",
      ],
    };
  },
  beforeMount() {
    console.log(1111);
    console.log(Number(localStorage.getItem("isLogin")));
    this.isLogined = Number(localStorage.getItem("isLogin"));
    console.log(this.isLogined);
    if (this.isLogined) {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user);
      this.username = user.nickname;
    }
  },
  beforeDestroy() {
    console.log(111222);
  },
  methods: {
    logout() {
      this.isLogined = 0;
      localStorage.setItem("isLogin", 0);
      localStorage.removeItem("user");
      this.$router.replace("/login");
    },
    goSearch() {
      this.$router.push({
        path: "/search",
        query: {
          keyword: this.keyword,
        },
      });
    },
    toSearch(e) {
      if (e.target.dataset.words) {
        const keyword = e.target.dataset.words;
        this.$router.push({
          path: "/search",
          query: {
            keyword: keyword,
          },
        });
      }
    },
    goLogin() {
      this.$router.push("/login");
    },
    goShopCar() {
      this.$router.push("/shopcar");
    },
    goOrder() {
      this.$router.push("/person/orderlist");
    },
    toggleShow() {
      this.isShow = !this.isShow;
    },
    handleResize(event) {
      this.fullWidth = document.documentElement.clientWidth;
      // 页面宽度小于750px时，不显示地图
      if (this.fullWidth < 1250) {
        this.ifSearchShow = false;
      } else {
        this.ifSearchShow = true;
      }
    },
  },
  mounted() {
    console.log(this.$route);
  },
  created() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount: function () {
    window.removeEventListener("resize", this.handleResize);
  },

  computed: {
    headerInfo() {
      return this.$route.meta.headerInfo;
    },
  },
};
</script>

<style scoped>
.header {
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.4);
  position: sticky;
  top: 0;
  z-index: 999;
}
.header-top {
  width: 100%;
  height: 20px;
  padding: 15px 10px;
  background-color: black;
  color: #6f6f6f;
  font-size: 14px;
}
.shop-car,
.order,
.user-info {
  float: right;
  margin: 0 20px;
}

.shop-car {
  margin-right: 80px;
}
.header-bottom {
  display: flex;
  position: relative;
  width: 100%;
  height: 100px;
  padding: 10px 15px;
  background-color: #fff;
}
.logo {
  position: absolute;
  left: 40px;
  top: 10px;
}
.logo img {
  height: 100px;
}
.nav {
  position: absolute;
  top: 45px;
  left: 400px;
}
.header-title {
  position: absolute;
  top: 45px;
  left: 280px;
  font-size: 28px;
}
.nav ul {
  display: flex;
}
.nav ul li {
  margin: 0 25px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 700;
}
.search {
  position: absolute;
  top: 30px;
  right: 100px;
}
.search input {
  width: 200px;
  padding: 15px;
  border: 1px solid #6f6f6f;
  outline: none;
}
.search span {
  position: absolute;
  top: 0;
  display: inline-block;
  height: 47px;
  width: 47px;
  line-height: 47px;
  text-align: center;
  border: 1px solid #6f6f6f;
}
.nav-box {
  position: absolute;
  display: inline-block;
  background-color: black;
  color: #6f6f6f;
  right: 240px;
  top: 40px;
}
.nav-box ul li {
  width: 100px;
  height: 40px;
  text-align: center;
  line-height: 40px;
}
</style>