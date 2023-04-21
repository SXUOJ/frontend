<template>
    <div class="container1">
      <input 
        type="text"
        v-model="search"
        class="search"
        placeholder="输入题目名称搜索"/>
      <el-button icon="el-icon-search" circle @click="ques_search" class="butt"></el-button>
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
        
        <el-table-column label="操作"  v-if="this.$store.state.usergroup !='0'">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click.stop="deleteRow(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
        </el-table>
 
        <div class="block" style="margin-top:15px;">
            <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange" 
            :current-page="currentPage" 
            :page-sizes="[10,15,20,25,30]" 
            :page-size="pageSize" 
            layout="total, sizes, prev, pager, next, jumper" 
            :total="total">
            </el-pagination>
        </div>
    </div>
    
  </template>
  
  <script>
    export default {
      data() {
        return {
          auth:1,
          search:'',
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
        deleteRow(index, rows) {
          console.log(index,rows);
          this.$axios({
            method: 'DELETE',
            url: '/api/admin/question/delete/'+rows.question_id,
          }).then(res => {
            console.log(res.data);
            alert('删除成功');
            this.info1()
            rows.splice(index, 1);
          }).catch(error => {
            console.log(error);
          });
        },
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
          this.info1()
        },
        //当前页改变时触发 跳转其他页
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.currentPage = val;
          this.info1()
        },
        ques_search(){
          var page = this.currentPage+''
          var pageSize = this.pageSize+''
            this.$axios({
              method: 'get',
              url: '/api/question/search',
              params:{
                amount:pageSize,
                page:page,
                keyword:this.search
              }
            }).then(res => {
              this.tableData = res.data.question_list
              this.total = res.data.amount
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
        info1(){
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
              this.total = res.data.amount
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
          }
      },
      created(){
          this.info1()
        },
    }
  </script>

  <style scoped>
    .container1 {
      width: 80%;
      margin: 10px auto;
    }
    .search{
      width: 60%;
      line-height: 40px;
      font-size: 16px;
      margin: 15px auto;
      position: relative;
      left: 20%; /*偏移*/
      text-align: center;
      border-radius: 20px;
      border: 1px solid black;
    }
    
    .butt{
      position: relative;
      left: 20%;
    }
  </style>