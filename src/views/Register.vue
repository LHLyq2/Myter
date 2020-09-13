<template>
    <div class="register">
          <div>
            <van-nav-bar
                title="注册"
                left-text="登录"
                right-text="关闭"
                 @click-left="goPage('Login')"
            />
        </div>
        <div class="box">
            <div class="login">
            <img class="aout-img" src="../assets/images/fupo.jpg" alt="">
        </div>
        </div>
       
        <div>
            <van-form>
                <van-field
                    name="手机"
                    label="手机号"
                    placeholder="输入11位手机号"
                    left-icon="phone-o"
                    maxlength="11"
                     v-model="userInfo.phone"
                >
                <!-- 自定义右边图标 -->
                <template v-slot:right-icon>
                    <i class="fa fa-camera-retro fa-lg"></i>
                </template>
                </van-field>
                <van-field
                    name="用户名"
                    label="用户名"
                    placeholder="字母数字_组合(1-10位)"
                    left-icon="contact"
                    maxlength="10"
                    v-model="userInfo.nickName"
                />
                <van-field
                    :type="filg?'password':'text'"
                    name="密码"
                    label="密码"
                    placeholder="字母数字_组合(6-16位)"
                    left-icon='lock'
                    maxlength="16"
                    :right-icon="filg?'closed-eye':'eye-o'"
                    @click-right-icon="change"
                    v-model="userInfo.password"
                />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit" @click='register'>
                    注册
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
//导入验证表单模块v
import validForm from '../assets/js/validForm'
    export default {
        data(){
            return {
                filg:true,
                //用户注册信息
                userInfo: {
                    phone: '',
                    nickName: '',
                    password: ''
                },
            }
        },
        methods:{
            //跳转到登录页面
            goPage(name){
                this.$router.push({name});
            },
            change(){
                this.filg=!this.filg;
            },
             //注册
             register() {
                 console.log(444);
                 if(validForm.validUserForm(this.userInfo)){
                     //复制对象
                    let data = Object.assign({}, this.userInfo);
                     //请求密钥
                    data.appkey = this.appkey;

                    //开启加载提示
                    this.$toast.loading({
                        message: '加载中...',
                        forbidClick: true,
                        //延迟自动关闭加载提示，如果该值为0，则不会自动关闭
                        duration:0
                    });

                    //发起注册请求
                    this.axios({
                        method: 'POST',
                        url: '/register',
                        //post传递参数需要写在data
                        data
                   }).then(result => {
                       console.log(result)
                       //关闭加载提示
                        this.$toast.clear();
                         
                        if(result.data.code==100){
                            this.$router.push('Login');
                        }else{
                             this.$toast(result.data.msg);
                        }
                    }).catch(err => {
                        //关闭加载提示
                        this.$toast.clear();
                         
                    })
                 }
             }
        }
    }
</script>

<style lang="less" scoped>
.register{
  
    background-color: white;
}
/deep/ .van-icon{
    font-size: 20px;
}
.login{
    width: 240px;
    height: 240px;
    margin: 50px auto;
}
</style>