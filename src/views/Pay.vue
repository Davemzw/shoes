<template>
  <div class="pay-order">
    <div class="order-info">
      <div class="result-logo iconfont">&#xe6ce;</div>
      <div class="result-info">
        <div style="width: 100%; height: 50%; border-bottom: 1px solid #999">
          <div class="submit-msg">订单提交成功，快去付款吧!</div>
          <div class="order-sum">
            <span
              >应付金额:<strong
                style="font-size: 20px; color: orange; margin-left: 10px"
                >{{Order.price}}元</strong
              >
            </span>
            <div
              class="iconfont"
              style="font-size: 14px; margin-top: 10px; text-align: right"
            >
              订单详情&#xe6cc;
            </div>
          </div>
        </div>
        <div class="order-detail">
          <div class="order-id">
            订单号:&nbsp;&nbsp;&nbsp;<strong>{{Order.orderId}}</strong>
          </div>
          <div class="detail-info">
            收货信息:&nbsp;&nbsp;<strong>{{orderPerson.consignee}}</strong> {{orderPerson.addressProvince+orderPerson.addressCity+orderPerson.area+orderPerson.addressDetail}}
          </div>
          <div class="order-name">
            商品名:&nbsp;&nbsp;&nbsp;{{shopinfo[0].name}}-{{shopinfo[0].count}}&nbsp;{{shopinfo[0].size}}码{{shopinfo.length==1?'':"..."}}
          </div>
        </div>
      </div>
    </div>
    <div class="pay-info">
      <div class="title">选择以下支付方式付款</div>
      <div class="title noborder">
        <strong style="font-size: 16px; font-weight: 600">支付平台</strong>
      </div>
      <div class="pay-method">
        <button class="iconfont" @click="choosepay(0)" :class="[{payactive:payMethod==='支付宝'}]">
          &#xe68a;<i style="font-size: 18px; font-weight: 600">支付宝</i>
        </button>
        <button class="iconfont" @click="choosepay(1)" :class="[{payactive:payMethod==='微信支付'}]">
          &#xe607;<i style="font-size: 18px; font-weight: 600">微信支付</i>
        </button>
        <span class="count-down"
          >剩余时间:
          <i style="font-size: 18px; color: orange">{{msec<0?"已超时":min+'分'+sec+'秒'}}</i>
        </span>
      </div>

      <div class="submit-btn">
        <button @click="goPay" :disabled="!msec">确认支付</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../axios/axios";
export default {
  data() {
    return {
      min: "",
      sec: "",
      msec: "",
      Order: {},
      shopinfo:[],
      orderPerson:{},
      payMethod:""
    };
  },
  beforeMount(){
    this.Order=JSON.parse(localStorage.getItem("Order"))
    this.shopinfo=JSON.parse(localStorage.getItem('orderInfo'))
    this.orderPerson=JSON.parse(localStorage.getItem('orderperson'))
    this.msec=new Date(this.Order.createTime).getTime()/1000+900-new Date(Date.now()).getTime()/1000; 
  },
  methods: {
    countdown() {
      if (this.msec < 0) return;
      this.msec--;
      let min = parseInt((this.msec / 60) % 60);
      let sec = parseInt(this.msec % 60);
      this.min = min > 9 ? min : "0" + min;
      this.sec = sec > 9 ? sec : "0" + sec;
      const that = this;
      if (min >= 0 && sec >= 0) {
        //倒计时结束关闭订单
        if (min == 0 && sec == 0) {
          return;
        }
        setTimeout(function () {
          that.countdown();
        }, 1000);
      }
    },
    choosepay(flag){
        if(flag===0){
          this.payMethod="支付宝"
        }else{
          this.payMethod="微信支付"
        }
    },
    goPay() {
      const order = JSON.parse(localStorage.getItem("Order"));
      order.status = 1;
      order.payMethod = this.payMethod;
      axios
        .post("/user/order/payment", {
          Order: order,
        })
        .then((res) => {
          console.log(res);
          if (res.flag) {
            alert('支付成功');
            this.$router.push("/person/orderlist");
          }
        });
    },
  },
  mounted() {
    this.countdown();
  },
};
</script>

<style scoped>
.pay-order {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}
.payactive{
  background-color: orange !important;
}
.order-info {
  display: flex;
  width: 85%;
  height: 350px;
  background-color: #fff;
}
.result-logo {
  width: 20%;
  height: 100%;
  text-align: center;
  line-height: 300px;
  color: #1aad19;
  font-size: 75px;
}
.result-info {
  position: relative;
  width: 80%;
  color: #888;
  font-size: 14px;
  padding: 0 10px;
}
.submit-msg {
  position: absolute;
  top: 40px;
  left: 20px;
  font-size: 20px;
}
.result-info .order-sum {
  position: absolute;
  right: 30px;
  top: 40px;
}

.order-detail > div {
  margin: 15px 0;
}
.pay-info {
  width: 85%;
  margin-top: 30px;
  padding: 30px 40px;
  box-sizing: border-box;
  color: #888;
  background-color: #fff;
}
.title {
  height: 60px;
  font-size: 20px;
  border-bottom: 1px solid #888;
  line-height: 60px;
}
.noborder {
  border: 0;
}
.pay-method {
  height: 150px;
  border-bottom: 1px solid #888;
  padding: 20px 0;
}
.pay-method button {
  width: 150px;
  height: 50px;
  font-size: 40px;
  background-color: #fff;
  margin-right: 10px;
  line-height: 50px;
  border: 0;
}
.pay-method button:nth-child(1) {
  font-size: 45px;
  color: #027aff;
}
.pay-method button:nth-child(2) {
  color: #1aad19;
}
.submit-btn {
  padding: 15px 20px;
}
.submit-btn button {
  float: right;
  width: 150px;
  height: 50px;
  background-color: orange;
  color: #fff;
  border: 1px solid #888;
}
.count-down {
  float: right;
  margin-right: 20px;
}
</style>