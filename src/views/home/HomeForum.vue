<template>
  <div class="box" ref="box">
    <el-scrollbar class="left" wrap-style="overflow-x:hidden;">
      <div>
        <!-- <div style="margin-left:10px;width: 700px;">标题 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 标签：XXXX</div>
        <div style="margin-top:5px;margin-left:10px;width: 700px;">等级：省级 &nbsp;&nbsp;&nbsp;&nbsp; 创建者：XXX &nbsp;&nbsp;&nbsp;&nbsp; 时间限制：1000ms &nbsp;&nbsp;&nbsp;&nbsp; 空间限制：1MB &nbsp;&nbsp;&nbsp;&nbsp; 问题ID：100000000</div> -->
        <div style="font-size: 22px; color: #595959;">标题</div>
        <el-divider></el-divider>
        <div>
          <editor-vue 
          :readOnlys="readOnlys"
          @changeData="hChangeData"
          @uploadImg="hUploadImg"
        />
        </div>
      </div>
    </el-scrollbar>
      <div class="resize" title="收缩侧边栏"></div>
      <el-scrollbar class="mid" wrap-style="overflow-x:hidden;">
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
import editorVue from '../../components/WangEditor/index.vue'
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
  components: {
    editorVue,
  },
  data() {
    return {
      readOnlys: false,
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
    };
  },
  methods: {
    hChangeData(editDataHtml){
      // 获取最新的html数据
      this.content = editDataHtml
      console.log(this.content)
    },
    hUploadImg(file,insertFn){
      console.log(file)
      // 插入图片，调接口返回图片url,通过插入conteng
      let imgUrl = 'https://img1.baidu.com/it/u=608404415,1639465523&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800'
      insertFn(imgUrl);
    // 设置只读
    this.readOnlys = true;
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
        }
  },
  mounted() {
      this.dragControllerDiv();
    },
};
</script>

<style scoped>
  /* 拖拽相关样式 */
  /*包围div样式*/
  .box {
    width: 100%;
    height: 82vh;
    margin: 5vh 0 0 5vh;
    overflow: hidden;
    /* box-shadow: -1px 9px 10px 3px rgba(0, 0, 0, 0.11); */
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
    margin-top: -10px;
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
