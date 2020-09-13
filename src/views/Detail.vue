<template>
  <div class="detail">
    <!-- 返回上一页和首页 @click-right=""-->
    <van-nav-bar @click-left="back" @click-right="backs">
      <template #right>
        <van-icon name="wap-home-o" size="24" color="#808080" />
      </template>
      <template #left>
        <van-icon name="arrow-left" size="24" color="#808080" />
      </template>
    </van-nav-bar>
    <!-- 图片轮播 -->
    <van-swipe>
      <van-swipe-item v-for="(item,index) in productData.pics" :key="index">
        <img class="auto-img auto-imgs" :src="item.pics_big" alt />
      </van-swipe-item>
    </van-swipe>
    <div class="product-box">
      <div class="product-info">
        <div class="product-price">
          <span>￥</span>
          <span class="price-txt">{{productData.goods_price}}.00</span>
        </div>
        <div class="product-title">{{productData.goods_name}}【限时福利】</div>
        <div class="product-link">商品详情</div>
        <div class="product-titles clearfix">
          <div class="express w fl">快递：免运费</div>
          <div class="prduct-number w fl">剩余数量：{{productData.goods_number}}件</div>
          <div class="prduct-address w fl">广东广州</div>
        </div>
        <div></div>
      </div>
      <div class="promotion-box">
        <div class="promotion-title-box clearfix">
          <div class="promotion-title fl">促销</div>
          <div class="promotion-box-s fl">
            <div class="promotion-title-txt-box fl">
              <div>
                <span class="title-one">促销</span>
                <span class="title-tow">满一件,打5折 满2件,打4折</span>
              </div>
              <div class="promotion-c">
                <span class="title-one">促销</span>
                <span class="title-tow">购买可得2积分</span>
              </div>
            </div>
            <div class="promotion-img fr">
              <van-icon name="arrow" size="14px" color="#B5B5B5" />
            </div>
          </div>
        </div>
        <div class="promotion-title-box clearfix">
          <div class="service-title fl">服务</div>
          <div class="service-box-s fl">
            <div class="service-title-s fl">
              <div class="service-one fl">假一赔四</div>
              <div class="service-tow fl">上门取件</div>
              <div class="service-tow fl">极速退款</div>
              <div class="service-tow fl">七天无理由退换</div>
            </div>
            <div class="promotion-img fr">
              <van-icon name="arrow" size="14px" color="#B5B5B5" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="addProduct-box">
      <div class="addProduct-box-s clearfix">
        <div class="addProduct-title fl">购物添加</div>
        <div class="addProduct-img fr">
          <van-stepper v-model="value" theme="round" button-size="22" disable-input />
        </div>
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        :badge="shoppingCart.length>0 ? shoppingCart.length : ''"
        @click="linkshopcart"
      />
      <van-goods-action-icon icon="star" :text="ste?'已收藏':'收藏'" :color="ste?'#F01626':'#FFAB1A'" @click="changeicon"/>
      <van-goods-action-button type="warning" text="加入购物车" @click="tips()" />
      <van-goods-action-button type="danger" text="立即购买" @click="sumbitOrder" />
    </van-goods-action>
    <div class="vhtml" v-html="productData.goods_introduce"></div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("menuModule");
export default {
  data() {
    return {
      id: "",
      //商品详情数据
      productData: [],
      value: 1,
      str: false,
      ste: false,
    };
  },
  created() {
    //截取查询参数
    this.id = this.$route.query.goods_id;
    console.log("this.id", this.id);
    this.getProductDetails(this.id);
    //用于判断当前商品是否已经收藏
    this.commodityCollection.forEach(v =>{
      if(this.id == v.goods_id){
        this.ste = v.ste;
      }
    })
     console.log('this.commodityCollection',this.commodityCollection);
  },
  computed: {
   
    ...mapState(["shoppingCart"]),
    // 单个商品详情
    ...mapState(["commodityDetails"]),
    //商品收藏的数据
    ...mapState(["commodityCollection"]),
  },
  methods: {
     // 购物车的数据
    ...mapMutations(["changeData"]),
    // 单个商品详情
    ...mapMutations(["detailsData"]),
     // 单个商品详情数组清空
    ...mapMutations(["detailsDatas"]),
    // 商品收藏的数据
    ...mapMutations(["changeDatas"]),
    //获取商品详情数据
    getProductDetails(id) {
      //开启加载提示
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,

        //延迟自动关闭加载提示，如果该值为0，则不会自动关闭
        duration: 0,
      });
      this.axios({
        method: "GET",
        url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/detail",
        params: {
          goods_id: id,
        },
      })
        .then((result) => {
          this.$toast.clear();
          console.log("resule =>1", result);
          if (result.data.meta.status == 200) {
            result.data.message.count = 1;
            this.productData = result.data.message;

            console.log("this.productData", this.productData);
          }
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("err", err);
        });
    },
    //收藏
    changeicon(){
      this.ste=!this.ste;
      console.log("this.ste",this.ste);
      this.productData.ste = this.ste;
      if(!this.ste){
        console.log('333')
        this.commodityCollection.forEach((v,index) =>{
          if(v.goods_id == this.id){
             this.commodityCollection.splice(index,1);
              console.log('this.commodityCollection',this.commodityCollection)
          }
        })
      }else{
         // console.log("商品收藏的数据",this.productData)
      this.productData.check = false;
      this.changeDatas({key: this.productData})
      console.log('this.commodityCollection',this.commodityCollection)
      }
     
    },
    // 返回上一层
    back() {
      this.$router.go(-1);
    },
    //返回首页
    backs() {
      this.$router.push({ name: "Menu" });
    },
    //成功提示
    tips() {
      this.$toast("加入购物车成功");
      if (this.shoppingCart.length == 0) {
        this.productData.count += this.value-1;
        this.changeData({ key: this.productData });
      } else {
        var result = this.shoppingCart.find((item) => {
          return item.goods_id == this.productData.goods_id;
        });
        if (result == undefined) {
          this.shopcartRows++;
          this.changeData({ key: this.productData });
        } else {
          this.shoppingCart.forEach((v) => {
            if (v.goods_id == result.goods_id) {
              v.count += this.value;
            }
          });
        }
      }
    },
    //跳转到购物车
    linkshopcart() {
      this.$router.push({ name: "Shopcart" });
    },
    //提交订单
    sumbitOrder() {
      console.log("this.productData----", this.productData);
      if(this.commodityDetails.length!=0){
        this.detailsDatas();
      }
      this.productData.count += this.value-1;
      this.productData.identifier = true;
      this.detailsData({src: this.productData})
     console.log("this.commodityDetails",this.commodityDetails);
      this.$router.push({ name: "Pay" });
    },
  },
};
</script>

<style lang="less" scoped>

.product-box {
  margin-top: 3px;
  margin-bottom: 2px;
}
.product-title {
  font-size: 18px;
  color: #4a5a64;
  margin-top: 3px;
}
.product-link {
  width: 60px;
  margin-top: 5px;
  color: white;
  text-align: center;
  font-size: 14px;
  background-color: #b5b5b5;
}
.product-info {
  padding: 5px;
  background-color: white;
}
.product-price {
  font-size: 16px;
  color: #ff053a;
}
.price-txt {
  font-weight: bold;
  font-size: 22px;
}
.product-titles {
  margin-top: 5px;
  color: #b5b5b5;
  font-size: 14px;
}
.product-titles .w {
  width: 33.33%;
}
.prduct-number {
  text-align: center;
}
.prduct-address {
  text-align: right;
}
.promotion-title-box {
  padding: 10px;
  height: 30px;
  background-color: white;
}
.promotion-title {
  font-size: 12px;
  width: 30px;
  color: #b5b5b5;
}
.promotion-box {
  margin-top: 3px;
}
.promotion-box-s {
  margin-left: 5px;
  width: calc(~"100% - 40px");
}
.promotion-title-txt-box .title-one {
  font-size: 12px;
  color: #ff053a;
}
.promotion-title-txt-box .title-tow {
  font-size: 14px;
  color: #1d313d;
  margin-left: 5px;
}
.promotion-img {
  margin-top: 2px;
}
.promotion-c {
  margin-top: 2px;
}
.service-title {
  font-size: 12px;
  width: 30px;
  color: #b5b5b5;
}
.service-title-s {
  margin-left: 5px;
  font-size: 12px;
}
.service-tow {
  margin-left: 14px;
}
.service-box-s {
  width: calc(~"100% - 35px");
}
.addProduct-box {
  background-color: white;
  width: 100%;
  margin-top: 3px;
  height: 40px;
  overflow: hidden;
  position: fixed;
  bottom: 49px;
  z-index: 100;
}
.addProduct-box-s {
  margin-top: 10px;
  padding: 5px;
  padding-top: 0;
  padding-bottom: 0;
}
.addProduct-title {
  width: 60px;
  background-color: #f2963b;
  color: white;
  font-size: 14px;
}
.vhtml{
  padding-bottom: 60px;
}
/deep/ .van-stepper__plus,
/deep/ .van-stepper__minus {
  background-color: #ff053a;
}
/deep/ .van-stepper__minus::before {
  background-color: white;
}
</style>