<template>
    <div class="main">
        <div>
             <!-- 二级路由插座 -->
            <router-view></router-view>
        </div>
        <div>
            <van-tabbar v-model="active" @change="toggleTabBar">
                <van-tabbar-item v-for="(item,index) in tabBarData" :icon="item.icon" :key="index">{{item.title}}</van-tabbar-item>
            </van-tabbar>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                active:0,
                tabBarData:[
                    {
                         icon:'coupon-o',
                         title:'菜单',
                         routeName: 'Menu',
                         url: '/main/menu'
                    },
                     {
                        icon:'gem-o',
                        title:'分类',
                        routeName: 'Classification',
                         url: '/main/classification'
                    },
                     {
                        icon: 'shopping-cart-o',
                        title:'购物车',
                        routeName: 'Shopcart',
                         url: '/main/shopcart'
                    },
                     {
                        icon:'contact',
                         title:'我的',
                        routeName: 'My',
                        url: '/main/my'
                    }
                ]
            }
        },
        created(){
            // 获取路径的hash
            let hash = location.hash.slice(1);
            console.log('hash',hash);

            // 根据路径激活相应路由
            for (let i = 0; i < this.tabBarData.length; i++) {
                if (this.tabBarData[i].url == hash) {
                this.active = i;
                break;
                }
            }
        },
        methods:{
            //切换底部导航
            toggleTabBar(index) {
                 
                this.$router.push({name: this.tabBarData[index].routeName});
            }
        }
    }
</script>

<style lang="less" scoped>

</style>

<style lang="less" scoped>
/deep/ .van-tab{
    box-sizing: border-box;
    widows: 20%;
}
/deep/ .van-tabs__line{
    background-color: #8CCBFF;
}
.title-box{
    width: 10%;
    box-sizing: border-box;
    background-color: white;
    padding: 10px;
}
.title{
    padding-bottom: 5px;
    width: 35px;
    height: 20px;
    font-size: 16px;
    color: #048EFF;
    border-bottom: 2px solid #8CCBFF;
}
</style>