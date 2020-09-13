<template>
    <div class="detaillist-box">
        <div class="product-box clearfix">
            <div class="product fl" v-for="(item,index) in productlist" :key="index" @click="goDetaillist(item.goods_id)">
               <div class="product-content">
                   <div class="product-img">
                       <img class="auto-img" :src="item.goods_big_logo" alt="">
                   </div>
                   <div class="product-name one-text">
                       {{item.goods_name}}
                   </div>
                   <div class="product-price">￥{{item.goods_price}}</div>
               </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                id:"",
                //商品数据
                productlist:[]
            }
        },
        created(){
              //截取查询参数
            this.id=(this.$route.query.id).toString();
            console.log(typeof(this.id))
            this.getProductlist(this.id);
            console.log("this.id",this.id);
        },
        methods:{
            getProductlist(id){
                //开启加载提示
                this.$toast.loading({
                    message: "加载中...",
                    forbidClick: true,

                    //延迟自动关闭加载提示，如果该值为0，则不会自动关闭
                    duration: 0
                });
                this.axios({
                    method: 'GET',
                    url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',
                    params: {
                        cid: id
                    }

                }).then(resule =>{
                    this.$toast.clear();
                    let arr = [];
                    console.log('resule =>1',resule);
                    if(resule.data.meta.status == 200){
                        resule.data.message.goods.forEach(v =>{
                            if(v.goods_big_logo!=""){
                                arr.push(v);
                            }
                        })
                        console.log("arr",arr);
                        this.productlist = arr;
                        console.log('this.productlist',this.productlist)
                    }
                }).catch(err =>{
                    this.$toast.clear();
                    console.log('err',err);
                })
            },
            // 商品唯一值商品id goods_id
            goDetaillist(goods_id){
                console.log('goods_id',goods_id);
                this.$router.push({name: 'Detail',query: {goods_id}})
            }
        }
    }
</script>

<style lang="less" scoped>
.detaillist-box{
    padding: 15px;
}
.product{
    width: 49.5%;
    height: 220px;
    padding: 15px;
    padding-top: 10px;
    box-sizing: border-box;
    background-color: white;
    margin-bottom: 3px;
}
.product:nth-child(odd){
     margin-right: 1%;
}
.product-content{
    
}
.product-img{
    height: 140px;
    
}
.product-name{
    margin-top: 5px;
    font-size: 12px;
    color: #767676;
    height: 32px;
}
.product-price{
    height: 20px;
    font-size: 16px;
    color: #FF5276;
    margin-top: 5px;
    line-height: 20px;
}
</style>