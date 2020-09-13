<template>
    <div class="register">
          <div>
            <van-nav-bar
                title="登录"
                left-text="注册"
                right-text="关闭"
               @click-left="goPage('Register')"
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
                    立即登录
                    </van-button>
                    <div class="btn">
                        <span class="fr" @click="getPassword">忘记密码？</span>
                    </div>
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
                //:true 闭合，false：睁开
                filg:true,
                //用户注册信息
                userInfo: {
                    phone: '',
                    password: ''
                },
            }
        },
        methods:{
            //跳转到注册页面
            goPage(name){
                this.$router.push({name});
            },
            //切换密码的格式
            change(){
                this.filg=!this.filg;
            },
             //注册
             register() {
                 if(validForm.validUserForm(this.userInfo,this)){
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
                        url: '/Login',
                        //post传递参数需要写在data
                        data
                   }).then(result => {
                       //关闭加载提示
                        this.$toast.clear();
                         
                        if(result.data.code==200){
                             //存储token，用于后面登录验证
                             localStorage.setItem('__TK',result.data.token);
                               //跳转到菜单
                            this.$router.push({name: 'Menu'})
                        }else{
                            this.$toast(result.data.msg);
                        }
                    }).catch(err => {
                        //关闭加载提示
                        this.$toast.clear();
                         
                    })
                 }
             },
             getPassword(){
                  this.$router.push({name: 'getPassword'});
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
.btn{
    margin-top: 10px;
}
</style>