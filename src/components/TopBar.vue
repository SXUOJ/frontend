<template>
    <div>
        <img src="../img/images.png" style="display:inline-block;margin-left: 40px;">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router> 
            <el-menu-item index="/FrontPage" style="margin-left: 30px;"><i class="el-icon-s-home"></i>主页</el-menu-item>
            <el-menu-item index="/QuestionBank"><i class="el-icon-s-opportunity"></i>题库</el-menu-item>
            <el-menu-item index="/QuestionList"><i class="el-icon-notebook-2"></i>题单</el-menu-item>
            <el-menu-item index="/RankOI"><i class="el-icon-s-data"></i> 比赛</el-menu-item>
            <el-menu-item index="/HomeForum"> <i class="el-icon-s-comment"></i> 讨论</el-menu-item>
            <div class="demo-type">
            <div>
                <el-avatar> user </el-avatar>
            </div>
        </div>
        </el-menu>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1'
      };
    },
    methods: {
    //   handleSelect(key, keyPath) {
        // console.log(key, keyPath);
    //   }
    }
  }
</script>

<style>
.el-menu-demo{
    display:inline-block;
    vertical-align: top;
    line-height: 70px;
    font-size: 40px;
}
.demo-type{
    display: inline-block;
    margin-left: 750px;
    vertical-align: middle;
}
</style>