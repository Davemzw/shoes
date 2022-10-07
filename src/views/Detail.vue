<template>
  <div class="detail">
    <div class="nav-header">
      <div class="title">
        <i @click="$router.push('/home')" style="font-weight: 700; color: black"
          >首页&nbsp;></i
        >{{ goodInfo.type }}--{{ goodInfo.name }}
      </div>
      <div class="nav">
        <span>商品介绍</span>
        <span>客户评价</span>
        <span>客户咨询</span>
      </div>
    </div>
    <div class="zoom" v-if="isZoom">
      <img :src="usingImg" :style="r_img" />
    </div>
    <div class="shop-info">
      <div class="img-show">
        <div
          class="spec-img"
          @mouseover="showMask"
          @mouseout="hideMask"
          @mousemove="zoomImg"
        >
          <img :src="usingImg" alt="" />
          <div class="maskTop"></div>
          <div class="mask" v-if="isZoom" :style="topStyle"></div>
        </div>
        <div class="spec-list" @mousemove="changeImg">
          <ul>
            <li v-for="spec in speclist" :key="spec">
              <img :src="spec" alt="" />
            </li>
          </ul>
        </div>
      </div>
      <div class="info-show">
        <div class="info-title">{{ goodInfo.name }}</div>
        <div>
          <span class="info-name">商品编号:</span
          ><span>{{ goodInfo.shoesId }}</span>
        </div>
        <div>
          <span class="info-name">商品原价:</span
          ><span>{{ goodInfo.price * (1 - goodInfo.discount) }}</span>
        </div>
        <div>
          <span class="info-name">商品现价:</span
          ><span>{{ goodInfo.price }}</span>
        </div>
        <div>
          <span class="info-name">可得积分:</span
          ><span>{{ goodInfo.integral }}</span>
        </div>
        <div class="size-choose">
          <span class="info-name">选择尺码:</span>
          <select v-model="size">
            <option selected disabled>选择尺码</option>
            <option v-for="size in goodInfo.shoesSize" :key="size.size">
              {{ size.size }}
            </option>
          </select>
          <!-- <ul>
            <li v-for="size in goodInfo.shoesSize" :key="size">
              {{ size.size }}
            </li>
          </ul> -->
        </div>
        <div class="num-choose">
          <span class="info-name">购买数量</span>
          <span
            ><button @click="decrease">-</button><span>{{ count }}</span
            ><button @click="increase">+</button></span
          >
        </div>
        <div class="button-box">
          <button @click="addToCart">加入购物车</button>
          <button @click="buyNow">立即购买</button>
        </div>
      </div>
    </div>
    <div class="price-desc">
      <div>价格说明</div>
      <p>
        <b>未划线价：</b>
        未划线价为商品的销售价，是您最终决定是否购买商品的依据。
      </p>
      <p>
        <b>划线价：</b>
        商品展示的划横线价格为参考价，并非原价，该价格可能是品牌专柜标价、商品吊牌价或由品牌供应商提供的正品零售价（如厂商指导价、建议零售价等）或其他真实有依据的价格；由于地区、时间的差异性和市场行情波动，品牌专柜标价、商品吊牌价等可能会与您购物时展示的不一致，该价格仅供您参考。
      </p>
      <p>
        <b>折扣：</b>
        如无特殊说明，折扣指销售商在原价、或划线价（如品牌专柜标价、商品吊牌价、厂商指导价、厂商建议零售价）等某一价格基础上计算出的优惠比例或优惠金额；如有疑问，您可在购买前联系销售商进行咨询。
      </p>
      <p>
        <b>异常问题：</b>
        商品促销信息以商品详情页“促销”栏中的信息为准；商品的具体售价以订单结算页价格为准；如您发现活动商品售价或促销信息有异常，建议购买前先联系销售商咨询。
      </p>
    </div>
  </div>
</template>

<script>
import axios from "../axios/axios";
export default {
  data() {
    return {
      size: "选择尺码",
      usingImg: "",
      speclist: [],
      isZoom: false,
      topStyle: { transform: "" },
      r_img: {},
      count: 1,
      goodInfo: {},
    };
  },
  computed: {
    inventory() {},
  },
  beforeMount() {
    axios.get("/index/shoes?shoesId=" + this.$route.query.good).then((res) => {
      console.log(res);
      this.goodInfo = res.data.records[0];
      (this.usingImg = res.data.records[0].avatar.split(",")[0]),
        (this.speclist = res.data.records[0].avatar.split(","));
    });
  },
  beforeUnmount() {
    console.log(11112333);
  },
  mounted() {
    this.$router.afterEach((to, from, next) => {
      window.scrollTo(0, 0);
    });
  },
  methods: {
    showMask() {
      this.isZoom = true;
    },
    hideMask() {
      this.isZoom = false;
    },
    zoomImg(event) {
      let x = event.offsetX;
      let y = event.offsetY;
      // 层罩的左上角坐标位置，并对其进行限制：无法超出原图区域左上角
      let topX = x - 100 < 0 ? 0 : x - 100;
      let topY = y - 100 < 0 ? 0 : y - 100;
      // 对层罩位置再一次限制，保证层罩只能在原图区域空间内
      if (topX > 200) {
        topX = 200;
      }
      if (topY > 200) {
        topY = 200;
      }
      // 通过 transform 进行移动控制
      this.topStyle.transform = `translate(${topX}px,${topY}px)`;
      this.r_img.transform = `translate(-${2 * topX}px,-${2 * topY}px)`;
    },
    changeImg(e) {
      if (e.target.src) {
        this.usingImg = e.target.src;
      } else {
        return;
      }
    },
    decrease() {
      if (this.count === 1) {
        return;
      }
      this.count--;
    },
    increase() {
      this.count++;
    },
    addToCart() {
      const userId = JSON.parse(localStorage.getItem("user")).userId;
      axios
        .post("/user/cart", {
          userId: userId,
          shoesId: this.goodInfo.shoesId,
          shoesNumber: this.count,
          size: this.size,
        })
        .then((res) => {
          console.log(res);
          if (res.flag) {
            this.$router.push("/shopcar");
          }
        });
    },
    buyNow() {
      if (this.size !== "选择尺码" && this.size)
        this.$router.push({
          path: "/submit",
          query: {
            name: this.goodInfo.name,
            price: this.goodInfo.price,
            count: this.count,
            size: this.size,
            avatar: this.goodInfo.avatar,
            shoesId: this.goodInfo.shoesId,
          },
        });
    },
  },
};
</script>

<style scoped>
.detail {
  position: relative;
  display: flex;
  width: 100%;
  background-color: #fff;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.detail * {
  box-sizing: border-box;
}
.nav-header {
  width: 100%;
  height: 50px;
  padding: 0 20px;
  line-height: 50px;
  border-bottom: 1px solid #999;
}
.title {
  float: left;
  color: #888;
  font-weight: 600;
}
.nav {
  float: right;
  font-size: 14px;
  color: #888;
}
.nav span {
  margin: 0 10px;
}
.shop-info {
  width: 85%;
  display: flex;
  margin-top: 20px;
  padding: 20px 0;
}
.zoom {
  position: absolute;
  width: 400px;
  height: 400px;
  top: 100px;
  left: 600px;
  overflow: hidden;
}
.zoom img {
  position: absolute;
  width: 800px;
  height: 800px;
  top: 0;
  left: 0;
}
.img-show {
  width: 40%;
  padding: 40px 60px;
}
.maskTop {
  width: 400px;
  height: 400px;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
}
.mask {
  position: absolute;
  width: 200px;
  height: 200px;
  background-color: lightcoral;
  opacity: 0.5;
  cursor: move;
  top: 0;
  left: 0;
}

.spec-img {
  position: relative;
  width: 400px;
  height: 400px;
}
.spec-img img {
  width: 100%;
  height: 100%;
}
.spec-list {
  width: 100%;
  margin-top: 40px;
}
.spec-list ul {
  display: flex;
  width: 400px;
  overflow: scroll;
}
.spec-list ul li img {
  width: 60px;
  height: 60px;
}
.info-show {
  display: flex;
  width: 60%;
  height: 578px;
  padding: 20px 10px;
  flex-direction: column;
  justify-content: space-between;
}
.info-title {
  font-size: 24px;
}
.info-name {
  font-size: 16px;
  color: #888;
  font-weight: 500;
  margin-right: 20px;
}
.size-choose {
  display: flex;
}
.size-choose ul {
  display: flex;
}
.size-choose ul li {
  margin-right: 10px;
}
.num-choose > span:nth-child(2) span {
  display: inline-block;
  width: 20px;
  height: 22px;
  text-align: center;
  line-height: 22px;
  border: 1px solid #888;
  margin: 0 5px;
}
.button-box button {
  width: 180px;
  height: 50px;
  background-color: orange;
  color: #fff;
  margin-right: 15px;
}
.price-desc {
  width: 100%;
  background-color: #f2f2f2;
  padding: 50px 20px;
  padding-bottom: 0;
}
.price-desc > div {
  font-size: 20px;
  font-weight: 500;
}
.price-desc p {
  font-size: 14px;
  color: #888;
  margin: 15px 0;
  line-height: 25px;
}
.price-desc p b {
  font-weight: 700;
  font-size: 16px;
}
</style>