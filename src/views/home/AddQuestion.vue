<template>
    <div class="box" ref="box">
      <el-scrollbar class="left" wrap-style="overflow-x:hidden;">
        <div>
          <div style="margin-left:10px;width: 700px;"> 
            <el-input v-model="title" placeholder="请输入标题" style="width: 150px;"></el-input>
             标签：<el-input v-model="tags" placeholder="请输入标签" style="width: 150px;"></el-input></div>
          <div style="margin-top:5px;margin-left:10px;width: 700px;">等级：<el-input v-model="level" placeholder="请输入等级" style="width: 150px;"></el-input> 时间限制：<el-input v-model="time_limit" placeholder="请输入时间限制" style="width: 150px;"></el-input>空间限制：<el-input v-model="mem_limit" placeholder="请输入空间限制" style="width: 150px;"></el-input></div>
          <el-divider></el-divider>
          <div>
            <editor-vue 
            :readOnlys="readOnlys"
            @changeData="hChangeData"
            @uploadImg="hUploadImg"
            ref="write"
          />
          </div>
            <el-upload
              class="upload-demo"
              drag
              accept=".rar,.zip"
              :action="actionUrl"
              :multiple="false"
              :headers="headers"
              :limit=1
              :on-success="handleUploadSuccess"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传 .rar / .zip格式文件</div>
          </el-upload>
          <el-button type="primary" @click="sub">提交题目</el-button>
        </div>
      </el-scrollbar>
        <div class="resize" title="收缩侧边栏"></div>
        <el-scrollbar class="mid" wrap-style="overflow-x:hidden;">
        <div style="width: 50px;">
          <el-button @click="preview">预览</el-button>
        </div> 
            <div style="margin-left:10px;width: 700px;"> 
            {{title}} &nbsp;&nbsp;&nbsp;&nbsp;
             标签：{{ tags }}</div>
            <div style="margin-top:5px;margin-left:10px;width: 700px;">等级：{{ level }} 时间限制：{{ time_limit }} 空间限制：{{ mem_limit }} </div>
          <el-divider></el-divider>
          <!-- <div v-html="this.content"></div> -->
          <editor-vue1 
            :readOnlys="false"
            @changeData="hChangeData"
            @uploadImg="hUploadImg"
            ref="read"
          />
        </el-scrollbar>
      </div>
  </template>
   
  <script>
  import editorVue from '../../components/WangEditor/index.vue'
  import editorVue1 from '../../components/WangEditor/index1.vue'

   
  export default {
    components: {
      editorVue,
      editorVue1
    },
    data() {
      return {
        zip:'',
        title:'',
        tags:'',
        level:'',
        time_limit:'',
        mem_limit:'',
        content:'',
        readOnlys:true,
        questionId:'',
        actionUrl: 'http://oj.niuwx.cn/api/admin/upload/sample/' + this.questionId,
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
      };
    },
    methods: {
      hChangeData(editDataHtml){
        // 获取最新的html数据
        this.content = editDataHtml
        // this.$refs.read.html=editDataHtml
      },
      preview(){
        this.$refs.read.html=this.content
      },
      handleUploadSuccess(res, file) {
      this.$message.success('上传' + file.name)
      this.zip=file
      },
      //预览
      handlePreview() {
        this.$message.success('压缩文件无法预览！')
      },
      handleRemove(file, ) {
        console.log(file);
        var questionid = this.question
        console.log(questionid)
        this.$axios({
          method: 'delete',
          url: '/api/admin/question/delete/${questionid}',
        }).then(res => {
          console.log(res)
          this.$message.success('移除' + file.name + '成功')
        }).catch(err =>{
          this.$message.warning('压缩包删除失败！')
          console.log(err)
        })
      },

      sub(){
        var _this = this;
        this.$axios({
            method: 'post',
            url: '/api/admin/question/create',
            data:{
              "title":_this.title,
              "context":{
                "description":_this.content
              },
              // "information.question_id":_this
              "information":{
                "level":_this.level,
                "creator":'爽爽子',
                "tags":_this.tags,
              },
              "limit":{
                "time_limit":_this.time_limit,
                "mem_limit":_this.mem_limit,
              }
             
            },
          }).then(res => {
            console.log(res.data.questionId);
            _this.$axios({
            method: 'post',
            url: '/api/admin/upload/sample/'+res.data.questionId,
            headers: {
            'Content-Type':'multipart/form-data',
            },
            data:{
              "samples":_this.zip,
            },
          }).then(res =>{
            console.log(res);
            this.$router.push('/FrontPage');
            this.$message.success('题目创建成功')
          }).catch(err=>{
            console.log(err);
          })  
          }).catch(error => {
            console.log(error);
          });
        
    },
      hUploadImg(file,insertFn){
        console.log(file)
        // 插入图片，调接口返回图片url,通过插入conteng
        let imgUrl = file
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
  