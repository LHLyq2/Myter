<template>
  <div class="order">
    <van-tabs v-model="activeName"  color="#1989FA" 
        line-height="2" title-active-color="#1989FA">
      <van-tab
        :title="item.title"
        :name="item.name"
        v-for="(item,index) in DetailsPage"
        :key="index"
       
      >
         <div class="order-content">
            <div class="order-item">
                
                <div class="order-item-title clearfix">
                    <div class="fl order-no">3</div>
                    <div class="fr" v-show="false">
                        <span class="confirm">已收货</span>
                        <span class="delete">
                            <!-- <van-icon class="delete-icon" name="delete" /> -->
                            <van-icon name="delete" class="deletes"/>
                        </span>
                    </div>
                    <div class="fr">
                        <span class="confirm">确认收货</span>
                        <span class="delete">
                            <!-- <van-icon class="delete-icon" name="delete" /> -->
                            <van-icon name="delete" class="deletes"/>
                        </span>
                    </div>
                </div>

                <div class="items clearfix">
                     <div class="order-img fl">
                         <img class="auto-img" src="" alt="">
                    </div>
                    <div class="fl clearfix commodity-item">
                        <div class="commodity-info fl">
                            <div class="commodity">
                                <div class="commodity-name">4</div>
                                 <div class="commodity-ename">5</div>
                            </div>
                              <div class="rule">6</div>
                        </div>
                        <div class="fr">
                            <div class="price">￥1344</div>
                             <div class="count">x55555</div>
                        </div>
                      
                    </div>
                </div>
                <div class="order-total">
                    <div class="fr clearfix">
                        <span class="total-count">共计444件商品 合计：</span>
                        <span class="total-price">￥66666</span>
                    </div>
                </div>
            </div>
        </div>
        </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
const {mapState, mapMutations} = createNamespacedHelpers('menuModule')
export default {
  data() {
    return {
      activeName: "0",
      DetailsPage: [
        {
          title: "全部",
          name: "0",
        },
        {
          title: "待收货",
          name: "1",
        },
        {
          title: "已收货",
          name: "2",
        },
      ],
      // 订单的所有数据
    orderShoop: []
    };
  },
  computed: {
     // 商品订单的数据
      ...mapState(['orderCollection'])
  },
  created(){
    this.orderShoop =this.orderCollection;
    console.log(this.orderShoop);

  },
  methods: {
    // 获取订单商品
    getOrderPorduct() {
      let 
    }
  }

};
</script>

<style lang="less" scoped>
    .order-content{
        padding: 10px;
         box-sizing: border-box;
        
    }
    .commodity-ename{
        color: #999;
    }
    .order-item{
         background-color: #fff;
         padding: 20px;
         border-radius: 10px;
    }
    .order-img{
        width: 60px;
        height: 60px;
        background-color: yellow;
    }
    .commodity-item{
         width: calc(~"100% - 70px");
    }
    .commodity-info{
        margin-left: 10px;
    }
    .commodity{
        height: 40px;
    }
    .commodity-name{
        font-size: 14px;
        font-weight: bold;
    }
    .rule{
        height: 20px;
        line-height: 20px;
        color: #999;

    }
    .price{
        height: 40px;
        color: #999;
        text-align: right;
    }
    .count{
        height: 20px;
        text-align: right;
        line-height: 20px;
        color: #999;
    }
    .items{
        margin-bottom: 10px;
    }
    .order-total{
        margin-top: 20px;
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #e8e8e8;
    }
    .total-count{
        font-size: 12px;
        color: #999;
    }
    .total-price{
        font-weight: bold;
        font-size: 16px;
    }
.order-item-title{
    height: 20px;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #e8e8e8;
  }
  .order-no{
    color: #999;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
  }

  .confirm{
    color: #666;
    font-size: 14px;
    margin-right: 10px;
  }

  .delete{
    font-size: 18px;
    line-height: 20px;
    color: #666;
    margin-left: 10px;
    padding-top: 1px;
    position: relative;
  }
  .deletes{
      position: absolute;
      top: 3px;
      right: -5px;
  }
  .order-item{
    margin-bottom: 10px;
  }
</style>