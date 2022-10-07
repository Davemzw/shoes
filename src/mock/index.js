const Mock = require("mockjs")
var Random = Mock.Random;
const url = {
  addressList: 'http://mzw.com/mock/addresslist',
  goodList: 'http://mzw.com/mock/goodlist',
  searchList: "http://mzw.com/mock/searchlist"
}
let addressList = Mock.mock({
  "addressList|6": [
    {
      "id|+1": 1,
      name: '@cname',
      'phone': /^1[34578]\d{9}$/,
      province: '@province',
      city: '@city',
      area: Random.county(),
      detail: '花果山水帘洞东莞理工学院'
    }
  ]
})
let goodList = Mock.mock({
  "goodList|10": [
    {
      "id|+1": 1,
      "name|1": [
        "耐克", "鸿星尔克", "匡威", "361", "特步", "李宁"
      ],
      "image|1": ["https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg14.360buyimg.com%2Fn1%2Fjfs%2Ft1%2F83688%2F1%2F16845%2F99600%2F61372b8dEc6126076%2F9257eb402aa5240b.jpg&refer=http%3A%2F%2Fimg14.360buyimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666233477&t=3cf3c2f7f95261de7f72f98f5939ffc0",
        "https://img0.baidu.com/it/u=3848805266,3689765609&fm=253&fmt=auto&app=138&f=JPEG?w=350&h=350", "http://t13.baidu.com/it/u=2838982585,552884641&fm=224&app=112&f=JPEG?w=350&h=350",
        "https://img1.baidu.com/it/u=2367003393,3153846002&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        "https://img2.baidu.com/it/u=1663759953,2029467343&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        "https://img2.baidu.com/it/u=3571999351,2003185222&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
      ],
      "intro|1": ["耐克足球鞋", "鸿星尔克运动鞋", "匡威篮球鞋", "361运动鞋", "特步跑步鞋", "李宁帆布鞋"],
      "preprice|200-300": 300,
      "price|180-200": 200
    }
  ]
})
let searchList = Mock.mock({
  "searchList|18": [
    {
      "id|+1": 1,
      "name|1": [
        "耐克", "鸿星尔克", "匡威", "361", "特步", "李宁"
      ],
      "image|1": ["https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg14.360buyimg.com%2Fn1%2Fjfs%2Ft1%2F83688%2F1%2F16845%2F99600%2F61372b8dEc6126076%2F9257eb402aa5240b.jpg&refer=http%3A%2F%2Fimg14.360buyimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666233477&t=3cf3c2f7f95261de7f72f98f5939ffc0",
        "https://img0.baidu.com/it/u=3848805266,3689765609&fm=253&fmt=auto&app=138&f=JPEG?w=350&h=350", "http://t13.baidu.com/it/u=2838982585,552884641&fm=224&app=112&f=JPEG?w=350&h=350",
        "https://img1.baidu.com/it/u=2367003393,3153846002&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        "https://img2.baidu.com/it/u=1663759953,2029467343&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        "https://img2.baidu.com/it/u=3571999351,2003185222&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
      ],
      "intro|1": ["耐克足球鞋", "鸿星尔克运动鞋", "匡威篮球鞋", "361运动鞋", "特步跑步鞋", "李宁帆布鞋"],
      "preprice|200-300": 300,
      "price|180-200": 200
    }
  ]
})
Mock.mock(url.addressList, "get", () => {
  return addressList
})
Mock.mock(url.goodList, "get", () => {
  return goodList
})
Mock.mock(url.searchList, "get", () => {
  return searchList
})
