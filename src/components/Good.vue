<template>
  <div class="good">
    <img :src="good.avatar.split(',')[0]" alt="" :data-index="good.shoesId" />
    <div class="name" :data-index="good.shoesId">{{ good.name }}</div>
    <div class="intro" :data-index="good.shoesId">{{ good.type }}</div>
    <div class="old-price">
      <del>￥200</del>
    </div>
    <div class="price">￥{{ good.price }}</div>
  </div>
</template>

<script>
export default {
  name: "Good",
  props: ["good"],
};
</script>

<style scoped>
.good {
  width: 100%;
  text-align: center;
  background-color: #fff;
  padding: 0 0 10px 0;
}
.good img {
  width: 100%;
  height: 210px;
}
.good div {
  margin-top: 10px;
}
.intro {
  font-size: 14px;
  color: #6f6f6f;
}
.old-price {
  color: #6f6f6f;
  font-size: 12px;
}
.price {
  font-size: 14px;
  color: #ecbd67;
}
</style>