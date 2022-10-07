<template>
  <div class="footer">
    <div class="footer-top">
      <ul>
        <li class="iconfont">&#xe639;&nbsp;正品保障</li>
        <li class="iconfont">&#xe60e;&nbsp;7天无理由退货</li>
        <li class="iconfont">&#xe606;&nbsp;15天免费换货</li>
        <li class="iconfont">&#xf008a;&nbsp;满68免费包邮</li>
        <li class="iconfont">&#xe632;&nbsp;闪电发货</li>
      </ul>
    </div>
    <div class="footer-bottom">
      <div class="cooperation">
        <i style="font-size: 14px">合作伙伴：</i>
        <span><a href="https://www.alibabagroup.com/">阿里巴巴集团</a></span>
        <span><a href="https://www.taobao.com/">淘宝网</a></span>
        <span><a href="https://www.tmall.com/">天猫</a></span>
        <span
          ><a href="https://pages.tmall.com/wow/a/act/ju/dailygroup/"
            >聚划算</a
          ></span
        >
        <span><a href="https://www.alipay.com/">支付宝</a></span>
      </div>
      <div class="footer-title">品质赢得顾客信赖</div>
      <p>
        十五年专心如一日，推动”货真价实、物美价廉、按需定制“网货的普及是我们的使命，通过缩减渠道成本、时间成本等综合购物成本，我们帮助更多的人享用网货，获得更高的生活品质；通过提供销售平台、
        营销、支付、技术等全套服务，我们帮助更多的企业开拓内部市场，建立品牌，实现产业升级。我们的出现将为整个网络购物市场打造一个透明、诚信、公正、公开的交易平台，进而影响人们的购物消费习惯，
        推动线下市场以及生产流通环节的透明、诚信，从而衍生出一个”开放、透明、分享、责任“的新商业文明。
      </p>
      <div class="copyright">
        版权所有归东莞理工学院实训小组(成员:陈睿、杨志康、梁宇明、马壮武)|反馈意见:2965198512@qq.com|仅供学习交流使用
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  width: 100%;
  margin-top: 100px;
}
.footer-top {
  width: 100%;
  height: 60px;
  background-color: #fff;
  box-shadow: black 0 0 2px;
}
.footer-top ul {
  width: 100%;
  height: 100%;
}
.footer-top ul li {
  float: left;
  width: 20%;
  height: 100%;
  text-align: center;
  line-height: 60px;
  font-size: 14px;
}
.footer-bottom {
  padding: 15px 20px;
}
.footer-title {
  text-align: center;
  color: orange;
  font-size: 18px;
  font-weight: 700;
  margin: 20px 0;
}
.footer-bottom p {
  text-indent: 2em;
  font-size: 14px;
  color: #6f6f6f;
  line-height: 30px;
}
.copyright {
  text-align: center;
  font-size: 14px;
  color: #adabab;
  margin-top: 20px;
}
.cooperation {
  text-align: center;
}
.cooperation span {
  margin: 0 10px;
}
.cooperation span a {
  color: #6f6f6f;
  font-size: 14px;
}
</style>