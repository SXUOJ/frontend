<template>
    <div class="container">
        <el-table
        ref="filterTable"
        :data="tableData"
        style="width: 100%">
        <el-table-column
            prop="name"
            label="标题"
            width="180">
        </el-table-column>
        <el-table-column
            prop="address"
            label="问题ID"
            :formatter="formatter">
        </el-table-column>
        <el-table-column
            prop="address"
            label="创建者"
            :formatter="formatter">
        </el-table-column>
        <el-table-column
            prop="address"
            label="等级"
            :formatter="formatter">
        </el-table-column>
        <el-table-column
            prop="tag"
            label="状态"
            width="100"
            :filters="[{ text: '已通过', value: '已通过' }, { text: '未通过', value: '未通过' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
            <el-tag
                :type="scope.row.tag === '已通过' ? 'primary' : 'success'"
                disable-transitions>{{scope.row.tag}}</el-tag>
            </template>
        </el-table-column>
        </el-table>

        <div class="block" style="margin-top:15px;">
            <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange" 
            :current-page="currentPage" 
            :page-sizes="[1,5,10,20]" 
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
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            tag: '已通过'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
            tag: '未通过'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            tag: '已通过'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
            tag: '未通过'
          }],
          currentPage: 1, // 当前页码
          total: 20, // 总条数
          pageSize: 2 // 每页的数据条数
        }
      },
      methods: {
        formatter(row) {
          return row.address;
        },
        filterTag(value, row) {
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
      }
    }
  </script>

  <style scoped>
    .container {
      width: 94%;
      margin: 10px auto;
    }
  </style>