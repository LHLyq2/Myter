<template>
    <div class="myAdress">
        <van-nav-bar
            title="收货地址"
            left-text="返回"
            left-arrow
            @click-left="back"
        />
         <van-address-list
            v-model="aid"
            :list="addressList"
            default-tag-text="默认"
            @add="goAddress"
            @edit="goAddress"
        />
    </div>
</template>

<script>
    export default {
        data(){
            return {
                aid: 1,
                addressList: [
                    
                ],
            }
        },
        created(){
             this.getAddressData();
        },
        methods: {
            //获取地址数据
            getAddressData(){

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
                        // {
                        //     id: '1',
                        //     name: '张三',
                        //     tel: '13000000000',
                        //     address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
                        //     isDefault: true,
                        // },
                         
                        if(result.data.code == 20000){
                            result.data.result.forEach(v=>{
                               let currentAddress={
                                   id: v.aid,
                                   name: v.name,
                                   tel: v.tel,
                                   address: v.province+v.city+v.county+v.addressDetail,
                                   isDefault: Boolean(v.isDefault)
                               }
                                //默认选择默认地址
                                if(v.isDefault){
                                    this.aid=v.aid;
                                }
                                this.addressList.push(currentAddress);
                            })
                        }
                    }).catch(err =>{
                        this.$toast.clear();
                      
                    })
                },
                 // 新增，编辑地址, 新增地址不要携带aid, 编辑地址需要携带aid, aid： 地址id
            goAddress(address){
                console.log("address",address);
                 
                let o = {
                    name: 'Address',
                };
                if(address){
                    o.params = {
                        item_id: address.id
                    }
                }
                this.$router.push(o);
            },
           back() {
      this.$router.go(-1);
    },
        }
       
    }
</script>

<style lang="less" scoped>

</style>