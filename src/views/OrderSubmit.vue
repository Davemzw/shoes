<template>
  <div class="submit">
    <div class="address">
      <div class="title">收货地址</div>
      <div class="address-list">
        <div
          class="address-item"
          v-for="address in addressList"
          :key="address.userAddressId"
          @click="chooseAddress"
          :data-address="address.userAddressId"
          :class="[{ active: address.userAddressId == addressId }]"
        >
          <div class="name" :data-address="address.userAddressId">
            {{ address.consignee }}
          </div>
          <div class="phone" :data-address="address.userAddressId">
            {{ address.phone }}
          </div>
          <p class="harvest-address" :data-address="address.userAddressId">
            {{ address.addressProvince }}&nbsp;{{ address.addressCity }}&nbsp;{{
              address.area
            }}&nbsp;{{ address.addressDetail }}
          </p>
          <span @click="changeaddress(address)">修改</span>
        </div>
        <div class="add-address">
          <div @click="addnewaddress">+</div>
        </div>
      </div>
    </div>
    <div class="order-goods">
      <div class="title">商品</div>
      <div class="order-good" v-for="item in shopList" :key="item.name">
        <div class="image">
          <img :src="item.avatar.split(',')[0]" alt="" />
          <div style="float: right">{{ item.name }}</div>
        </div>

        <div class="size">{{ item.size }}码</div>
        <div class="price">{{ item.price }}*{{ item.count }}</div>
        <div class="sum">{{ Number(item.price) * Number(item.count) }}元</div>
      </div>
      <div class="method">
        <div class="title">配送方式</div>
        <div style="color: orange">包邮</div>
      </div>
    </div>
    <div class="pay-info">
      <div class="title">费用</div>
      <div class="info-list">
        <div class="list-item">
          <span>商品件数:</span>
          <span>{{ shopList.length }}件</span>
        </div>
        <div class="list-item">
          <span>商品总价:</span>
          <span>{{ sum }}元</span>
        </div>
        <div class="list-item">
          <span>活动优惠:</span>
          <span>0元</span>
        </div>
        <div class="list-item">
          <span>应付金额:</span>
          <span style="font-size: 20px">{{ sum }}元</span>
        </div>
      </div>
    </div>
    <div class="choose">
      <button class="return-btn" @click="goShopcar">返回购物车</button>
      <button class="sub-btn" @click="submitorder">提交订单</button>
    </div>
    <div class="popContainer" v-if="isShow"></div>
    <div class="address-add" v-if="isShow">
      <div class="person-info">
        <input type="text" placeholder="收货人" v-model="person" />
        <input type="text" placeholder="手机号码" v-model="phone" />
      </div>
      <div class="shop-address">
        <select v-model="province">
          <option selected disabled>请选择省份</option>
          <option v-for="province in map" :key="province.mapId">{{province.addressName}}</option>
        </select>
        <select v-model="city">
          <option selected disabled>请选择城市</option>
          <option v-for="city in cityList" :key="city.mapId">{{city.addressName}}</option>
        </select>
        <select v-model="area">
          <option selected disabled>请选择区/县</option>
          <option v-for="area in areaList" :key="area.mapId">{{area.addressName}}</option>
        </select>
      </div>
      <div class="detail-address">
        <input type="text" placeholder="详细地址" v-model="detail" />
      </div>
      <div class="btn-box">
        <button style="background-color: orange" @click="submitaddress">
          确定
        </button>
        <button style="background-color: #888" @click="toggleShow">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../axios/axios";
export default {
  data() {
    return {
      addressList: [],
      province: "",
      city: "",
      area: "",
      isShow: false,
      person: "",
      phone: "",
      detail: "",
      isAdd: true,
      shopList: [],
      addressId: "",
      map:[],
      cityList:[],
      areaList:[]
    };
  },
  watch:{
    province(newVal){
      this.map.forEach((item)=>{
        if(item.addressName===newVal){
          this.cityList=item.children
          this.city=item.children[0].addressName
        }
      })
    },
    city:{
      handler(newVal){
      this.cityList.forEach((item)=>{
        
        if(item.addressName===newVal){
         this.areaList=item.children
         this.area=item.children[0].addressName
        }
      })
    },
    immediate:true
  }
  },
  beforeMount() {
    const userId = JSON.parse(localStorage.getItem("user")).userId;
    axios.get("/user/address?userId=" + userId).then((res) => {
      console.log(res);
      this.addressList = res.data.records;
    });
    axios.get("/user/address/map").then((res)=>{
      console.log(res);
      this.map=res.data[0].children
    })
    if (this.$route.query.name) {
      this.shopList.push(this.$route.query);
    } else {
      this.shopList = JSON.parse(localStorage.getItem("cartOrder"));
      console.log(this.shopList);
    }
  },
  computed: {
    sum() {
      let sum = 0;
      this.shopList.forEach((item) => {
        sum += item.price * item.count;
      });
      return sum;
    },
    shoes() {
      const shoes = [];
      this.shopList.forEach((item) => {
        shoes.push({
          shoesId: item.shoesId,
          size: item.size,
          integral: 100,
          shoesNumber: item.count,
        });
      });
      return shoes;
    },
  },
  methods: {
    submitaddress() {
      if (this.isAdd) {
        console.log("我在添加新的地址");
      } else {
        console.log("我在修改已有的地址");
      }
    },
    chooseAddress(e) {
      console.log(e.target.dataset.address);
      this.addressId = e.target.dataset.address;
    },
    changeaddress(address) {
      this.isAdd = false;
      this.toggleShow();
      this.province=address.addressProvince;
      this.city=address.addressCity;
      this.area=address.area;
      this.detail=address.addressDetail;
      this.phone=address.phone;
      this.person=address.consignee;
    },
    addnewaddress() {
      this.isAdd = true;
      this.toggleShow();
    },
    onChangeProvince(a) {
      this.province = a.value;
    },
    onChangeCity(a) {
      this.city = a.value;
    },
    onChangeArea(a) {
      this.area = a.value;
    },
    toggleShow() {
      this.isShow = !this.isShow;
    },
    goShopcar() {
      this.$router.push("/shopcar");
    },
    submitorder() {
      axios
        .post("/user/order/generate", {
          Order: {
            userId: JSON.parse(localStorage.getItem("user")).userId,
            price: this.sum,
            addressId: this.addressId,
            status: 0,
            Shoes: this.shoes,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.flag) {
            localStorage.setItem("Order", JSON.stringify(res.data));
            this.$router.push("/pay");
          }
        });
    },
  },
};
</script>

<style scoped>
.submit {
  display: flex;
  width: 100%;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.active {
  background-color: #ff8345 !important;
}
.address {
  width: 85%;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: #fff;
}
.title {
  font-size: 18px;
  width: 100%;
  height: 60px;
  line-height: 60px;
}
.address-list {
  display: flex;
  justify-content: left;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px 25px;
}
.address-item,
.add-address {
  position: relative;
  width: 248px;
  height: 180px;
  background-color: #fff;
  margin-right: 20px;
  margin-bottom: 10px;
  padding: 10px 15px;
  border: 1px solid orange;
}
.shop-address select {
  display: inline-block;
  width: 177px;
  height: 38px;
  border: 1px solid #888;
}
.address-item * {
  margin-bottom: 25px;
}
.address-item .name {
  font-size: 18px;
}

.address-item .phone,
.address-item .harvest-address {
  font-size: 15px;
  color: #888;
}

.address-item span {
  position: absolute;
  bottom: 10px;
  right: 20px;
  color: orange;
}
.add-address {
  text-align: center;
  line-height: 180px;
  font-size: 28px;
}
.order-goods {
  width: 85%;
  box-sizing: border-box;
  background-color: #fff;
  padding: 10px 15px;
}
.order-good {
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
  line-height: 60px;
  border-bottom: 1px solid #888;
}
.order-good img {
  width: 50px;
  height: 50px;
}
.size {
  margin-left: 400px;
}
.sum {
  margin-right: 20px;
  color: orange;
}
.pay-info {
  width: 85%;
  border-bottom: 1px solid #888;
  background-color: #fff;
  padding: 10px 15px;
  box-sizing: border-box;
}
.info-list {
  float: right;
  margin-right: 20px;
}
.info-list .list-item {
  width: 180px;
  height: 40px;
  line-height: 40px;
  margin: 5px 0;
}
.list-item span:nth-child(1) {
  font-size: 15px;
  color: #888;
}
.list-item span:nth-child(2) {
  float: right;
  font-size: 15px;
  color: orange;
}
.choose {
  display: flex;
  width: 85%;
  background-color: #fff;
  padding: 15px 10px;
  justify-content: right;
  box-sizing: border-box;
}
.choose .return-btn,
.sub-btn {
  width: 150px;
  height: 40px;
  background-color: #fff;
  color: #888;
  border: 1px solid #888;
}
.sub-btn {
  background-color: orange;
  margin-left: 20px;
  color: #fff;
}
.address-add {
  /* display: none; */
  display: flex;
  position: fixed;
  width: 700px;
  top: 200px;
  background-color: #fff;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 10px;
}
.address-add > div {
  width: 80%;
  height: 50px;
  box-sizing: border-box;
}
.person-info input {
  width: 250px;
  height: 36px;
  margin: 0 10px;
}
.shop-address,
.detail-address {
  padding: 0 10px;
}
.detail-address input {
  width: 98%;
  height: 36px;
}
.btn-box button {
  width: 150px;
  height: 40px;
  color: #fff;
  border: none;
  margin: 0 10px;
}
div.popContainer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
}
</style>