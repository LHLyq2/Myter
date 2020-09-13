export const mutations = {
    // 购物车的数据
    changeData(state, data) {
        state.shoppingCart.push(data.key);
    },
    //商品详情单个页面的数据
    detailsData(state, data){
        state.commodityDetails.push(data.src)
    },
    //清空商品详情单个页面的数据
    detailsDatas(state){
        state.commodityDetails.length = 0;
    },
     //商品收藏的数据
     changeDatas(state, data) {
        state.commodityCollection.push(data.key);
    },
    changeDatasd(state, data) {
        state.commodityCollection.length = 0;
    },
    // 删除选中的购物车数据
    shoopData(state, data) {
        state.shoppingCart.length = 0;
        state.shoppingCart.push(data);
    },
    shoopDatas(state) {
        state.shoppingCart.length = 0;
    },
    // 修改商品收藏的数据是否为true
    shoopDatase(state,obj) {
        state.commodityCollection[obj.index].check = obj.boolen;
        console.log('修改后',state.commodityCollection[obj.index].check);
    },
    // 删除选中的收藏商品数据
    deleteCollectionshoop(state, data) {
        state.commodityCollection.length = 0;
        state.commodityCollection=data.key;
    },
     // 提交订单的商品数据
     orderShoop(state, data) {
        data.key.forEach(v =>{
            state.orderCollection.push(v);
        })
    },
}