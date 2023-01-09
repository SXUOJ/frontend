<template>
    <div>
        <img src="../img/images.png" style="position: absolute;margin-left: 40px;">
        <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" router active-text-color="#118d85"> 
            <el-menu-item index="/FrontPage"><i class="el-icon-s-home"></i>主页</el-menu-item>
            <el-menu-item index="/QuestionBank"><i class="el-icon-s-opportunity"></i>题库</el-menu-item>
            <el-menu-item index="/QuestionList"><i class="el-icon-notebook-2"></i>题单</el-menu-item>
            <el-menu-item index="/RankOI"><i class="el-icon-s-data"></i> 比赛</el-menu-item>
            <el-menu-item index="/HomeForum"> <i class="el-icon-s-comment"></i> 讨论</el-menu-item>
            <div class="demo-type">
                <el-avatar> user </el-avatar>
            </div>
        </el-menu>
    </div>
</template>

<script>
  export default {
    data() {
      return {
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
    width: 600px;
    display:inline-block;
    vertical-align: top;
    line-height: 70px;
    font-size: 40px;
    left: 300px
}
.demo-type{
    position: absolute;
    margin-left: 1250px;
    vertical-align: middle;
}
.CodeMirror-gutters{
    border-left:6px solid rgb(37,139,137) !important;
}
</style>