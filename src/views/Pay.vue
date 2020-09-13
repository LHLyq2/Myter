<template>
    <div class="order">
        <van-nav-bar title="提交订单" left-text="返回" left-arrow @click-left="back" />
        <div class="order-box">
            <div class="addresss" @click="change">{{userAddress.address}}</div>
        </div>
        <div class="order-content">
            <div class="order-item">
                <div class="items clearfix" v-for="(item,index) in commodityData" :key="index">
                     <div class="order-img fl">
                         <img class="auto-img" :src="item.pics[0].pics_big" alt="">
                    </div>
                    <div class="fl clearfix commodity-item">
                        <div class="commodity-info fl">
                            <div class="commodity">
                                <div class="commodity-name">{{item.goods_name}}</div>
                                 <div class="commodity-ename">{{item.enname}}</div>
                            </div>
                              <div class="rule"></div>
                        </div>
                        <div class="fr">
                            <div class="price">￥{{item.goods_price}}</div>
                             <div class="count">x{{item.count}}</div>
                        </div>
                      
                    </div>
                </div>
                <div class="order-total">
                    <div class="fr clearfix">
                        <span class="total-count">共计{{counts}}件商品 合计：</span>
                        <span class="total-price">￥{{total}}</span>
                    </div>
                </div>
            </div>
        </div>
        <van-submit-bar :price="total*100" button-text="立即购买" button-type="info" @submit="commit"/>
         <van-popup class="popup" v-model="isOpen" closeable position="bottom">
            <van-address-list v-model="aid" :list="addressList" default-tag-text="默认" @select="selectAddress" @add="tioazhuang" @edit="editAddress"/>
        </van-popup>
    </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
const {mapState, mapMutations} = createNamespacedHelpers('menuModule')
    export default {
        data(){
            return {
                isOpen:false,
                aid: 1,
                addressList: [],
                userAddress: {
                address: '请选择收货地址',
                phone: '',
                receiver: '',
                //接收购物数据
                commodityData: []
              },
                sids:'',
                orderData: [],
                //商品总数量
                counts: 0,

                //总金额
                total: 0,
            }
        },
        created(){
            console.log("shoppingCart",this.shoppingCart);
          

            this.initialization();
            this.totalCommodity();

        //    //截取查询参数sids
        //     this.sids = this.$route.query.sids.split('-');
            
             
        //     this.getPayOrderData(this.sids)
             this.getAddressData() 
            },
        computed: {
            // 购物车数据
            ...mapState(['shoppingCart']),
            //单个商品详情的页面数据
            ...mapState(['commodityDetails']),
            // 商品订单的数据
             ...mapState(['orderCollection'])
        },
            
        methods:{
            ...mapMutations(['shoopData']),
            ...mapMutations(["shoopDatas"]),
            ...mapMutations(["orderShoop"]),
            //初始化赋值给数组
            initialization(){
                if(this.commodityDetails.length!=0){
                    this.commodityData=this.commodityDetails
                }else{
                    var arr= [];
                    this.shoppingCart.forEach((v,index) =>{
                        console.log("v",v);
                        if(v.is_promote){
                            arr.push(v)
                        }
                    })
                      this.commodityData=arr;
                }
            },
            change(){
                this.isOpen=true;
            },
           //获取地址数据
                getAddressData() {

                let tokenString = localStorage.getItem('__TK');

                this.$toast.loading({
                    message: '加载中...',
                    forbidClick: true,
                    duration: 0
                })

                this.axios({
                    method: 'GET',
                    url: '/findAddress',
                    params: {
                    appkey: this.appkey,
                    tokenString
                    }
                }).then(result => {
                    this.$toast.clear();
                    
                    if (result.data.code == 20000) {
                        console.log(' result.data.result', result.data.result)
                    result.data.result.forEach(v => {
                        let currentAddress = {
                        id: v.aid,
                        tel: v.tel,
                        name: v.name,
                        address: v.province + v.city + v.county + v.addressDetail,
                        isDefault: Boolean(v.isDefault)
                        };

                        //默认选择默认地址
                        if (v.isDefault) {
                        this.aid = v.aid;

                        //如果存在默认地址，则默认选择默认地址
                        this.userAddress.address = currentAddress.address;
                        }
                        
                        this.addressList.push(currentAddress);
                    })
                    }
                }).catch(err => {
                    this.$toast.clear();
                    
                })
                },
             //获取提交订单数据
             getPayOrderData(sids) {
                let tokenString = localStorage.getItem('__TK');

                this.$toast.loading({
                    message: '加载中...',
                    forbidClick: true,
                    duration: 0
                })

                this.axios({
                    method: 'GET',
                    url: '/commitShopcart',
                    params: {
                    appkey: this.appkey,
                    tokenString,
                    sids: JSON.stringify(sids)
                    }
                }).then(result => {
                    this.$toast.clear();
                     
                    if(result.data.code == 50000){
                        result.data.result.forEach(v=>{
                            this.counts+=v.count;
                            this.total+=v.price*v.count;
                        })
                        this.orderData=result.data.result
                    }
                     
                }).catch(err =>{
                    this.$toast.clear();
                     
                })
             },
             //选择地址
             selectAddress(item){
                  
                  this.isOpen = false;
                   this.userAddress = {
                    address: item.address,
                    phone: item.tel,
                    receiver: item.name
                }
             },
             commit(){
                 if(this.userAddress.address=='请选择收货地址'){
                     this.$toast('请选择收货地址');
                     return;
                 }
                  this.orderShoop({key: this.commodityData})
                 console.log(' this.orderCollection', this.orderCollection);
                  console.log('22222');
                 this.commodityData.length=0;
                 
                //  console.log('this.shoppingCart.find()',this.shoppingCart);
                 var ret = this.shoppingCart.find(items =>{
                    return !items.is_promote;
                 })
                 if(ret!=undefined){
                     this.shoopData(ret);
                 }else{
                     this.shoopDatas();
                 }
                //  console.log(' this.commodityData', this.commodityData);
               
                 this.$router.push({name: 'Menu'});
                //  let tokenString = localStorage.getItem('__TK');

                // this.$toast.loading({
                //     message: '加载中...',
                //     forbidClick: true,
                //     duration: 0
                // })
                
                //  this.axios({
                //     method: 'POST',
                //     url: '/pay',
                //     data: {
                //     appkey: this.appkey,
                //     tokenString,
                //     sids: JSON.stringify(this.sids),
                //     phone: this.userAddress.phone,
                //     address: this.userAddress.address,
                //     receiver: this.userAddress.receiver
                //     }
                // }).then(result => {
                //     this.$toast.clear();
                //    if (result.data.code === 60000) {
                //     this.$router.push({name: 'Order'});
                //     }
                // }).catch(err => {
                //     this.$toast.clear();
                     
                // })
            },
            //点击地址编辑
            editAddress(item){
                let item_id = item.id;
                console.log('item',item);
                console.log('this.addressList',this.addressList)
                this.$router.push({name: 'Address',params:{item_id}})
            },
              back(){
            this.$router.go(-1);
            },
            tioazhuang(){
                this.$router.push({name:'Address'});
            },
            //共计几件商品
            totalCommodity(){
                for(let key in this.commodityData){
                    console.log(" this.commodityData[key]",this.commodityData[key])
                    this.counts += this.commodityData[key].count
                    this.total += this.commodityData[key].count*this.commodityData[key].goods_price;
                    console.log(4455567)
                }
                // this.commodityData.forEach(v =>{
                //     console.log(v);
                //     this.counts += v.count
                //     this.total += v.count*v.goods_price;
                // })
                console.log(this.counts);
            }
        }
    }
</script>

<style lang="less" scoped>
.order{
    .order-box{
        padding: 10px;
    }
    .addresss{
        height: 40px;
        line-height: 40px;
        background-color: #fff;
        border-radius: 10px;
        text-indent: 1em;
    }
    .order-content{
        padding: 10px;
         box-sizing: border-box;
        
    }
    .commodity-ename{
        color: #999;
    }
    .order-item{
         background-color: #fff;
         padding: 10px;
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
    .popup{
        min-height: 300px;
        max-width: 580px;
        overflow-y: auto;
     }
}
</style>