<template>
  <div class="pager">
    <span class="page-btn" @click="decrease">上一页</span>
    <input type="number" v-model="currentIndex" />
    <span class="page-btn" @click="increase">下一页</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 1,
      flag1: false,
      flag2: true,
    };
  },
  props: ["pagenum"],
  methods: {
    decrease() {
      if (this.currentIndex < 2) return;
      this.currentIndex--;
    },
    increase() {
      if (this.currentIndex >= this.pagenum) return;
      this.currentIndex++;
    },
  },
  watch: {
    currentIndex(newVal) {
      if (newVal > this.pagenum) this.currentIndex = this.pagenum;
      this.$emit("changeIndex", this.currentIndex);
    },
  },
};
</script>

<style scoped>
.pager {
  width: 100%;
  display: flex;
  justify-content: center;
}
.page-btn {
  color: #888;
  font-size: 14px;
  margin: 2px 15px;
}
input {
  width: 50px;
  text-align: center;
  outline: none;
}
::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
::v-deep input[type="number"] {
  -moz-appearance: textfield;
}
</style>