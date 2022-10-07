<template>
  <div class="person-info">
    <div class="title">个人信息</div>
    <div class="info-table">
      <div class="item">
        <span class="label"
          >头像&nbsp;&nbsp;<i style="color: orange; font-size: 12px"
            >(点击修改)</i
          >：</span
        >
        <input
          id="touxiang"
          type="file"
          style="display: none"
          ref="picture"
          accept="image/png, image/jpeg, image/jpg"
          @change="changeImg"
        />
        <img :src="user.avatar" alt="" @click="chooseavatar" />
      </div>
      <div class="item">
        <span class="label">昵称：</span>
        <input type="text" class="tick-name" v-model="user.nickname" />
      </div>
      <div class="item">
        <span class="label">性别：</span>
        <div style="width: 215px">
          <input type="radio" name="sex" value="0" class="sexradio" />
          <label class="mr10">男</label>
          <input type="radio" name="sex" value="1" class="sexradio" />
          <label class="mr10">女</label>
        </div>
      </div>
      <div class="item">
        <span class="label">生日：</span>
        <input type="date" name="" id="" />
      </div>
      <div class="item">
        <span class="label">手机号：</span>
        <input type="text" v-model="user.phone" />
      </div>
      <div class="item">
        <span class="label">邮箱：</span>
        <input type="email" v-model="user.eMail" />
      </div>
      <div class="item btn-box">
        <button class="save" @click="save">保存</button>
        <button class="logout">注销</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../axios/axios";
export default {
  data() {
    return {
      user: {},
    };
  },
  beforeMount() {
    const userId = JSON.parse(localStorage.getItem("user")).userId;
    axios.get("/user/info?id=" + userId).then((res) => {
      console.log(res);
      this.user = res.data;
      localStorage.setItem("user", JSON.stringify(this.user));
    });
  },
  methods: {
    chooseavatar() {
      this.$refs.picture.click();
    },
    changeImg() {
      const userId = JSON.parse(localStorage.getItem("user")).userId;
      console.log(1);
      let f = this.$refs.picture;
      console.log("fff", f);
      console.dir(f.files[0]);
      let param = new FormData();
      param.append("file", f.files[0]);
      param.append("userId", userId); //通过append向form对象添加数据
      console.log("1111112", JSON.stringify(param));
      // console.log(param.get("img")); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
      // console.log(param.values());
      let config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      // 添加请求头;
      axios({
        url: "/user/avatar",
        method: "PUT",
        data: param,
        config,
      }).then((res) => {
        console.log(res);
        this.user.avatar = res.data.avatar;
      });
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
.title input {
  outline: none;
}
.info-table {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.info-table img {
  width: 100px;
  height: 100px;
  border-radius: 50px;
}
.info-table .item {
  width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
}
.info-table .item .label {
  color: #888;
  font-size: 18px;
}
.info-table .item input {
  width: 200px;
  height: 30px;
  font-size: 18px;
  text-indent: 0.5em;
}
.info-table .item input[type="radio"] {
  width: 15px;
  height: 15px;
}
.info-table .item input[type="date"] {
  width: 205px;
}
.save,
.logout {
  width: 140px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  background-color: orange;
  color: #fff;
  margin: 10px;
}
.logout {
  background-color: #fff;
  border: 1px solid #888 !important;
  color: #888;
}
.info-table .btn-box {
  justify-content: flex-start;
}
.info-table .btn-box button {
  border: 0;
}
</style>