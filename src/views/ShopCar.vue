<template>
  <div class="shop-car">
    <div class="list-header">
      <span class="shop-img">商品图片</span>
      <span class="shop-name">商品名称</span>
      <span class="shop-size">尺码</span>
      <span class="shop-price">单价</span>
      <span class="shop-count">数量</span>
      <span class="shop-sum">小计</span>
      <span class="shop-action">操作</span>
    </div>
    <div class="list-body">
      <ul>
        <li
          class="list-item"
          @click="choose"
          v-for="(item, index) in shopList"
          :key="item.cartId"
          :data-index="index"
          :class="[{ active: chooseList.includes(index + '') }]"
        >
          <span class="shop-img" :data-index="index"
            ><img :src="item.shoes[0].avatar.split(',')[0]" alt=""
          /></span>
          <span class="shop-name" :data-index="index">{{
            item.shoes[0].name
          }}</span>
          <span class="shop-size" :data-index="index">{{ item.size }}</span>
          <span class="shop-price" :data-index="index">{{
            item.shoes[0].price
          }}</span>
          <span class="shop-count">
            <button @click="item.shoesNumber++">+</button>
            <input type="text" v-model="item.shoesNumber" />
            <button @click="item.shoesNumber--">-</button>
          </span>
          <span class="shop-sum"
            >{{ item.shoes[0].price * item.shoesNumber }}元</span
          >
          <span class="shop-action" @click="delShoe" :data-cart="item.cartId">x</span>
        </li>
      </ul>
    </div>
    <div class="bill-column">
      <span class="left" style="color: #999" @click="$router.push('/home')"
        >继续购物</span
      >
      <span
        class="right"
        style="background-color: orange; color: #fff"
        @click="goSubmit"
        >去结算</span
      >
      <span class="right" style="font-size: 20px; color: orange"
        >合计:{{ sum }}元</span
      >
    </div>
  </div>
</template>

<script>
import axios from "../axios/axios";
export default {
  data() {
    return {
      shopList: [],
      chooseList: [],
    };
  },
  beforeMount() {
    const userId = JSON.parse(localStorage.getItem("user")).userId;
    axios.get("/user/cart?userId=" + userId).then((res) => {
      console.log(res);
      this.shopList = res.data.records;
    });
  },
  computed: {
    sum() {
      let sum = 0;
      this.chooseList.forEach((index) => {
        console.log(index);
        sum =
          sum +
          this.shopList[Number(index)].shoes[0].price *
            this.shopList[Number(index)].shoesNumber;
      });
      return sum;
    },
  },
  methods: {
    delShoe(e){
      axios({
        method:"delete",
        url:"/user/cart?cartId="+Number(e.target.dataset.cart)
      }).then((res)=>{
        console.log(res);
        if(res.flag){
          console.log(111300);
          this.shopList=this.shopList.filter((item)=>{
              return item.cartId!=res.data
           })
           console.log(this.shopList);
           this.$router.go(0)
        }else{
          alert("删除失败，请检查你的网络")
        }
      })
    },
    choose(e) {
      console.log(e.target.dataset.index);
      const index = e.target.dataset.index;
      if (!this.chooseList.includes(index)) this.chooseList.push(index);
      else {
        this.chooseList.splice(this.chooseList.indexOf(index), 1);
      }
    },
    goSubmit() {
      const cartOrder = [];
      this.chooseList.forEach((item) => {
        const index = Number(item);
        cartOrder.push({
          name: this.shopList[index].shoes[0].name,
          price: this.shopList[index].shoes[0].price,
          count: this.shopList[index].shoesNumber,
          size: this.shopList[index].size,
          avatar: this.shopList[index].shoes[0].avatar,
          shoesId: this.shopList[index].shoesId,
        });
      });
      console.log(cartOrder);
      if (!cartOrder) return;
      else {
        localStorage.setItem("cartOrder", JSON.stringify(cartOrder));
        this.$router.push("/submit");
      }
    },
  },
};
</script>

<style scoped>
.shop-car {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}
.active {
  background-color: cornsilk !important;
}
.list-header,
.list-item {
  display: flex;
  width: 95%;
  height: 60px;
  box-sizing: border-box;
  text-align: center;
  line-height: 60px;
  justify-content: space-between;
  padding: 0 10px;
  font-weight: 600;
  color: #999;
  background-color: #fff;
}
.list-header span {
  display: inline-block;
}
.shop-img {
  width: 15%;
}
.shop-name {
  width: 30%;
  text-align: left;
}
.shop-size {
  width: 5%;
}
.shop-price {
  width: 10%;
}
.shop-count {
  width: 15%;
}
.shop-sum {
  width: 10%;
}
.shop-action {
  width: 5%;
}
.list-body {
  width: 95%;
  height: 300px;
}
.list-body ul {
  width: 100%;
}
.list-body ul .list-item {
  width: 100%;
  height: 100px;
  line-height: 100px;
}
.shop-img img {
  margin-top: 10px;
  height: 80px;
  width: 80px;
}
.shop-count input {
  width: 20px;
  height: 20px;
  background-color: #fff;
  text-align: center;
  border: 0;
}
.bill-column {
  width: 95%;
  height: 60px;
  margin-top: 20px;
  background-color: #fff;
  text-align: center;
  line-height: 60px;
}
.bill-column span {
  display: inline-block;
  height: 100%;
}
.left {
  float: left;
  width: 10%;
}
.right {
  float: right;
  width: 15%;
}
</style>