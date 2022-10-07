<template>
  <div id="app">
    <Header v-if="!$route.meta.Logining"></Header>
    <HeaderTop v-else></HeaderTop>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import HeaderTop from "./components/HeaderTop.vue";
export default {
  name: "App",
  components: {
    Header,
    Footer,
    HeaderTop,
  },
  data() {
    return {
      num: 1,
    };
  },
};
</script>

<style>
body {
  background-color: #f2f2f2;
}
.w {
  width: 1200px;
  margin: 0 auto;
}
</style>
