<template>
    <div>
      <div style="border: 1px solid #ccc; margin-top: 10px">
        <!-- 工具栏 -->
        <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editor"
            :defaultConfig="toolbarConfig"
        />
        <!-- 编辑器 -->
        <Editor
            style="min-height: 400px; overflow-y: hidden"
            :defaultConfig="editorConfig"
            v-model="html"
            @onChange="onChange"
            @onCreated="onCreated"
        />
      </div>
    </div>
  </template>
   
  <script>
  import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
  // import { Message } from 'element-ui'

  export default {
    name: "editorVue",
    components: { Editor, Toolbar },
    props: {
      content: {
        type: String,
        default: '',
      },
      readOnlys: { // 只读
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        editor: null,
        html: '',
        toolbarConfig: {
          /* 显示哪些菜单，如何排序、分组 */ 
          toolbarKeys: [
            'insertFormula', // “插入公式”菜单
            // 'editFormula' // “编辑公式”菜单
            'headerSelect', 
            // '|', 
            'bold', 
            'underline', 
            'italic', 
            'color', 
            'bgColor',
            // '|', 
            'indent',  // 增加缩进
            'delIndent',  // 减少缩进
            'justifyLeft',  // 左对齐
            'justifyRight',  // 右对齐
            'justifyCenter',  // 居中
            'justifyJustify',  // 两端对齐
            // '|', 
            'fontSize', 
            'fontFamily', 
            'lineHeight', 
            // '|', 
            'bulletedList', 
            'numberedList', 
            'todo', 
            'insertLink', 
            'insertTable', 
            // '|', 
            'codeBlock', 
            'divider', 
            'uploadImage', 
            'undo', 
            'redo',
          ], 
          // excludeKeys: [ ], /* 隐藏哪些菜单 */ 
        },
        editorConfig: {
          placeholder: "请输入内容",
          // autoFocus: false,
          // readOnly: true, // 只读、不可编辑
          // 所有的菜单配置，都要在 MENU_CONF 属性下
          MENU_CONF: {
            // 图片上传
          uploadImage: {
            customUpload: this.uploaadImg,
            fieldName: 'images',
            // 单个文件的最大体积限制，默认为 2M
            maxFileSize: 10 * 1024 * 1024, // 10M
            // 最多可上传几个文件，默认为 100
            maxNumberOfFiles: 10,
            // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
            allowedFileTypes: [],
            // 跨域是否传递 cookie ，默认为 false
            withCredentials: true,

            // 超时时间，默认为 10 秒
            timeout: 10 * 1000, //10 秒
          }
          },
        },
        
      };
    },
    watch: {
      readOnlys: {
        handler(newV) {
          if(newV) {
            this.editor.disable()  // 只读模式
          }
        }
      },
      
    },
    methods: {
      isInArray(arr,value){
        for(var i = 0; i < arr.length; i++){
            if(value === arr[i]){
                return true;
            }
        }
        return false;
      },
      uploaadImg(file, insertFn){
        
        return this.$axios({
          method: 'post',
          url: '/api/admin/upload/image/'+file.name,
          data:{"images":file},
          headers: {
            'Content-Type':'multipart/form-data',
          }
        }).then(res => {
          console.log(res)
          this.$message.success('图片上传成功！')
          this.$emit('uploadImg', res.data, insertFn)
        }).catch(err =>{
          this.$message.warning('图片上传失败！')
          console.log(err)
        })
      },
      onCreated(editor) {
        this.editor = Object.seal(editor);
      },
      onChange() {
        this.$emit('changeData', this.html)
        // 删除图片
        var reg = /(?<=img src=").*?(?=" alt=)/g
         var str = this.html.match(reg)
         this.old = this.new;
         this.new = str?str:[];
         if(  this.old.length > this.new.length ){
            for(let index in this.old){
              if( this.isInArray(this.new,this.old[index]) == false ){
                let imgName =  this.old[index].split("\\").slice(-1)
                console.log(imgName);
                // this.$api.get("deleteImg?fileName=" + imgName)
                this.$axios({
                  method: 'delete',
                  url: '/api/admin/upload/image/${imgName}',
                }).then(res => {
                  console.log(res)
                  this.$message.success('图片删除成功！')
                }).catch(err =>{
                  this.$message.warning('图片删除失败！')
                  console.log(err)
                })
              }
            }
         }  
      },
      
    },
    created() {
      this.html = this.content;
    },
    beforeDestroy() {
      const editor = this.editor;
      if (editor == null) return;
      editor.destroy(); // 组件销毁时，及时销毁 editor
    },
  };
  </script>
   
  <style src="@wangeditor/editor/dist/css/style.css"></style>
  