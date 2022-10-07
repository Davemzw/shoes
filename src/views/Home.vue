<template>
  <div class="home-page">
    <div class="swiper-box">
      <div class="brand-aside">
        <ul @click="toSearch">
          <li
            v-for="brand in brandList"
            :key="brand"
            :data-words="brand"
            style="color: #fff"
          >
            {{ brand }} <span class="iconfont">&#xe65f;</span>
          </li>
        </ul>
      </div>
      <div class="swiper">
        <swiper
          :slides-per-view="1"
          :space-between="50"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <swiper-slide
            ><img
              src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpicnew13.photophoto.cn%2F20181225%2Fertongxiehaibao-31304286_1.jpg&refer=http%3A%2F%2Fpicnew13.photophoto.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665033230&t=92da43a8e3b7b706e78efe8819144a3e"
              alt=""
          /></swiper-slide>
          <swiper-slide
            ><img
              src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile02.16sucai.com%2Fd%2Ffile%2F2015%2F0129%2F7a13666a9b3f5a1a019808f0c2470c85.jpg&refer=http%3A%2F%2Ffile02.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665033115&t=82e8e47ceed6f0469dc1f700779b21b7"
              alt=""
          /></swiper-slide>
          <swiper-slide
            ><img
              src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.ntimg.cn%2F20121017%2F10503753_170532445000_2.jpg&refer=http%3A%2F%2Fpic.ntimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665033195&t=c21debd069a50478a2246a9a3bf48f28"
              alt=""
          /></swiper-slide>
        </swiper>
      </div>
    </div>
    <div class="miaosha">
      <img
        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01cedd583929b4a801219c77676fbc.jpg%402o.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665033705&t=02865cdf130dfb560c6e25e9266e313f"
        alt=""
      />
    </div>
    <Floor></Floor>
    <Floor>品质男鞋</Floor>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import Floor from "../components/Floor";
export default {
  name: "Home",
  components: {
    Swiper,
    SwiperSlide,
    Floor,
  },
  data() {
    return {
      brandList: [
        "耐克",
        "阿迪达斯",
        "匡威",
        "李宁",
        "鸿星尔克",
        "彪马",
        "美津浓",
        "361",
        "安踏",
        "达芙妮",
      ],
    };
  },
  methods: {
    onSwiper(swiper) {
      console.log(swiper);
    },
    onSlideChange() {
      console.log("slide change");
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
  },
};
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.swiper-box {
  width: 1200px;
  margin: 1px auto;
  box-shadow: 2px 1px rgba(0, 0, 0, 0.4);
}
.brand-aside {
  float: left;
  width: 200px;
  padding: 30px 25px;
  background-color: rgba(85, 88, 90, 0.5);
}
.brand-aside ul li {
  width: 150px;
  padding: 12px 0;
}
.brand-aside ul li a {
  color: #fff;
}
.brand-aside ul li span {
  float: right;
  color: #fff;
}
.swiper {
  width: 950px;
  height: 460px;
  float: right;
}
.swiper img {
  width: 100%;
  height: 100%;
}
.miaosha {
  width: 1200px;
  height: 250px;
  /* margin-left: 160px;
  margin-top: 20px; */
  margin: 20px 0;
}
.miaosha img {
  width: 100%;
  height: 100%;
}
</style>