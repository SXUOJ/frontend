<template>
    <div class="container1">
        <el-table
        ref="singleTable"
        :data="tableData"
        stripe
        highlight-current-row
        @current-change="handleCurrentChange1"
        style="width: 100%">
        <el-table-column
            prop="title"
            label="标题"
            width="180">
        </el-table-column>
        <el-table-column
            prop="question_id"
            label="问题ID"
            :formatter="formatter">
        </el-table-column>
        <el-table-column
            prop="creator"
            label="创建者"
            :formatter="formatter1">
        </el-table-column>
        <el-table-column
            prop="level"
            label="等级"
            :formatter="formatter2">
        </el-table-column>
        <el-table-column
            prop="tags"
            label="标签"
            :formatter="formatter2">
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
            :page-sizes="[10,15,20,25,30]" 
            :page-size="pageSize" 
            layout="total, sizes, prev, pager, next, jumper" 
            :total="tableData.length">
            </el-pagination>
        </div>
    </div>
    
  </template>
  
  <script>
    export default {
      data() {
        return {
          tableData: [],
          currentRow: null,
          info:[0,1,2,3],
          currentPage: 1, // 当前页码
          total: 30, // 总条数
          pageSize: 10 // 每页的数据条数
        }
      },
      methods: {
        // setCurrent(row) {
        //   this.$refs.singleTable.setCurrentRow(row);
        // },
        handleCurrentChange1(val) {
          this.currentRow = val;
          console.log(val.question_id);
          this.$router.push(`/QuestionPage/${val.question_id}`);
        },
        formatter(row) {
          console.log(row);
          return row.question_id;
        },
        formatter1(row) {
          return row.creator;
        },
        formatter2(row) {
          return row.level;
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
        },
        //当前页改变时触发 跳转其他页
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.currentPage = val;
        }
      },
      created(){
        var page = this.currentPage+''
        var pageSize = this.pageSize+''
          this.$axios({
            method: 'get',
            url: '/api/question/get_list',
            params:{
              amount:pageSize,
              page:page  
            }
          }).then(res => {
            this.tableData = res.data.question_list
            console.log(res.data);
            for (let index = 0; index < res.data.question_list.length; index++) {
              this.tableData[index].title=res.data.question_list[index].title
              this.tableData[index].question_id=res.data.question_list[index].info.question_id
              this.tableData[index].creator=res.data.question_list[index].info.creator
              this.tableData[index].level=res.data.question_list[index].info.level
              this.tableData[index].tags=res.data.question_list[index].info.tags
              if(this.tableData[index].if_ac){
                this.tableData[index].if_ac='已通过'
              }
              else{
                this.tableData[index].if_ac='未通过'
              }
            }
          }).catch(error => {
            console.log(error);
          });
        },
    }
  </script>

  <style scoped>
    .container1 {
      width: 80%;
      margin: 10px auto;
    }
  </style>