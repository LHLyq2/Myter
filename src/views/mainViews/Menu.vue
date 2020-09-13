<template>
    <div class="recommend">
        <van-swipe :autoplay="3000" indicator-color="white" style="height: 163.03px;">
                <van-swipe-item v-for="(item,index) in bannerData" :key="index">
                   <img class="auto-img" :src="item.image_src" alt="">
                </van-swipe-item>
        </van-swipe>
        <div class="recommend-list clearfix">
            <div class="recommend-list-box fl" v-for="(item,index) in list" :key="index">
                <div class="list-box clearfix" >
                    <div class="list-img fl">
                        <img class="auto-img" :src="item.url" alt="">
                    </div>
                    <div class="list-txt fl">{{item.title}}</div>
                 </div>
            </div>
        </div>
        <div class="icon clearfix">
            <div class="icon-box fl" v-for="(item,index) in icon" :key="index">
                <div class="icon-items">
                    <div class="icon-img">
                        <img class="auto-img" :src="item.url" alt="">
                    </div>
                    <div class="icon-txt">{{item.title}}</div>
                </div>
            </div>
        </div>
       <div class="icons-info-box">
           <div class="icons-f-items clearfix">
               <div class="icons fl">
                   <img class="auto-img" :src="icons.url" alt="">
               </div>
               <div class="icons-box fl">
                   <div class="icons-one" v-for="(item,index) in icons.iconsInfo" :key="index">
                       <img class="auto-img" :src="item.url" alt="">
                   </div>
               </div>
           </div>
       </div>
       <div class="iconsList-box" v-for="(item,index) in iconlist" :key="index">
           <div class="list-title-box">
               <div class="list-txt">{{item.floor_title.name}}</div>
               <div class="line"></div>
           </div>
           <div class="icons-img-box">
               <!-- <div class="icons-img">
                   <img :src="item.product_list[0].image_src" class="auto-img" alt="">
               </div> -->
               <div class="img-box-none clearfix">
                   <div class="img-one fl" v-for="(items,i) in item.product_list" :key="i">
                       <img class="auto-img" :src="items.image_src" alt="">
                   </div>
                </div>
           </div>
           
       </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                 //banner图
                bannerData: [
                    // "https://fms.res.meizu.com/dms/2020/07/16/611c1b24-6856-4e72-b871-687ce6bce26c.jpg",
                    // "https://fms.res.meizu.com/dms/2020/07/17/7c3e5569-3c31-4cfb-ba7c-d6af0762be4f.jpg",
                    // "https://fms.res.meizu.com/dms/2020/07/17/95355364-6afe-4e02-a3b1-0263a4aea3ac.jpg",
                    // "https://fms.res.meizu.com/dms/2020/07/06/ae6529b6-2817-487f-85ef-bbd12829946e.jpg",
                    // "https://fms.res.meizu.com/dms/2020/07/17/0101554b-f406-4cdd-9a4f-4687e7b61f41.jpg",
                    // "https://fms.res.meizu.com/dms/2020/03/25/9a08f305-0249-44eb-9840-a4f3d93a4ced.jpg",
                    // "https://fms.res.meizu.com/dms/2020/05/08/620554bc-a404-4b50-8c01-1a21dafab9ce.jpg"
                ],

                list:[
                    {
                        url: "https://fms.res.meizu.com/dms/2018/03/30/99f49dfe-25c2-485a-b7b3-8b63d6487b46.png",
                        title: "魅族官方直供"
                    },
                    {
                        url: "https://fms.res.meizu.com/dms/2018/03/30/8f1252b1-3fb2-48e2-b992-1f38a9745314.png",
                        title: "满80免运费"
                    },
                    {
                        url: "https://fms.res.meizu.com/dms/2018/03/30/3924a1e1-5b4a-41de-9e79-ee904ec69d90.png",
                        title: "7 天无理由退货"
                    }
                ],

                icon:[
                    {
                        url: "https://fms.res.meizu.com/dms/2020/07/09/a768f0cc-0ec8-470d-961d-c56b8e3ef773.png",
                        title: "17 嗨一夏"
                    },
                     {
                        url: "https://fms.res.meizu.com/dms/2020/07/02/214acc98-304f-4d7e-96c8-b8a2a192e08f.png",
                        title: "MY+"
                    },
                     {
                        url: "https://fms.res.meizu.com/dms/2020/07/15/83f97275-f0b5-470e-a51f-d592c763afd4.png",
                        title: "17 Pro"
                    },
                     {
                        url: "https://fms.res.meizu.com/dms/2020/06/11/d224034a-f01e-401b-b506-05facf85471a.jpg",
                        title: "mCycle"
                    },
                ],

                icons: {
                        url: "https://fms.res.meizu.com/dms/2020/07/15/6d8265e5-656e-4e8a-aa8c-ccca8c888166.jpg",

                        iconsInfo:[
                                {
                                    url: "https://fms.res.meizu.com/dms/2020/07/15/54c15464-0e17-4d20-a5a0-7c342c05d8ee.jpg"
                                },
                                {
                                    url: "https://fms.res.meizu.com/dms/2020/06/19/14b610c9-6e26-4fcd-9972-9e79cb6d05b9.png"
                                },
                            ]
                   
                },
                //图片列表
                iconlist: []

            }
        },
        created(){
            this.getBanner();
            this.iconList();
        },
        methods :{
           //获取banner数据
           getBanner(){
               //开启加载提示
                this.$toast.loading({
                    message: "加载中...",
                    forbidClick: true,
                    //延迟自动关闭加载提示，如果该值为0，则不会自动关闭
                    duration: 0
                });
                this.axios({
                    method: 'GET',
                    url:'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
                }).then(result =>{
                     this.$toast.clear();
                     console.log('result',result);
                        if(result.data.meta.status == 200){
                            this.bannerData = result.data.message;
                        }
                        // console.log(this.bannerData);
                        //缓存banner数据在vuex中
                        // this.$store.commit('menuModule/changeData', {
                        //   key: 'bannerDataCache',
                        //   value: result.data.result
                        // })
                }).catch(err => {
                     this.$toast.clear();
                     
                })
           },
           //图片列表
           iconList(){
               //开启加载提示
                this.$toast.loading({
                    message: "加载中...",
                    forbidClick: true,
                    //延迟自动关闭加载提示，如果该值为0，则不会自动关闭
                    duration: 0
                });
                this.axios({
                    method: 'GET',
                    url:'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',
                }).then(result =>{
                     this.$toast.clear();
                    //  console.log('result ==>2',result);
                        if(result.data.meta.status == 200){
                            //删除数组中的最后一位只获取4四张图片
                            result.data.message.forEach(v =>{
                                console.log('v',v);
                                v.product_list.shift();
                            })
                            this.iconlist = result.data.message;
                        }
                        console.log('this.iconlist',this.iconlist)
                        //缓存banner数据在vuex中
                        // this.$store.commit('menuModule/changeData', {
                        //   key: 'bannerDataCache',
                        //   value: result.data.result
                        // })
                }).catch(err => {
                     this.$toast.clear();
                     
                })
           }
        }
        
    }
</script>

<style lang="less" scoped>
.recommend-list-box{
    width: 33.33%;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: #F7F7F7;
    padding-left: 10px;
    box-sizing: border-box;
}
.list-box{
    box-sizing: border-box;
    width: 110px;
    height: 25px;
    line-height: 25px;
    color: #999999;
    
}
.list-img{
    height: 16px;
    width: 20px;
    border-radius: 50%;
    background-color:#F7F7F7;
    margin-top: 3px;
}
.list-img img{
    background: #999;
    border-radius: 50%;
}
.list-txt{
    margin-left: 6px;
}
.img{
    border: 0;
        
}
.icon-box{
    width: 25%;
    box-sizing: border-box;
    padding: 10px;
    background-color: white;
    padding-left: 15px;
}
.icon-items{
   
}
.icon-img{
    width: 60px;
    height: 60px;
    margin-bottom: 10px;
}
.iconsList-box{
    margin-bottom: 20px;
}
.icon-txt{
    margin-left: -10px;
    width: 60;
    text-align: center;
}
.icons-info-box{
    margin-top: 10px;
}
.icons{
    height: 187px;
    width: 50%;
    background-color: skyblue;
}
.icons img{
    height: 187px;
}
.icons-box{
    height: 187px;
    width: 50%;
    background-color: skyblue;
}
.icons-one img{
    height: 100%;
}
.icons-one{
    height: 49.5%;
    background-color: springgreen;
}
.list-title-box{
    width: 60px;

}
.list-title-box{
    width: 80px;
    height: 40px;
    
    margin: 0 auto;
    line-height: 40px;
    margin-top: 30px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
}
.line{
    width: 20px;
    height: 6px;
    margin: 0 auto;
    background-color: #008CFF;
}
.icons-img-box{
    margin-top: 20px;
}
 .icons-img-box .icons-img{
    width: 100%;
 }
 .icons-img-box .icons-img img{
    
 }
 .img-one{
     width: 49%;
     margin-bottom: 3px;
}
 .img-one:nth-child(odd){
     margin-right: 2%;
 }
</style>