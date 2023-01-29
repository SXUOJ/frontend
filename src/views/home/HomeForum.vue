<template>
  <div>
    <editor-vue 
    :content="content"
    :readOnlys="readOnlys"
    @changeData="hChangeData"
    @uploadImg="hUploadImg"
  />
  </div>
</template>
 
<script>
import editorVue from '../../components/WangEditor/index.vue'
export default {
  components: {
    editorVue,
  },
  data() {
    return {
      readOnlys: false,
      content: `<p style="text-align: center;"><strong>我是标题</strong></p><p style="text-align: center;"><br></p>`,
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
  },
};
</script>
