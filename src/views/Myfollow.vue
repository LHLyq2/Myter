<template>
  <div class="myfollow">
    <div v-if="commodityCollection.length==0">
      <van-nav-bar @click-left="back" title="我的关注" @click-right="backs" class="bar">
        <template #right>
          <van-icon name="wap-home-o" size="24" color="#808080" />
        </template>
        <template #left>
          <van-icon name="arrow-left" size="24" color="#808080" />
        </template>
      </van-nav-bar>
      <van-empty description="暂无收藏" />
    </div>
    <!-- 返回上一页和首页 @click-right=""-->
    <div v-else>
      <van-nav-bar @click-left="back" title="我的关注" @click-right="backs" class="bar">
        <template #right>
          <van-icon name="wap-home-o" size="24" color="#808080" />
        </template>
        <template #left>
          <van-icon name="arrow-left" size="24" color="#808080" />
        </template>
      </van-nav-bar>
      <div class="title-items-box clearfix">
        <div class="fl title-count">
          共
          <span>{{commodityCollection.length}}</span> 件商品
        </div>
        <div class="title-edit fr" @click="editOption">{{txt}}</div>
      </div>
      <div class="myfollow-content">
        <div
          class="myfollow-content-items clearfix"
          v-for="(item,index) in commodityCollection"
          :key="index"
        >
          <div class="myfollow-content-item">
            <div class="checked fl" v-if="switchs">
              <van-checkbox
                class="van-checkboxs"
                @click="simpleSelect(index,checkData[index])"
                v-model="checkData[index]"
                checked-color="#07c160"
              ></van-checkbox>
            </div>
            <div :class="[switchs?'myfollowInfo-box':'myfollowInfo-boxs']" class="fl clearfix">
              <div class="img-box fl">
                <img :src="item.goods_big_logo" class="auto-img" alt />
              </div>
              <div class="myfollowInfo-txt-box fl">
                <div class="txt one-texts">{{item.goods_name}}</div>
                <div class="price-box">
                  <span>￥</span>
                  <span class="prices">{{item.goods_price}}.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="myfollowBtn-box" v-show="switchs">
        <div class="checkeds fl">
          <van-checkbox
            class="options"
            v-model="checked"
            checked-color="#07c160"
            @click="allSelect"
          >全选</van-checkbox>
        </div>
        <div class="cancel fr" @click="qingchu">取消关注</div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters, mapMutations } = createNamespacedHelpers(
  "menuModule"
);
export default {
  data() {
    return {
      checked: false,
      switchs: false,
      txt: "编辑",
      followData: [],
      str: false,
      checkData: [],
    };
  },
  created() {
    this.commodityCollection.forEach((v) => {
      this.checkData.push(v.check);
    });
    console.log(this.checkData);
  },
  computed: {
    ...mapGetters(["commodityCollection"]),
  },
  watch: {
    checkData() {
      console.log("改變了");
    },
  },
  methods: {
    ...mapMutations(["shoopDatase"]),
    ...mapMutations(["changeDatasd"]),
    //删除选中的商品收藏
    ...mapMutations(["deleteCollectionshoop"]),
    // 返回上一层
    back() {
      this.$router.go(-1);
    },
    //返回首页
    backs() {
      this.$router.push({ name: "Menu" });
    },
    //单选
    simpleSelect(index, boolen) {
      this.shoopDatase({ index, boolen });
      for (let i = 0; i < this.commodityCollection.length; i++) {
        if (!this.commodityCollection[i].check) {
          this.checked = false;
          return;
        }
      }
      this.checked = true;
    },
    //点击全选后
    allSelect() {
      let arr = [];
      this.commodityCollection.forEach((v) => {
        v.check = this.checked;
        // console.log("v.check", v.check);
        arr.push(v.check);
      });
      this.checkData = arr;
    },
    //点击取消关注后
    qingchu() {
      let arr1 = [];
      this.commodityCollection.forEach((v, index) => {
        if (!v.check) {
          arr1.push(v);
        }
      });
      //删除赋值
      this.deleteCollectionshoop({ key: arr1 });
      //  当前数据清空
      this.checkData = [];
      this.commodityCollection.forEach((v) => {
        //重新赋值数据
        this.checkData.push(v.check);
      });
    },
    editOption() {
      this.switchs = !this.switchs;
      if (this.switchs != true) {
        this.txt = "编辑";
      } else {
        this.txt = "完成";
        for (let i = 0; i < this.checkData.length; i++) {
          this.checkData[i] = false;
        }
        console.log("this.checkData", this.checkData);
        this.checked = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.myfollow {
  height: 667px;
  .title-items-box {
    padding: 10px;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    margin: 0 a;
    display: f;
  }
  .checked {
    width: 20px;
  }
  .myfollow-content {
  }
  .myfollow-content-item {
  }
  .myfollow-content-items {
    height: 100px;
    padding: 10px;
    position: relative;
    background-color: white;
    margin-bottom: 10px;
    overflow: hidden;
  }
  .van-checkboxs {
    margin-top: 40px;
  }
  .myfollowInfo-box {
    position: absolute;
    left: 50px;
    top: 10px;
    width: calc(~"100% - 20px");
    // background-color: red;
  }
  .myfollowInfo-boxs {
    position: absolute;
    left: 25px;
    top: 10;
    width: calc(~"100% - 35px");
    // background-color: red;
  }
  .myfollowInfo-box {
  }
  .img-box {
    height: 100px;
    width: 100px;
    // background-color: yellow;
  }
  .myfollowInfo-txt-box {
    width: calc(~"100% - 120px");
    margin-left: 20px;
    // background-color: black;
  }
  .txt {
    height: 60px;
    // background-color: green;
    font-size: 16px;
    // padding-right: 10px;
    box-sizing: border-box;
  }
  .price-box {
    margin-top: 20px;
    height: 20px;
    line-height: 2px;
    color: #e4393c;
  }
  .myfollowBtn-box {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 50px;
    // border: 1px solid black;
    padding: 10px;
    box-sizing: border-box;
    background-color: white;
  }
  .checkeds {
    height: 100%;
    width: 60px;
  }
  .cancel {
    width: 80px;
    height: 30px;
    background-color: #e4393c;
    line-height: 30px;
    border-radius: 2px;
    color: white;
    text-align: center;
    font-size: 18p;
  }
  .prices {
    font-size: 18px;
  }
}
</style>