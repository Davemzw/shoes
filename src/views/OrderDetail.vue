<template>
  <div class="order-detail">
    <div class="title">订单详情</div>
    <div class="order-id">
      <div class="s-title">订单号：123223232132</div>
      <span>联系客服</span>
    </div>
    <div class="good-info">
      <div class="s-title" style="color: orange">下单成功</div>
      <div class="state">
        <ul>
          <li :class="[{'live':live===0}]">待付款</li>
          <li :class="[{'live':live===1}]">待发货</li>
          <li :class="[{'live':live===2}]">运输中</li>
          <li :class="[{'live':live===3}]">待收货</li>
          <li :class="[{'live':live===4}]">已收货</li>
          <li :class="[{'live':live===5}]">退款中</li>
          <li :class="[{'live':live===6}]">已退款</li>
        </ul>
      </div>
      <div class="order-good" v-for="item in shoesList" :key="item">
        <img :src="item.avatar.split(',')[0]" alt="" />
        <div>{{ item.name }}-{{ item.size }}码&nbsp;&nbsp;&nbsp;</div>
        <div>{{ item.price }}元</div>
      </div>
    </div>
    <div class="order-info">
      <div class="s-title">收货信息</div>
      <div>
        <i style="color: #888; font-weight: 600"> 姓名：</i
        >{{ addressInfo.consignee }}
      </div>
      <div>
        <i style="color: #888; font-weight: 600">联系电话：</i
        >{{ addressInfo.phone }}
      </div>
      <div>
        <i style="color: #888; font-weight: 600">收货地址：</i
        >{{ addressInfo.addressProvince }}&nbsp;{{
          addressInfo.addressCity
        }}&nbsp;{{ addressInfo.area }}&nbsp;{{ addressInfo.addressDetail }}
      </div>
    </div>
    <div class="pay-method">
      <div class="s-title">支付方式</div>
      <div>
        <i style="color: #888; font-weight: 600">支付方式：</i
        >{{ orderInfo.payMethod }}
      </div>
    </div>
    <div class="pay-info">
      <div>
        商品总价：<span>{{ orderInfo.price }}元</span>
      </div>
      <div>运费：<span>0元</span></div>
      <div>
        应付金额：<span style="font-size: 20px">{{ orderInfo.price }}元</span>
      </div>
      <button class="return" @click="returnList">返回</button>
    </div>
  </div>
</template>

<script>
import axios from "../axios/axios";
export default {
  data() {
    return {
      orderInfo: {},
      shoesList: [],
      addressInfo: {},
      live:"",
    };
  },
  methods: {
    returnList() {
      // this.$router.push("/person/orderlist");
      this.$router.back();
    },
  },
  beforeMount() {
    axios
      .get("/user/order/orderId?orderId=" + this.$route.params.order)
      .then((res) => {
        console.log(res);
        this.orderInfo = res.data.records[0];
        this.shoesList = res.data.records[0].shoes;
        this.addressInfo = res.data.records[0].address;
        this.live=res.data.records[0].status
      });
  },
};
</script>

<style scoped>
.order-detail {
  width: 98%;
  height: 700px;
  background-color: #fff;
}
.order-detail * {
  box-sizing: border-box;
}
.title {
  font-size: 26px;

  color: #888;
  margin-bottom: 20px;
}
.s-title {
  font-size: 18px;
  font-weight: 500;
  color: black;
}
.order-detail > div {
  margin-bottom: 40px;
}
.order-id {
  display: flex;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #888;
  justify-content: space-between;
  line-height: 50px;
}
.order-id span {
  font-size: 14px;
  color: orange;
}
.good-info {
  width: 100%;
  border-bottom: 1px solid #888;
}
.state ul {
  display: flex;
  margin: 20px 0;
}
.state ul li {
  width: 165px;
  height: 24px;
  font-size: 12px;
  text-align: center;
  line-height: 24px;
  border-radius: 20px;
  background-color: rgb(214, 210, 210);
  margin-right: -20px;
}
.state ul .live {
  background-color: #1aad19;
}
.order-good {
  display: flex;
  width: 100%;
  padding: 30px 20px;
  box-sizing: border-box;
  align-items: center;
  color: #888;
}
.order-good img {
  width: 120px;
  height: 120px;
}
.order-info {
  border-bottom: 1px solid #888;
  padding-bottom: 20px;
}
.order-info div {
  margin: 15px 0;
}
.pay-method > div {
  margin: 15px 0;
}
.pay-info {
  float: right;
}
.pay-info div {
  width: 200px;
  margin: 30px 0;
}
.pay-info div span {
  float: right;
  color: orange;
}
.return {
  float: right;
  width: 150px;
  height: 40px;
  background-color: orange;
  color: #fff;
}
</style>