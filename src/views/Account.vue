<template>
    <div class="account">
        <van-nav-bar title="账号管理" left-text="返回" left-arrow @click-left="back"/>
        <div class="account-box">
                <van-cell title="单元格" :center="true" value="内容" >
                <div class="headerImg fr">
                  <img class="auto-img sd" :src="userInfo.userImg" alt />
                    <!-- <van-uploader class="upload-box" :after-read="afterRead" /> -->
                     <van-uploader class="uploader-box" :after-read="afterRead" />
                </div>
                </van-cell>
            <van-cell title="用户id" :value="userInfo.userId" />
            <van-cell title="手机号" :value="userInfo.phone" />
            <van-cell title="昵称" :value="userInfo.nickName" />
             <van-cell title="简介">  
                 <div class="brief fr">
                     <textarea class="brief-box" v-model="userInfo.desc" @change="getbriefInfo"></textarea>
                 </div>
             </van-cell>
        </div>
    </div>
</template>
    
<script>
    export default {
        data(){
            return {
                brieftxt: '',
                userInfo: {},
            }
        },
        created(){
            this. getUserInfo();
        },
        methods: {
          //获取用户信息
            getUserInfo(){
                let tokenString=localStorage.getItem('__TK');
                this.axios({
                    url: '/findAccountInfo',
                    method: 'GET',
                    params: {
                        appkey: this.appkey,
                        tokenString
                    }
                    }).then(result =>{
                         
                        if(result.data.code == "B001"){
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
                    url: '/updateAvatar',
                    method: 'POST',
                    data:{
                        appkey: this.appkey,
                        tokenString,
                        imgType,
                       serverBase64Img:base
                    }
                }).then(result =>{
                     this.$toast.clear();
                     
                    if(result.data.code == "H001"){
                        this.userInfo.userImg=result.data.userImg;
                         
                    }
                }).catch(err=>{
                     
                })
            },
            // 修改简介
            getbriefInfo(){
                let tokenString=localStorage.getItem('__TK');
                let desc=this.userInfo.desc;
                this.axios({
                    url: '/updateDesc',
                    method: 'POST',
                    data: {
                        appkey: this.appkey,
                        tokenString,
                        desc
                    }
                    }).then(result =>{
                         
                    }).catch(err =>{
                         
                    })
            },
              back(){
            this.$router.go(-1);
        },
        }

    }
</script>

<style lang="less" scoped>
.account{
    width: 100%;
    height: 667px;
    background-color: white;
    .headerImg{
        width: 60px;
        height: 60px;
        position: relative;
        background-color: gainsboro;
    }
    .sd{
        width: 60px;
        height: 60px;
    }
    .brief-box{
       outline: none;
       border: none;
    }
    .uploader-box{
        position: absolute;
        left: 0;
        top: 0px;
        opacity: 0;
        overflow: hidden;
    }
}
</style>