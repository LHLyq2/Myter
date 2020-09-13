<template>
  <div class="shopcart">
    <!-- 如果购物车没有数据，则显示空页面 -->
    <div v-if="shoppingCart.length==0">
      <van-empty description="购物车空空如也，逛一逛" />
    </div>
    <div v-else>
      <van-nav-bar @click-right="manage" :right-text="isManage ? '管理' : '完成'" />

      <!-- 商品列表 -->
      <div class="list" v-for="(item,index) in shoppingCart" :key="index">
        <van-swipe-cell class="list-items">
          <div class="list-item clearfix">
            <!-- 单选框 -->
            <div class="fl checkbox-item">
              <van-checkbox v-model="item.is_promote" shape="round" @change="simpleSelect" />
            </div>
            <!-- 商品信息 -->
            <div class="fl product-info clearfix">
              <div class="product-img fl">
                <img class="auto-img" :src="item.pics[0].pics_big" alt />
              </div>
              <div class="fl product-content">
                <div class="product-text">
                  <div class="clearfix product-name">
                    <span class="product-title fl one-text">{{item.goods_name}}</span>
                    <span class="fl product-rule"></span>
                  </div>
                </div>

                <div class="product-price">
                  <div class="price fl">￥{{item.goods_price}}</div>
                  <div class="fr product-count">
                    <van-stepper
                      v-model="item.count"
                      :integer="true"
                      theme="round"
                      button-size="22"
                      disable-input
                      @change="modifyCount()"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <template #right class="template">
            <van-button square type="danger" text="删除" @click="removeShopcart(index)" />
          </template>
        </van-swipe-cell>
      </div>

      <!-- 提交订单 -->
      <div v-if="isManage">
        <van-submit-bar
          class="submit-bar"
          :price="total"
          :disabled="isNotHasCheck"
          @submit="sumbitOrder"
          button-text="提交订单"
          button-type="info"
        >
          <van-checkbox v-model="allCheck" @click="allSelect">全选</van-checkbox>
        </van-submit-bar>
      </div>
      <div v-else>
        <van-submit-bar
          class="submit-bar submit-bar-delete"
          :disabled="isNotHasCheck"
          button-text="删除选择"
          button-type="info"
          @submit="removeMoreShopcart"
        >
          <van-checkbox v-model="allCheck" @click="allSelect">全选</van-checkbox>
        </van-submit-bar>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("menuModule");
export default {
  data() {
    return {
      isManage: true,
      allCheck: false,
      isHas: false,
      a: false,
      b: false,
      isNotHasCheck: true,

      shopcartData: [],

      allShopcartData: [],

      // 每次加载8条数据
      loadCount: 8,

      //总金额
      total: 0,
    };
  },
  created() {
    console.log(this.shoppingCart);
    this.allCheck = false;
    this.isNotHasCheck = true;
    this.allCheck = false;
    for (let i = 0; i < this.shoppingCart.length; i++) {
      if (this.shoppingCart[i].is_promote) {
        this.shoppingCart[i].is_promote = false;
      }
    }
  },
  computed: {
    ...mapState(["shoppingCart"]),
    ...mapState(["commodityDetails"]),
  },
  methods: {
    ...mapMutations(["detailsDatas"]),
    //  删除当前的
    removeShopcart(index) {
      this.shoppingCart.splice(index, 1);
    },
    //改变删除和提交订单的状态
    manage() {
      this.isManage = !this.isManage;
    },
    //点击全选后
    allSelect() {
      this.shoppingCart.forEach((v) => {
        console.log("v", v);
        v.is_promote = this.allCheck;
      });
      this.sum();
      //禁用
      this.isNotHasCheck = !this.allCheck;
    },
    //  点击单选后
    simpleSelect() {
      this.sum();
      this.isNotHasCheck = true;
      for (let i = 0; i < this.shoppingCart.length; i++) {
        if (this.shoppingCart[i].is_promote) {
          this.isNotHasCheck = false;
        }
      }

      for (let i = 0; i < this.shoppingCart.length; i++) {
        if (!this.shoppingCart[i].is_promote) {
          this.allCheck = false;
          return;
        }
      }

      this.allCheck = true;
    },
    //计算总金额
    sum() {
      this.total = 0;
      this.shoppingCart.forEach((v) => {
        if (v.is_promote) {
          this.total += v.count * v.goods_price * 100;
        }
      });
    },
    modifyCount() {
      this.sum();
    },
    // 删除多个购物车商品
    removeMoreShopcart() {
      var r = this.shoppingCart.filter(function (item) {
        return item.is_promote == false;
      });
      this.shoppingCart.length = 0;
      this.shoppingCart.push(...r);
    },
    //提交订单
    sumbitOrder() {
      if (this.commodityDetails.length != 0) {
        this.detailsDatas();
      }
      this.$router.push({ name: "Pay" });
    },
  },
};
</script>

<style lang="less" scoped>
.shopcart {
  padding-bottom: 50px;
  .list {
    background-color: #fff;
  }
  .list-item {
    padding: 10px;
  }
  .checkbox-item {
    width: 20px;
    height: 20px;
    margin-top: 30px;
  }
  .list-items:not(:last-child) {
    border-bottom: 1px solid #e8e8e8;
  }
  /deep/ .list-items .van-button {
    height: 100%;
  }

  .product-info {
    width: calc(~"100% - 30px");
    margin-left: 10px;
  }

  .product-img {
    width: 80px;
    height: 80px;
    background-color: #000;
  }
  .product-content {
    width: calc(~"100% - 90px");
    height: 80px;
    margin-left: 10px;
  }
  .product-title {
    margin-right: 10px;
    font-size: 16px;
    color: #444;
  }
  .product-rule {
    font-size: 12px;
    color: #666;
    line-height: 24px;
  }
  .product-enname {
    font-size: 10px;
    color: #666;
    height: 20px;
  }
  .product-name {
    height: 30px;
  }
  .product-text {
    height: 50px;
  }
  .product-price {
    height: 30px;
  }
  .price {
    color: #1989fa;
    font-size: 16px;
    line-height: 30px;
  }

  /deep/ .van-stepper__minus {
    color: #1989fa;
    border-color: #1989fa;
  }

  /deep/ .van-stepper__plus {
    background-color: #1989fa;
  }
  .product-count {
    margin-top: 4px;
  }

  /deep/ .submit-bar {
    bottom: 50px;
  }

  /deep/ .van-submit-bar__price {
    color: #1989fa;
  }

  /deep/ .submit-bar-delete .van-button {
    margin-left: auto;
  }
}
</style>