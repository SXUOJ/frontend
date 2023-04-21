<template>
    <div>
        <img src="../img/images.png" style="position: absolute;margin-left: 40px;">
        <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" router active-text-color="#118d85"> 
            <el-menu-item index="/FrontPage"><i class="el-icon-s-home"></i>主页</el-menu-item>
            <el-menu-item index="/QuestionBank"><i class="el-icon-s-opportunity"></i>题库</el-menu-item>
            <!-- <el-menu-item index="/RankOI"><i class="el-icon-s-data"></i> 比赛</el-menu-item>
            <el-menu-item index="/HomeForum"> <i class="el-icon-s-comment"></i> 讨论</el-menu-item> -->
            <el-menu-item index="/AddQuestion" v-if="this.$store.state.usergroup !='0'"> <i class="el-icon-s-comment" ></i> 添加题目</el-menu-item>
            <div class="demo-type">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <div style="width: 100px;">{{ truename }}</div>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                          <el-button type="text" @click="open">修改密码</el-button>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
            </div>
        </el-menu>
    </div>
</template>

<script>
import md5 from "md5";//在使用的页面引入加密插件

let passWord="jiaomaster";//设置加密字符串
md5(passWord);

  export default {
    data() {
      return {
        truename:''
      };
    },
    methods: {
      open() {
        this.$prompt('请输入新的密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          if(value!=null) {
            var newValue = md5(value);
            console.log(newValue);
            this.$axios({
            method: 'put',
            url: '/api/user/put_user_info',
            data:{new_password : newValue}
          }).then(res => {
            console.log(res);
            this.$message({
            type: 'success',
            message: '密码修改成功'
            });
          }).catch(error => {
            alert('修改密码失败');
            console.log(error);
          });
        }
        else{
          this.$message({
          type: 'warning',
          message: '密码不能为空'
        });      
        }
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改密码'
          });       
        });
      }
    //   handleSelect(key, keyPath) {
        // console.log(key, keyPath);
    //   }
    },
    created(){
        // 请求个人数据
        this.$axios({
            method: 'get',
            url: '/api/user/get_user_info',
          }).then(res => {
            this.truename = res.data.info.truename
          }).catch(error => {
            console.log(error);
          });
    }
  }
</script>

<style>
.el-menu-demo{
    width: 800px;
    display:inline-block;
    vertical-align: top;
    line-height: 70px;
    font-size: 40px;
    left: 300px
}
.demo-type{
    position: absolute;
    margin-left: 900px;
    vertical-align: middle;
}
.CodeMirror-gutters{
    border-left:6px solid rgb(37,139,137) !important;
}
.el-dropdown-link {
    text-align: center
  }
  .el-icon-arrow-down {
    font-size: 16px;
  }
</style>