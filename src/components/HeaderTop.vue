<template>
  <div class="header-bottom">
    <div class="logo">
      <img src="../assets/imgs/shoe-logo.png" alt="" />
    </div>
    <div class="header-title">
      <span>{{ $route.meta.headerInfo }}</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.header-bottom {
  display: flex;
  position: relative;
  width: 100%;
  height: 100px;
  padding: 10px 15px;
  background-color: #fff;
}
.logo {
  position: absolute;
  left: 40px;
  top: 10px;
}
.logo img {
  height: 100px;
}
.header-title {
  position: absolute;
  top: 45px;
  left: 280px;
  font-size: 28px;
}
</style>