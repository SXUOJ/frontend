<template>
    <div>
      <div style="border: 0px solid #ccc; margin-top: 10px">
        <!-- 工具栏 -->
        <Toolbar
            style="border-bottom: 0px solid #ccc"
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
        default: true,
      },
    },
    data() {
      return {
        editor: null,
        html: '',
        toolbarConfig: {
          /* 显示哪些菜单，如何排序、分组 */ 
          toolbarKeys: [
          ], 
          // excludeKeys: [ ], /* 隐藏哪些菜单 */ 
        },
        editorConfig: {
          placeholder: "请输入内容",
          // autoFocus: false,
          readOnly: true, // 只读、不可编辑
          // 所有的菜单配置，都要在 MENU_CONF 属性下
          MENU_CONF: {
            // 配置上传图片
            uploadImage: {
              customUpload: this.uploaadImg
            },
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
      uploaadImg(file, insertFn){
        this.$emit('uploadImg', file, insertFn)
      },
      onCreated(editor) {
        this.editor = Object.seal(editor);
      },
      onChange() {
        this.$emit('changeData', this.html)
        console.log(this.editorConfig.uploadImage);
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
  