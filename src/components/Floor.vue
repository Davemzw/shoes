<template>
  <div class="floor w">
    <div class="floor-header">
      <span class="title"> <slot>精品女鞋</slot></span>
      <div class="floor-nav">
        <ul>
          <li><a href="#">新品上市</a></li>
          <li><a href="#">热销单品</a></li>
          <li><a href="#">降价风潮</a></li>
        </ul>
      </div>
      <div class="goods-list">
        <ul @click="godetail">
          <li
            v-for="(item, index) in goodList"
            :key="item.id"
            :data-index="index"
          >
            <Good :good="item"></Good>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../axios/axios";
import Good from "./Good";
export default {
  name: "Floor",
  components: {
    Good,
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
  },
  data() {
    return {
      goodList: [],
    };
  },
  beforeMount() {
    let Min=10000;
    let Max=999999;
    let Range =Max - Min;
    let Rand = Math.random();
    let userkey;
    if(localStorage.getItem('userkey')){
        userkey=Number(localStorage.getItem('userkey'))
    }
    else{userkey=Min + Math.round(Rand * Range)
    localStorage.setItem('userkey',userkey)
    } 
    
    axios.get("/index?userKey="+userkey).then((res) => {
      console.log(res);
      this.goodList = res.data.records;
    });
  },
};
</script>

<style scoped>
.floor {
  margin-top: 20px;
}
.floor-header {
  padding: 10px 0;
}
.floor-header .title {
  font-size: 20px;
  font-weight: 700;
}
.floor-nav {
  float: right;
}
.floor-nav ul li {
  float: left;
  margin: 0 10px;
}
.floor-nav ul li a {
  color: #6f6f6f;
  font-size: 14px;
}
.goods-list {
  overflow: hidden;
  /*清除浮动*/
}

.goods-list ul li {
  width: 210px;
  float: left;
  margin: 10px 15px;
  box-shadow: black 0 0 1px;
}
</style>