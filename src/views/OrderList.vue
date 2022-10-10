<template>
  <div class="my-order">
    <div class="title">{{ $route.query.title ?? "全部订单" }}</div>
    <div class="order-list">
      <div
        class="order-item"
        v-for="(order, index) in orderList"
        :key="order.Id"
        v-show="index < currentIndex * 2 && index >= (currentIndex - 1) * 2"
      >
        <div class="box1">
          <span style="font-size: 18px; color: orange">下单成功</span>
          <div class="order-info">
            <span class="order-time">{{order.createTime}}</span>
            <span class="order-id">订单号:{{ order.orderId }}</span>
            <span class="order-pay"
              >应付金额：<i style="font-size: 28px">{{ order.price }}</i
              >元</span
            >
          </div>
        </div>
        <div class="box2">
          <div
            v-for="item in order.shoes"
            :key="item.shoesId"
            style="margin-right: 20px"
          >
            <img :src="item.avatar.split(',')[0]" alt="" />
            <div style="font-size: 14px; line-height: 20px">
              <div>
                {{ item.name }}
              </div>
              <div>{{ item.size }}码</div>
              <div>{{ item.price }}元</div>
            </div>
          </div>
          <div
            class="look-detail"
            @click="goDetail"
            :data-order="order.orderId"
          >
            订单详情
          </div>
        </div>
      </div>
      <Pager @changeIndex="changePage" :pagenum="pagenumber"></Pager>
    </div>
  </div>
</template>

<script>
import Pager from "../components/Pager.vue";
import axios from "../axios/axios";
export default {
  data() {
    return {
      currentIndex: 1,
      orderList: [],
    };
  },
  components: {
    Pager,
  },
  computed: {
    pagenumber() {
      return Math.ceil(this.orderList.length / 2);
    },
  },
  beforeMount() {
    const userId = JSON.parse(localStorage.getItem("user")).userId;
    axios.get("/user/order?userId=" + userId).then((res) => {
      console.log(res);
      if(this.$route.query.index==="0"){
      this.orderList = res.data.records.reverse().filter((item)=>{
        return item.status!==0
      });
    }else{
      this.orderList=res.data.records.filter((item)=>{
        return item.status===(Number(this.$route.query.index)-1)
      })
    }
    });
  },
  mounted() {
    console.log(this.$route.query.title);
  },
  watch:{
    $route:{
      handler(){
         this.$router.go(0)
      },
      deep:true
    }
  },
  methods: {
    goDetail(e) {
      console.log(e.target);
      this.$router.push({
        name: "orderdetail",
        params: {
          order: e.target.dataset.order,
        },
      });
    },
    changePage(index) {
      this.currentIndex = index;
    },
  },
};
</script>

<style scoped>
.my-order {
  width: 98%;
  background-color: #fff;
}
.my-order .title {
  font-size: 26px;
  color: #888;
  margin-bottom: 20px;
}
.my-order .order-item {
  width: 100%;
  height: 400px;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid orange;
  margin-bottom: 20px;
}
.order-item .box1 {
  width: 100%;
  height: 45%;
  box-sizing: border-box;
  border-bottom: 1px solid orange;
  padding: 40px 30px;
  background-color: #fde9d9;
}
.order-info {
  position: relative;
  font-size: 14px;
  font-weight: 500;
  color: #888;
  margin-top: 15px;
}
.order-info span {
  margin-right: 10px;
}
.order-pay {
  position: absolute;
  right: 20px;
  top: 10px;
}
.box2 {
  position: relative;
  display: flex;
  width: 100%;
  padding: 30px 20px;
  box-sizing: border-box;
  align-items: center;
  color: #888;
}
.box2 img {
  width: 120px;
  height: 120px;
}
.box2 .look-detail {
  width: 120px;
  height: 20px;
  border: 1px solid #888;
  position: absolute;
  right: 30px;
  top: 50px;
  text-align: center;
  line-height: 20px;
  font-size: 14px;
}
</style>