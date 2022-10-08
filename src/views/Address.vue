<template>
  <div class="address">
    <div class="title">收货地址</div>
    <div class="address-list">
      <div
        class="address-item"
        v-for="address in addressList"
        :key="address.id"
      >
        <div class="name">{{ address.consignee }}</div>
        <div class="phone">{{ address.phone }}</div>
        <p class="harvest-address">
          {{ address.addressProvince }}&nbsp;&nbsp;{{
            address.addressCity
          }}&nbsp;&nbsp;{{ address.area }}&nbsp;&nbsp;{{
            address.addressDetail
          }}
        </p>
        <div>
          <span @click="delAddress" :data-index="address.userAddressId">删除</span>
          <span @click="EditAddress(address)">修改</span>
        </div>
      </div>
      <div class="add-address">
        <div @click="addAddress">+</div>
      </div>
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
        <button style="background-color: orange" @click="changeOrAdd">确定</button>
        <button style="background-color: #888" @click="toggleShow">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../axios/axios";
import VDistpicker from "v-distpicker";
export default {
  components: { VDistpicker },
  data() {
    return {
      addressList: [],
      province: "请选择省份",
      city: "请选择城市",
      area: "请选择区/县",
      isShow: false,
      person: "",
      phone: "",
      detail: "",
      addressId:"",
      map:[],
      cityList:[],
      areaList:[],
      addOrEdit:false
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
      this.addressList = res.data.records.filter((item)=>{
        return item.status==="1"
      });
    });
    axios.get("/user/address/map").then((res)=>{
      console.log(res);
      this.map=res.data[0].children
    })
  },
  methods: {
    delAddress(e){
      const addressId=Number(e.target.dataset.index);
      axios.delete("/user/address?addressId="+addressId).then((res)=>{
        console.log(res);
        if(res.flag){
          this.$router.go(0)
        }
      })
    },
    changeOrAdd(){
      const userId = JSON.parse(localStorage.getItem("user")).userId;
      if(this.addOrEdit){
        axios.post("/user/address",{
          userId:userId,
          addressProvince:this.province,
          addressCity:this.city,
          area:this.area,
          status:1,
          addressDetail:this.detail,
          phone:this.phone,
          consignee:this.person
        }).then((res)=>{
          console.log(res);
          if(res.flag){
            this.toggleShow()
            this.$router.go(0)
          }
        })
      }else{
        axios.put("/user/address",{
          userAddressId:this.addressId,
          userId:userId,
          addressProvince:this.province,
          addressCity:this.city,
          area:this.area,
          // status:1,
          addressDetail:this.detail,
          phone:this.phone,
          consignee:this.person
        }).then((res)=>{
          console.log(res);
          if(res.flag){
            this.toggleShow()
            this.$router.go(0)
          }
        })
      }
    },
    addAddress(){
      this.addOrEdit=true
      this.toggleShow();
      this.province="请选择省份";
      this.city="请选择城市";
      this.area="请选择区/县";
      this.person="";
      this.phone="";
      this.detail="";
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
    EditAddress(address) {
      this.addOrEdit=false
      this.toggleShow();
      this.province = address.addressProvince;
      this.city = address.addressCity;
      this.area = address.area;
      this.person = address.consignee;
      this.phone = address.phone;
      this.detail = address.addressDetail;
      this.addressId=address.userAddressId
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 26px;
  color: #888;
  margin-bottom: 20px;
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
  float: right;
  color: orange;
  margin: 0 10px;
}
.add-address {
  text-align: center;
  line-height: 180px;
  font-size: 28px;
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
.shop-address select {
  display: inline-block;
  width: 177px;
  height: 38px;
  border: 1px solid #888;
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