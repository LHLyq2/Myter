<template>
  <div :class="switchs?'classification':'classifications'">
    <div class="clearfix searchs-box">
      <van-icon class="fl icons" name="arrow-left" size="20px" @click="back" color="#676974" />
      <van-search
        class="searchs fl"
        v-model="value"
        show-action
        shape="round"
        placeholder="请输入搜索关键词"
        @input="searchData"
        @focus="searchDatas"
      >
        <template #action>
          <div class="sousuo" v-show="!switchs">搜索</div>
        </template>
      </van-search>
    </div>

    <!-- <van-search class="search" v-model="value" placeholder="请输入搜索关键词" @input ="searchData">
           <template #action>
            <div >搜索</div>
        </template>
    </van-search>-->
    <div class="switchs" v-if="switchs">
      <div class="listicons-boxs clearfix">
        <div class="list-title fl">
          <div class="list-title-s">
            <div
              class="list-titles"
              :ref="'item'+index"
              :class="{active:item.cat_deleted}"
              v-for="(item,index) in listInfo"
              :key="index"
              @click="toggleAsideMenu(item, index)"
            >
              <div class="title">{{item.cat_name}}</div>
              <div class="line" v-if="item.cat_deleted"></div>
            </div>
          </div>
        </div>
        <div class="listicons-box fl">
          <div class="listicons-s">
            <div class="listicons-item" v-for="(item,index) in listInfos" :key="index">
              <div class="listicons-title-box">{{item[0].cat_name}}</div>
              <div class="listicons-items clearfix">
                <div
                  class="list-icons-box fl"
                  v-for="(item,index) in listInfos[index][0].children"
                  :key="index"
                  @click="goDetail(item.cat_id)"
                >
                  <div class="list-icons-items">
                    <div class="list-icons">
                      <img class="auto-img" :src="item.cat_icon" alt />
                    </div>
                    <div class="list-icons-txt">{{item.cat_name}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="search-content-box">
        <div v-show="value==''">
          <div class="search-title">
            <div class="search-title-left fl">热门搜索</div>
            <div class="search-title-right fr" @click="hides">隐藏</div>
          </div>
          <div class="search-content-contents" v-show="hide">
            <div v-if="searchContent.length>0">
              <div
                class="search-txt fl"
                v-for="(item,index) in searchContent"
                :key="index"
              >{{item.goods_name.slice(1,3)}}</div>
            </div>
            <div v-else>
              <div class="search-txt fl" v-for="(item,index) in info" :key="index" @click="searchlink(index)">{{item.txt}}</div>
            </div>
          </div>
        </div>
        <div
          v-show="value!=''"
          class="search-list one-textse"
          v-for="(item,index) in searchContent"
          :key="index"
          @click="Detailspage(item.goods_id)"
        >{{item.goods_name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //搜索栏的搜索内容
      value: "",

      //获取列表信息
      listInfo: [],

      //列表图片信息
      listInfos: [],

      // 显示与隐藏
      switchs: true,

      searchContent: [],

      //热门隐藏与显示
      hide: true,
      info: [
        {
          txt: "电视",
        },
        {
          txt: "空调",
        },
        {
          txt: "洗衣机",
        },
        {
          txt: "冰箱",
        },
        {
          txt: "国际名牌",
        },
        {
          txt: "母婴儿童",
        },
        {
          txt: "美妆",
        },
        {
          txt: "营养保健",
        },
        {
          txt: "家居日用",
        },
        {
          txt: "理容造型",
        },
        {
          txt: "美容器",
        },
        {
          txt: "功能箱包",
        },
      ],
      //热门推荐
      searchContentInfo: [],
    };
  },
  created() {
    this.getlistInfo();

    //初始化商品数据
    console.log(this.listInfo);
    let str = {
      cat_id: 1,
    };
    this.getProductByType(str);
  },
  methods: {
    //获取列表文字信息
    getlistInfo() {
      //开启加载提示
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        //延迟自动关闭加载提示，如果该值为0，则不会自动关闭
        duration: 0,
      });
      this.axios({
        method: "GET",
        url: "https://api-hmugo-web.itheima.net/api/public/v1/categories",
      })
        .then((result) => {
          //清除加载提示
          this.$toast.clear();
          console.log("result =>1", result);
          if (result.data.meta.status == 200) {
            result.data.message.forEach((v, index) => {
              if (index == 0) {
                result.data.message[index].cat_deleted = true;
              }
            });
            console.log(result.data.message);
            this.listInfo = result.data.message;
          }
          console.log("this.listInfo", this.listInfo);
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
    //点击切换标签
    toggleAsideMenu(item, index) {
      //如果点击的是已经激活的则不再往下执行
      if (item.cat_deleted) {
        return;
      }

      for (let i = 0; i < this.listInfo.length; i++) {
        if (this.listInfo[i].cat_deleted) {
          this.listInfo[i].cat_deleted = false;
        }
      }
      item.cat_deleted = true;

      this.getProductByType(item);
    },
    //获取商品列表
    getProductByType(item) {
      console.log("执行过了");
      console.log("item", item);
      console.log("this.listInfo[0]", this.listInfo[0]);
      //开启加载提示
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        //延迟自动关闭加载提示，如果该值为0，则不会自动关闭
        duration: 0,
      });
      this.axios({
        method: "GET",
        url: "https://api-hmugo-web.itheima.net/api/public/v1/categories",
      })
        .then((result) => {
          //清除加载提示
          this.$toast.clear();
          console.log("result =>1", result);
          let listInfos = [];
          if (result.data.meta.status == 200) {
            result.data.message.forEach((v) => {
              console.log("5555");
              if (item.cat_id == v.cat_id) {
                console.log("v.children", v.children);
               for(let i=0;i<v.children.length;i++){
                 if(v.children[i].children){
                   console.log("v.children[i].children",v.children[i])
                    listInfos.push([v.children[i]]);
                 }
               }
              }
            });
            this.listInfos = listInfos;
            console.log("this.listInfos", this.listInfos);
            console.log(
              "this.listInfos.cat_name",
              this.listInfos[0][0].cat_name
            );
          }
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
    //搜索
    searchData() {
      //开启加载提示
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        //延迟自动关闭加载提示，如果该值为0，则不会自动关闭
        duration: 0,
      });
      this.axios({
        method: "GET",
        url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch",
        params: {
          query: this.value,
        },
      })
        .then((result) => {
          this.$toast.clear();
          console.log("this.result", result);
          console.log("this.listInfo",this.listInfo);
          if (result.data.meta.status == 200) {
            
            this.searchContent = result.data.message;
          }
          console.log("this.searchContent=>", this.searchContent);
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
    // 点击热门产品
    searchlink(index){
      let arr = [];
      console.log('this.listInfo',this.listInfo)
      this.listInfo.forEach(v =>{
        // console.log("7777")
        v.children.forEach(vs =>{
           console.log("vs",vs)
          if(vs.cat_name == this.info[index].txt){
           arr.push(vs.children);
          }
        })
      })
      console.log("this.arr ===",arr)
    },
    //搜索框获得焦点后
    searchDatas() {
      this.switchs = false;
      //  if(this.searchContent.length == 0){
      //      this.searchContentInfo =this.info;
      //  }else{
      //      this.searchContentInfo = this.searchContent;
      //  }
      //  console.log("this.searchContent",this.searchContent);
    },
    //隐藏热门推荐
    hides() {
      this.hide = !this.hide;
    },
    // 返回上一层
    back() {
      this.switchs = true;
      this.value = "";
    },
    //搜索商品唯一值cat_id
    Detailspage(goods_id) {
      console.log("id", goods_id);
      this.$router.push({ name: "Detail", query: { goods_id } });
    },
    //商品唯一值cat_id
    goDetail(id) {
      //id 商品id
      this.$router.push({ name: "Detaillist", query: { id } });
    },
  },
};
</script>

<style lang="less" scoped>
.classification {
  height: 667px;
}
.classifications {
  height: 667px;
  background-color: white;
}
.searchs-box {
  background-color: white;
}
.switchs {
  margin-top: 2px;
}

.list-title {
  height: 613px;
  overflow-y: auto;
  width: 70px;
  background-color: #f7f7f7;
}

.list-title-s {
  padding-bottom: 40px;
}
.listicons-s {
  padding-bottom: 50px;
}

.list-titles {
  border-bottom: 1px solid white;
  position: relative;
}
.list-titles.active {
  color: #ff4069;
}
.list-title .title {
  width: 30px;
  height: 30px;
  margin: 0 auto;
  padding: 15px;
  font-size: 14px;
  text-align: center;
}
.listicons-box {
  width: calc(~"100% - 70px");
  height: 613px;
  overflow-y: auto;
  background-color: white;
}
.listicons-title-box {
  height: 60px;
  width: 160px;
  display: block;
  margin: 0 auto;
  font-size: 14px;
  font-weight: bold;
  box-sizing: border-box;
  text-align: center;
  line-height: 80px;
}
.listicons-title-box:before,
.listicons-title-box:after {
  content: "";
  display: inline-block;
  width: 25px;
  height: 2px;
  background-color: #eaeaea;
  vertical-align: middle;
  margin: 0 2px;
}
.linst-str {
  border: 1px solid green;
}
.listicons-title-box .liens {
  width: 25px;
  height: 2px;
  background-color: #eaeaea;
  margin-top: 35px;
  margin-right: 5px;
  &:last-child {
    margin-left: 5px;
  }
}
.listicons-items .list-icons-box {
  height: 105px;
  width: 50%;
  background-color: white;
}
.list-icons-box .list-icons-items {
  width: 80px;
  margin: 0 auto;
}
.list-icons-box .list-icons-items .list-icons {
  height: 80px;
}
.list-icons-box .list-icons-items .list-icons-txt {
  height: 25px;
  line-height: 25px;
  text-align: center;
}
.list-icons-items img {
  border: 0;
}
.line {
  position: absolute;
  width: 3px;
  height: 60px;
  background-color: #ff4069;
  left: 0;
  top: 0;
  transition: top 0.1s linear;
}
.listicons-title-box .listicons-title {
  margin-top: 25px;
}
.sousuo {
  background-color: #e93b3d;
  width: 40px;
  color: white;
  text-align: center;
  border-radius: 2px;
}
.search-content-box {
  padding: 0 10px;
  background-color: white;
}
.search-title {
  height: 40px;
  line-height: 40px;
  font-size: 18px;
}
.search-title-left {
  color: #232326;
}
.search-title-right {
  color: #9d9d9d;
}
.search-content-contents {
  height: 120px;
  background-color: white;
}
.search-txt {
  display: inline;
  padding: 5px 10px;
  font-size: 16px;
  background-color: #f0f2f5;
  margin-bottom: 10px;
  margin-left: 8px;
  border-radius: 4px;
}
.search-txt:nth-child(-n+3) {
  color: #E93B3D;
}
.search-list {
  height: 40px;
  border-bottom: 1px solid #f8f9fa;
  line-height: 40px;
}
.icons {
  width: 20px;
  margin-top: 20px;
  margin-left: 10px;
}
/deep/.van-search--show-action {
  width: 340px;
}
</style>