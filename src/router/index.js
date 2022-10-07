import { createRouter, createWebHashHistory } from "vue-router"




const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../views/Search")
  },
  {
    path: "/detail",
    name: "detail",
    component: () => import("../views/Detail")
  },
  {
    path: "/shopcar",
    name: "shopcar",
    component: () => import("../views/ShopCar"),
    meta: { headerInfo: "我的购物车", isAuth: true }
  },
  {
    path: "/submit",
    name: "submit",
    component: () => import("../views/OrderSubmit"),
    meta: { headerInfo: "提交订单", isAuth: true }
  },
  {
    path: "/pay",
    name: "pay",
    component: () => import("../views/Pay"),
    meta: { headerInfo: "支付订单", keepAlive: true, isAuth: true }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login"),
    meta: { Logining: true, headerInfo: "鞋城Online" }
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Register"),
    meta: { Logining: true, headerInfo: "鞋城Online" }
  }, {
    path: "/person",
    name: "person",
    component: () => import("../views/Person"),
    redirect: "/person/orderlist",
    //vue3中注意：使用动态加载组件时要在children的path里加上父亲的路径
    children: [
      {
        path: "/person/orderlist",
        name: "orderlist",
        component: () => import("../views/OrderList"),
        meta: { item: "全部订单", isAuth: true }
      }, {
        path: "/person/orderdetail/:order",
        name: "orderdetail",
        component: () => import("../views/OrderDetail"),
        meta: { isAuth: true }
      }, {
        path: "/person/personinfo",
        name: "personinfo",
        component: () => import("../views/PersonInfo"),
        meta: { item: "个人信息", isAuth: true }
      }, {
        path: "/person/changepsw",
        name: "changepsw",
        component: () => import("../views/ChangePassword"),
        meta: {
          item: "密码修改",
          isAuth: true
        }
      }, {
        path: "/person/address",
        name: "address",
        component: () => import("../views/Address"),
        meta: { item: "收货地址", isAuth: true }
      }]
  }
]
// 创建路由对象
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem("isLogin");
  if (to.meta.isAuth) {
    if (isLogin === "1") {
      next()
    } else {
      next("/login")
    }
  }
  else {
    next()
  }
})
export default router
