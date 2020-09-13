<template>
  <div id="app">
    <router-view></router-view>
    
  </div>

</template>

<style lang="less">
body{
  padding: 0;
  margin: 0;
  background-color: #f0f0f0;
}
.fl{
  float: left;
}
.fr{
  float: right;
}
.auto-img{
  width: 100%;
  display: block;
}
.clearfix::after{
  display: block;
  content: "";
  clear: both;
}
.one-text{
  // 多行文本溢出显示省略号
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.one-texts{
  // 多行文本溢出显示省略号
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.one-textse{
  // 多行文本溢出显示省略号
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
//一行文本溢出截断，以省略号方式显示
// .one-text{
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
// }
</style>
