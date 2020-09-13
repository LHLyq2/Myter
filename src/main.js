import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueRouter from 'vue-router'

//导入font-awesome字体图标库
import 'font-awesome/css/font-awesome.min.css'

//导入用于设置 rem 基准值模块
import 'lib-flexible'

//引入 import axios from 'axios'
//import VueAxios from 'vue-axios'
import axios from 'axios'
import VueAxios from 'vue-axios'

//防止点击同一路由，出现错误
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
  return originalPush.call(this, location).catch(err => err);
}

import {
  Form,
  Field,
  Button,
  NavBar,
  Toast,
  Tabbar,
  TabbarItem,
  Swipe,
  SwipeItem,
  Lazyload,
  Tab,
  Tabs,
  Search,
  TreeSelect,
  Icon,
  Stepper,
  GoodsAction,
  GoodsActionButton,
  GoodsActionIcon,
  Cell,
  CellGroup,
  SubmitBar,
  Checkbox,
  CheckboxGroup,
  SwipeCell,
  Empty,
  Uploader,
  AddressList,
  AddressEdit,
  Popup,
  Dialog 
}from 'vant'

//注册vant框架的组件
Vue
.use(Form)
.use(Field)
.use(Button)
.use(NavBar)
.use(Toast)
.use(Tabbar)
.use(TabbarItem)
.use(Swipe)
.use(SwipeItem)
.use(Lazyload)
.use(Tab)
.use(Tabs)
.use(Search)
.use(TreeSelect)
.use(Icon)
.use(Stepper)
.use(GoodsAction)
.use(GoodsActionButton)
.use(GoodsActionIcon)
.use(CellGroup)
.use(Cell)
.use(SubmitBar)
.use(Checkbox)
.use(CheckboxGroup)
.use(SwipeCell)
.use(Empty)
.use(Uploader)
.use(AddressList)
.use(AddressEdit)
.use(Popup)
.use(Dialog)
Vue.config.productionTip = false

//配置请求基础路径
axios.defaults.baseURL = 'http://www.kangliuyong.com:10002'

//配置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

//添加appkey属性保存appkey
Vue.prototype.appkey = 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=';

//发起请求之前处理
axios.interceptors.request.use(config => {
  //  

  if (config.method == 'post') {
    let paramsString = '';
    //post请求参数序列化，转成一个字符串
    for (let key in config.data) {
      paramsString += key + '=' + config.data[key] + '&'
    }

    //  

    config.data = paramsString.slice(0, -1);

    //  
  }

  return config;
})

//注册
Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
