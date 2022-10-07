<template>
  <div class="search-content">
    <div class="bread-crumb">
      <span
        style="font-weight: 700; cursor: default"
        @click="$router.push('/home')"
        >首页&nbsp;></span
      >
      <span style="color: #ccc">全部结果&nbsp;></span>
    </div>
    <div class="search-category">
      <div class="category-item">
        <ul @click="search">
          <li class="title">尺码</li>
          <li
            v-for="size in sizeList"
            :key="size"
            :data-size="size"
            :class="[{ active: current.sizes == size }]"
          >
            {{ size }}
          </li>
        </ul>
      </div>
      <div class="category-item">
        <ul @click="search">
          <li class="title">版型</li>
          <li
            v-for="type in typeList"
            :key="type"
            :data-type="type"
            :class="[{ active: current.type == type }]"
          >
            {{ type }}
          </li>
        </ul>
      </div>
      <div class="category-item">
        <ul @click="search">
          <li class="title">颜色</li>
          <li
            v-for="color in colorList"
            :key="color"
            :data-color="color"
            :class="[{ active: current.color == color }]"
          >
            {{ color }}
          </li>
        </ul>
      </div>
      <div class="category-item">
        <ul @click="search">
          <li class="title">品牌</li>
          <li
            v-for="brand in brandList"
            :key="brand"
            :data-brand="brand"
            :class="[{ active: current.brandName == brand }]"
          >
            {{ brand }}
          </li>
        </ul>
      </div>
    </div>
    <div class="goods-list">
      <ul @click="godetail">
        <li v-for="item in searchList" :key="item.id"><Good :good="item" /></li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "../axios/axios";
import Good from "../components/Good.vue";
export default {
  name: "Search",
  data() {
    return {
      searchList: [],
      current: {},
      sizeList: ["36", "37", "38", "39", "40", "41"],
      colorList: [
        "红色",
        "黄色",
        "橙色",
        "青色",
        "紫色",
        "黑色",
        "白色",
        "蓝色",
        "彩色",
        "灰色",
      ],
      brandList: ["耐克", "阿迪达斯", "鸿星尔克", "匡威", "李宁", "彪马"],
      typeList: [
        "足球鞋",
        "运动鞋",
        "网球鞋",
        "篮球鞋",
        "跑步鞋",
        "板鞋",
        "凉鞋",
        "钉鞋",
      ],
    };
  },
  components: {
    Good,
  },
  beforeMount() {
    if (this.$route.query.keyword) {
      const keyword = this.$route.query.keyword;
      axios
        .post("http://192.168.3.140:8088/index/shoes/search", {
          type: keyword,
          name: keyword,
          details: keyword,
          brandName: keyword,
        })
        .then((res) => {
          console.log(res);
          this.searchList = res.data.records;
        });
    }
  },
  methods: {
    godetail(e) {
      console.log(1);
      console.log(e.target.dataset.index);
      if (e.target.dataset.index)
        this.$router.push({
          path: "/detail",
          query: { good: e.target.dataset.index },
        });
    },
    search(e) {
      const item = e.target.dataset;
      if (item.size) {
        this.current.sizes = item.size;
      }
      if (item.type) {
        this.current.type = item.type;
      }
      if (item.color) {
        this.current.color = item.color;
      }
      if (item.brand) {
        this.current.brandName = item.brand;
      }
      this.current.currentPage = 1;
      axios.post("/index/shoes/like", this.current).then((res) => {
        console.log(res);
        this.searchList = res.data.records;
      });
    },
  },
};
</script>

<style scoped>
.active {
  color: orange;
}
.bread-crumb {
  height: 40px;
  line-height: 40px;
  padding-left: 30px;
  font-size: 14px;
}
.bread-crumb span {
  margin-left: 10px;
}
.search-category {
  background-color: #fff;
  padding: 35px 0;
}
.category-item {
  height: 40px;
  line-height: 40px;
  padding-left: 40px;
  border-bottom: 2px solid #f2f2f2;
}
.category-item ul .title {
  color: #ccc;
  margin-right: 40px;
}
.category-item ul {
  display: inline-block;
}
.category-item ul li {
  float: left;
  width: 80px;
  padding: 0 auto;
  font-weight: 500;
}
.search-category :last-child {
  border: 0;
}
.goods-list {
  overflow: hidden;
  /*清除浮动*/
}
.goods-list ul {
  width: 100%;
  margin: 20px 45px;
}
.goods-list ul li {
  width: 210px;
  float: left;
  margin: 10px 15px;
  box-shadow: black 0 0 1px;
}
</style>
