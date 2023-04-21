<template>
    <div class="box" ref="box">
    <div class="left" >
      <div>
        <div style="margin-left:10px;width: 750px;">{{ title }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 标签：{{ tags }}</div>
        <div style="margin-top:5px;margin-left:10px;width: 750px;">等级：{{ level }} &nbsp;&nbsp;&nbsp;&nbsp; 创建者：爽爽子 &nbsp;&nbsp;&nbsp;&nbsp; 时间限制：{{ time_limit }} &nbsp;&nbsp;&nbsp;&nbsp; 空间限制：{{ mem_limit }}</div>
        <editor-vue1 
            :readOnlys="false"
            ref="read"
        />
        <el-divider></el-divider>
        <el-button @click="submit" type="primary">提交题目</el-button>
        <el-button @click="submit_result" type="info">查看提交结果</el-button>
      </div>
    </div>
      <div class="resize" title="收缩侧边栏"></div>
      <el-scrollbar class="mid" >
        <div >
            <codemirror
            ref="newCm"  
            v-model="sql" 
            :options="cmOptions"
            @ready="onCmReady">
            </codemirror>
        </div>
      </el-scrollbar>
      <el-drawer
      title="提交结果"
      :visible.sync="table"
      direction="rtl"
      size="50%">
      <el-table
        ref="singleTable"
        :data="gridData"
        stripe
        highlight-current-row
        @current-change="handleCurrentChange1"
        style="width: 100%">
        <el-table-column
            prop="submit_id"
            label="提交ID"
            width="180">
        </el-table-column>
        <el-table-column
            prop="question_id"
            label="问题ID"
            :formatter="formatter">
        </el-table-column>
        <el-table-column
            prop="time"
            label="时间"
            :formatter="formatter1">
        </el-table-column>
        <el-table-column
            prop="if_ac"
            label="状态"
            width="100"
            :filters="[{ text: '已通过', value: '已通过' }, { text: '未通过', value: '未通过' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
            <el-tag
                :type="scope.row.if_ac === '已通过' ? 'success' : 'primary'"
                disable-transitions>{{scope.row.if_ac}}</el-tag>
            </template>
        </el-table-column>
        </el-table>

        <div class="block" style="margin-top:15px;">
            <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange" 
            :current-page="currentPage" 
            :page-sizes="[10,15,20]" 
            :page-size="pageSize" 
            layout="total, sizes, prev, pager, next, jumper" 
            :total="total">
            </el-pagination>
        </div>
    </el-drawer>
    </div>
  </template>
  
<script>
import 'codemirror/mode/clike/clike.js'
// 主题css
import 'codemirror/theme/mdn-like.css'
// require active-line.js
import 'codemirror/addon/selection/active-line.js'
// closebrackets
import 'codemirror/addon/edit/closebrackets.js'

import 'codemirror/addon/edit/matchbrackets'
//滚动条
import 'codemirror/addon/scroll/simplescrollbars.css'
import 'codemirror/addon/scroll/simplescrollbars'
//富文本框 左下方描述
import editorVue1 from '../../components/WangEditor/index1.vue'

 
  export default {
    components: {
      editorVue1
    },
    data() {
        
        return {
            sql: "",
            cmOptions: {
                tabSize: 4, // tabsize默认为4
                styleActiveLine: true,
                lineNumbers: true,//显示行号
                line: true,
                mode: 'text/x-c++src', // 选择代码语言
                extraKeys: {"Ctrl": "autocomplete"},   //自动提示配置 
                lineWrapping: true,    // 自动换行
                theme: 'mdn-like', // 主题根据需要自行配置
                matchBrackets: true, // 光标匹配括号
                autoCloseBrackets:true, //自动补全括号
            },
            title:'',
            level:'',
            tags:'',
            time_limit:'',
            mem_limit:'',
            context:'',
            question_id:'',
            table: false,
            currentPage: 1, // 当前页码
            total: 20, // 总条数
            pageSize: 10, // 每页的数据条数
            gridData: [{
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }],
        }
    },
    methods: {
      
      handleCurrentChange1(val) {
        this.currentRow = val;
        console.log(val,1);
        const { href } = this.$router.resolve( `/QuestionPage/MySubmission/Result/${val.submit_id}`);
        window.open(href, '_blank');
      },
      submit_result(){
        if(this.gridData == null){
          this.$notify.info({
          title: '消息',
          message: '还没有进行过提交'
        })}
        else{
          this.table = true
        }
      },
        submit(){
          var _this = this;
          console.log(localStorage.getItem('token'))
            // 获取题目信息
          this.$axios({
            method: 'post',
            url: '/api/question/submit',
            data:{
              "question_id":_this.question_id,
              "source":_this.sql,
              "code_type":'2',
              "if_ac":'0',
              "time_limit":_this.time_limit,
              "memory_limit":_this.mem_limit
            },
          }).then(res => {
            console.log(res);
            if (res.data.code == 2000 || res.data.code == 404) {
              this.$notify.info({
              title: '消息',
              message: '提交失败,可能超时'
              })
            }
            else{
              this.$notify.info({
                title: '消息',
                message: '提交成功'
              })
              this.rueult_date()
            } 
          }).catch(error => {
            console.log(error);
            this.$notify.info({
              title: '消息',
              message: '提交失败'
            })
          });
        
        },
        dragControllerDiv() {
            var resize = document.getElementsByClassName("resize")[0];
            var left = document.getElementsByClassName("left");
            var mid = document.getElementsByClassName("mid");
            var box = document.getElementsByClassName("box")[0];
    
            // 鼠标按下事件
            resize.onmousedown = function (e) {
            //颜色改变提醒
            resize.style.background = "#818181";
            var startX = e.clientX;
            resize.left = resize.offsetLeft;
            // 鼠标拖动事件
            document.onmousemove = function (e) {
                var endX = e.clientX;
                var moveLen = resize.left + (endX - startX); // （endx-startx）=移动的距离。resize.left+移动的距离=左边区域最后的宽度
                var maxT = box.clientWidth - resize.offsetWidth; // 容器宽度 - 左边区域的宽度 = 右边区域的宽度
    
                if (moveLen < 32) moveLen = 32; // 左边区域的最小宽度为32px
                if (moveLen > maxT - 150) moveLen = maxT - 150; //右边区域最小宽度为150px
    
                resize.style.left = moveLen; // 设置左侧区域的宽度
    
                for (let j = 0; j < left.length; j++) {
                left[j].style.width = moveLen + "px";
                mid[j].style.width = box.clientWidth - moveLen - 10 + "px";
                }
            };
            // 鼠标松开事件
            document.onmouseup = function () {
                //颜色恢复
                resize.style.background = "#d6d6d6";
                document.onmousemove = null;
                document.onmouseup = null;
                resize.releaseCapture && resize.releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
            };
            resize.setCapture && resize.setCapture(); //该函数在属于当前线程的指定窗口里设置鼠标捕获
            return false;
            };
        },
        onCmReady() {
        // 设置代码编辑框宽和高
        this.$refs.newCm.codemirror.setSize("-webkit-fill-available", "auto")
        },
        formatter(row) {
          console.log(row);
          return row.question_id;
        },
        formatter1(row) {
          return row.time;
        },
        filterTag(value, row) {
          console.log(value,row);
          return row.tag === value;
        },
        //每页条数改变时触发 选择一页显示多少行
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.currentPage = 1;
          this.pageSize = val;
          this.rueult_date()
        },
        //当前页改变时触发 跳转其他页
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.currentPage = val;
          this.rueult_date()
        },
        rueult_date(){
        var _this = this;
        var page = this.currentPage+''
        var pageSize = this.pageSize+''
        this.$axios({
          method: 'get',
          url: `/api/status/get_list_by_question_id/${_this.$route.params.question_id}`,
          params:{
            amount:pageSize,
            page:page  
          }
        }).then(res => {
          this.total = res.data.amount
          this.gridData = res.data.result_list
          for (let index = 0; index < res.data.result_list.length; index++) {
            if(this.gridData[index].if_ac){
              this.gridData[index].if_ac='已通过'
            }
            else{
              this.gridData[index].if_ac='未通过'
            }
          }
        }).catch(error => {
          console.log(error);
        });
      },
    },
    mounted() {
      this.dragControllerDiv();
    },
    created() {
        console.log(this.$route.params.question_id);
        this.question_id = this.$route.params.question_id
        var _this = this;
        // 获取题目数据
        this.$axios({
            method: 'get',
            url: '/api/question/get/'+_this.$route.params.question_id,
          }).then(res => {
            console.log(res);
            this.title = res.data.question_info.title
            this.tags = res.data.question_info.information.tags
            this.level = res.data.question_info.information.level
            this.time_limit = res.data.question_info.limit.time_limit
            this.mem_limit = res.data.question_info.limit.mem_limit
            this.$refs.read.html=res.data.question_info.context.description
          }).catch(error => {
            console.log(error);
          });
          this.rueult_date()
    }
  };
  </script>
  
  <style scoped>
  /* 拖拽相关样式 */
  /*包围div样式*/
  .box {
    width: 100%;
    height: 82vh;
    margin: 5vh 0px;
    overflow: hidden;
    box-shadow: -1px 9px 10px 3px rgba(0, 0, 0, 0.11);
  }
  /*左侧div样式*/
  .left {
    width: calc(50% - 10px); /*左侧初始化宽度*/
    height: 100%;
    background: #ffffff;
    float: left;
  }
  /*拖拽区div样式*/
  .resize {
    cursor: col-resize;
    float: left;
    position: relative;
    top: 45%;
    background-color: #d6d6d6;
    border-radius: 5px;
    margin-top: -50px;
    width: 10px;
    height: 50px;
    background-size: cover;
    background-position: center;
    /*z-index: 99999;*/
    font-size: 32px;
    color: white;
  }
  /*拖拽区鼠标悬停样式*/
  .resize:hover {
    color: #444444;
  }
  /*右侧div'样式*/
  .mid {
    float: right;
    width: 50%; /*右侧初始化宽度*/
    height: 100%;
    background: #fff;
    box-shadow: -1px 4px 5px 3px rgba(0, 0, 0, 0.11);
  }
  .CodeMirror{
    border: none;
  }
  .el-divider--horizontal{
    margin: 10px;
  }
  </style>