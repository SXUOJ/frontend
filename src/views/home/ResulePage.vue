<template>
    <div class="box" ref="box">
    <div class="left" >
      <div>
        <template>
            <el-table
                :data="tableData"
                style="width: 100%"
                :row-class-name="tableRowClassName">
                <el-table-column
                prop="memory"
                label="memory"
                width="180">
                </el-table-column>
                <el-table-column
                prop="cpu_time"
                label="cpu_time"
                width="180">
                </el-table-column>
                <el-table-column
                prop="real_time"
                label="real_time">
                </el-table-column>
                <el-table-column
                prop="status1"
                label="status">
                </el-table-column>
            </el-table>
        </template>
        <el-divider></el-divider>
        
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

 
  export default {
    data() {
        
        return {
            tableData:[],
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
        tableRowClassName({row}) {
            console.log(row.status === 1);
            if (row.status == 0) {
            return 'Success';
            } else if (row.status === 1) {
            return 'Accepted';
            }
            else if (row.status === 2) {
            return 'WrongAnswer';
            }
            else if (row.status === 3) {
            return 'CompileError';
            }
            else if (row.status === 4) {
            return 'RuntimeError';
            }
            else if (row.status === 5) {
            return 'TimeLimitExceed';
            }
            else if (row.status === 6) {
            return 'MemoryLimitExceed';
            }
            else if (row.status === 7) {
            return 'OutputLimitExceed';
            }
            else if (row.status === 8) {
            return 'PresentationError';
            }
            else if (row.status === 9) {
            return 'SystemError';
            }
            else if (row.status === 10) {
            return 'UnkownError';
            }
            return '';
        },
      handleCurrentChange1(val) {
        this.currentRow = val;
        console.log(val);  
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
    },
    mounted() {
        this.dragControllerDiv();
    },
    created() {
        var submit_id = this.$route.params.submit_id
        console.log(submit_id)
        this.$axios({
            methods: 'get',
            url: `/api/status/get_status_by_submit_id/${submit_id}`,
        }).then(res=>{
            console.log(res)
            this.sql=res.data.result.source
            this.tableData=res.data.result.results
            for (var i=0; i<this.tableData.length; i++)
            {
                if(this.tableData[i].status===0){
                    this.tableData[i].status1 = 'Success'
                }
                else if(this.tableData[i].status===1)
                {
                    this.tableData[i].status1 = 'Accepted'
                }
                else if(this.tableData[i].status===2)
                {
                    this.tableData[i].status1 = 'WrongAnswer'
                }
                else if(this.tableData[i].status===3)
                {
                    this.tableData[i].status1 = 'CompileError'
                }
                else if(this.tableData[i].status===4)
                {
                    this.tableData[i].status1 = 'RuntimeError'
                }
                else if(this.tableData[i].status===5)
                {
                    this.tableData[i].status1 = 'TimeLimitExceed'
                }
                else if(this.tableData[i].status===6)
                {
                    this.tableData[i].status1 = 'MemoryLimitExceed'
                }
                else if(this.tableData[i].status===7)
                {
                    this.tableData[i].status1 = 'OutputLimitExceed'
                }
                else if(this.tableData[i].status===8)
                {
                    this.tableData[i].status1 = 'PresentationError'
                }
                else if(this.tableData[i].status===9)
                {
                    this.tableData[i].status1 = 'SystemError'
                }
                else if(this.tableData[i].status===10)
                {
                    this.tableData[i].status1 = 'UnkownError'
                }
            }
        }).catch(err=>{
            console.log(err)
        })
    }
  };
  </script>
  
  <style>
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

  /* 测试点表格 */
  .el-table .Accepted {
    background: #b9dec9;
  }

  .el-table .WrongAnswer {
    background: #bc6880;
  }
  .el-table .CompileError {
    background: #E39E36;
  }

  .el-table .RuntimeError {
    background: #cbb9b6;
  }
  .el-table .TimeLimitExceed {
    background: #aaa9a6;
  }

  .el-table .MemoryLimitExceed {
    background: #c9bd82;
  }
  .el-table .OutputLimitExceed {
    background: #8aa1ab;
  }

  .el-table .PresentationError {
    background: #bc9965;
  }
  
  .el-table .SystemError {
    background: #6595a4;
  }
  .el-table .UnkownError {
    background: #f1d5ab;
  }
  .el-table .Success {
    background: #89b2df;
  }


  </style>