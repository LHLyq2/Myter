<template>
    <div class="mycoll">
         <van-nav-bar title="安全中心" left-text="返回" right-text="退出登录"  left-arrow @click-left="back" @click-right="signLogin"/>
         <div class="mycoll-box">
             <div class="password w"  @click="openPoup">
             修改密码
            </div>
            <div class="account w" @click="logaccount">
                注销账号
            </div>
         </div>
         <van-popup v-model="isChenk" position="bottom" class="popup">
             <div class="popup-box">
                 <div class="password-box">
                     修改密码
                 </div>
                <van-form @submit="commit">
                <van-field
                    v-model="pwd.oldPassword"
                    label="旧密码"
                    placeholder="字母数字_组合(6-16位)"
                     maxlength="16"
                />
                <van-field
                    v-model="pwd.passwords"
                    type="text"
                    label="新密码"
                     maxlength="16"
                    placeholder="字母数字_组合(6-16位)"
                />
                <div class="btn-box">
                    <van-button round block type="info" native-type="submit">提交</van-button>
                </div>
                </van-form>
            </div>
        </van-popup>
       
    </div>
</template>

<script>
import validForm from '../assets/js/validForm'
    export default {
        data(){
            return {
                isChenk:false,
                pwd:{
                    oldPassword:'',
                    passwords:''
                }
                
            }
        },
        methods :{
            // 返回上一层
            back(){
                this.$router.go(-1);
            },
            // 点击后弹出弹窗
            openPoup(){
                this.isChenk=true;
            },
            //提交修改以后的密码
            commit() {

                if (!validForm.validUserForm(this.pwd)) {
                    return;
                }

                let tokenString = localStorage.getItem("__TK");

                this.$toast.loading({
                    message: "加载中...",
                    forbidClick: true,
                    duration: 0
                });

                this.axios({
                    method: "POST",
                    url: "/updatePassword",
                    data: {
                    appkey: this.appkey,
                    tokenString,
                    //新密码
                    password: this.pwd.passwords,
                    //旧密码
                    oldPassword: this.pwd.oldPassword
                    }
                })
                    .then(result => {
                    this.$toast.clear();
                     
                    //关闭修改密码弹出框
                    this.isChenk = false;
                    //  清除密码框
                    this.pwd.oldPassword='';
                    this.pwd.passwords='';
                    if (result.data.code == 'E001') {
                        //清除token
                        localStorage.removeItem('__TK');
                        this.$router.push({name: 'Login'});
                    } else {
                        this.$toast(result.data.msg);
                    }
                    
                    })
                    .catch(err => {
                    this.$toast.clear();
                     
                    });
            },
            //退出登录并返回到登录页面
            signLogin() {
                localStorage.removeItem("__TK");
                this.$router.push({ name: "Login" });
            },
            //注销账号
            logaccount() {
                this.$dialog
                    .confirm({
                    title: "注销账号",
                    message: "一旦注销，数据无法恢复"
                    })
                    .then(() => {
                    //如果确定则会执行这里的代码注销账号密码
                    
                    let tokenString = localStorage.getItem("__TK");

                    this.$toast.loading({
                        message: "加载中...",
                        forbidClick: true,
                        duration: 0
                    });

                    this.axios({
                        method: "POST",
                        url: "/destroyAccount",
                        data: {
                        appkey: this.appkey,
                        tokenString
                        }
                    })
                        .then(result => {
                        this.$toast.clear();
                        

                        if (result.data.code == 'G001') {
                            //清除token
                            localStorage.removeItem('__Tk');
                            this.$router.push({name: 'Login'});
                        } else {
                            this.$toast(result.data.msg);
                        }
                        })
                        .catch(err => {
                        this.$toast.clear();
                        
                        });
                    })
                    .catch(err => {
                         
                    });
            }

        }
    }
</script>

<style lang="less" scoped>
mycoll-box{
    padding: 0 10px
}
.w{
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: white;
    margin-top: 30px;
    font-size: 16px;
}
.popup{
   height: 500px;
}
.password-box{
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 18px;
}
.popup-box{
    padding: 10px;
}
</style>