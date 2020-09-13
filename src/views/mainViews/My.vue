<template>
    <div class="my">
        <div class="my-box">
            <div class="my-bg" :style="{backgroundImage:'url('+userInfo.userBg+')'}">
                <div class="bg-txt">
                    <div class="fr beg">更换背景</div>
                    <van-uploader class="uploader-box" :after-read="afterRead" />
                </div>
                <div class="clearfix">
                    <div class="my-img fl">
                    <img class="auto-img sd" :src="userInfo.userImg" alt="">
                    </div>
                    <div class="ename fl">vip{{userInfo.vip==0?0:userInfo.vip}}</div>

                </div>
                <div class="signature">
                    签名：{{userInfo.desc=="undefined" ?'世界上本没有路，走的人多了便成了路 --噬神者':userInfo.desc}}
                </div>
            </div>
           <van-cell-group>
                <van-cell :title="item.title" is-link v-for="(item,index) in list" :key="index" @click="skip(item.usname)"/>
            </van-cell-group>
            <div v-if="istr">
                <div class="btns" @click="changes">登录</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
 return {
                istr:false,
                list: [
                    {
                        title:'账号管理',
                        usname:'Account'
                    },
                    {
                        title:'我的地址',
                         usname:'MyAddress'
                    },
                    {
                        title:'我的购物车',
                         usname: 'Shopcart'
                    },
                    {
                        title:'商品收藏',
                        usname:'Myfollow'
                    },
                    {
                        title:'安全中心',
                        usname:'Mycollection'
                    },
                ],
                userInfo: {}
            }
        },
        created(){
            this.getUserInfo()
            //判断是否登录
            if(!localStorage.getItem('__TK')){
                this.istr=true;
                this.$toast("请登录或注册");
            }
        },
        methods: {
            //获取用户信息
            getUserInfo(){
                let tokenString=localStorage.getItem('__TK');
                this.axios({
                    url: '/findMy',
                    method: 'GET',
                    params: {
                        appkey: this.appkey,
                        tokenString
                    }
                    }).then(result =>{
                         console.log('result',result)
                        if(result.data.code == "A001"){
                            this.userInfo=result.data.result[0];
                        //  this.userInfo.push(result.data.result[0])
                        }
                         
                    }).catch(err =>{
                         
                    })
            },
            //获取base64的照片
            afterRead(file){
                 

                //获取base64码
                let base = file.content.replace(/^data:image\/[A-Za-z]+;base64,/, '');
                 
                //获取图片类型
                let imgType=file.file.type.slice(6,);
                 

                let tokenString = localStorage.getItem("__TK");

                  this.$toast.loading({
                    message: '加载中',
                    forbidClick: true,
                    duration: 0
                })
                this.axios({
                    url: '/updateUserBg',
                    method: 'POST',
                    data:{
                        appkey: this.appkey,
                        tokenString,
                        imgType,
                       serverBase64Img:base
                    }
                }).then(result =>{
                     this.$toast.clear();
                     
                    if(result.data.code == "I001"){
                        this.userInfo.userBg=result.data.userBg;
                         
                    }
                }).catch(err=>{
                     
                })
            },
            skip(name){
                 this.$router.push({name});
            },
            changes(){
                this.$router.push({name:'Login'})
            }
        }
        
    }
</script>

<style lang="less" scoped>
.my-bg{
    padding: 20px 10px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    color: white;
}
.my-img{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-image: repeating-radial-gradient(red,skyblue);
}
.sd{
    width: 60px;
    height: 60px;
    border-radius: 50%;
}
.bg-txt{
     height: 30px;
     line-height: 30px;
    
}
.ename{
    line-height: 60px;
    font-size: 14px;
    margin-left: 10px;
}
.signature{
    text-align: center;
    height: 30px;
    line-height: 30px;
    text-indent: 2.5em;
}
.beg{
    position: relative;
}
.uploader-box{
    widows: 100%;
    position: absolute;
    right: 0px;
    top: 0;
    height: 30px;
    overflow: hidden;
    opacity: 0;
   
}
/deep/ .van-uploader__input{
     widows: 100%;
    position: absolute;
    right: 0px;
    top: 0;
    height: 30px;
}
.btns{
    height: 30px;
    background-color: white;
    text-align: center;
    font-size: 16px;
    line-height: 30px;
}
</style>