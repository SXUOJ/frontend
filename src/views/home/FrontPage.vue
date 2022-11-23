<template>
    <div class="main_body">
        <!-- 轮播图 -->
        <div>
            <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in 6" :key="item">
                <h3 class="medium">{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>
        </div>
        <!-- 时间线 -->
        <div class="block">
            <el-timeline>
                <el-timeline-item timestamp="2022/4/12" placement="top">
                <el-card>
                    <h4>完成 P1001 A+B Problem</h4>
                    <p>user 提交于 2022/4/12 20:46</p>
                </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2022/4/3" placement="top">
                <el-card>
                    <h4>完成 P1001 A+B Problem</h4>
                    <p>user 提交于 2022/4/3 20:46</p>
                </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2022/4/2" placement="top">
                <el-card>
                    <h4>完成 P1001 A+B Problem</h4>
                    <p>user 提交于 2022/4/2 20:46</p>
                </el-card>
                </el-timeline-item>
            </el-timeline>
        </div>
        <div class="notice">
            <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                prop="date"
                label="日期"
                width="180">
                </el-table-column>
                <el-table-column
                prop="notice"
                label="通知">
                </el-table-column>                
                <el-table-column
                prop="name"
                label="发布者"
                width="180">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>

export default{
    data() {
      return {
        tableData: [{
          date: '2022-05-02',
          notice: 'oj使用介绍',
          name: 'SXU_acm'
        }, {
          date: '2022-05-04',
          notice: '重要内容，必看！',
          name: 'SXU_acm'
        }, {
          date: '2022-05-01',
          notice: '重要内容，必看！',
          name: 'SXU_acm'
        }, {
          date: '2022-05-03',
          notice: '重要内容，必看！',
          name: 'SXU_acm'
        }, {
          date: '2022-05-03',
          notice: '重要内容，必看！',
          name: 'SXU_acm'
        }, {
          date: '2022-05-03',
          notice: '重要内容，必看！',
          name: 'SXU_acm'
        }, {
          date: '2022-05-03',
          notice: '重要内容，必看！',
          name: 'SXU_acm'
        }, {
          date: '2022-05-03',
          notice: '重要内容，必看！',
          name: 'SXU_acm'
        }, {
          date: '2022-05-03',
          notice: '重要内容，必看！',
          name: 'SXU_acm'
        }]
      }
    }
}
</script>

<style>
  .main_body {
    width: 80%;
    margin: 20px auto;
  }

  /* 轮播图 */
  .el-carousel__item h3 {
    background: url(../../img/picture.jpg) no-repeat center center;
    background-size: 100% 100%;
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .el-carousel__indicators--outside button {
    background-color: #118d85
;
    opacity: .24;
}

  /* 时间线 */
  .block {
    position: absolute;
    right: 10%;
    width: 30%;
  }

  /* 通知表格 */
  /* .el-timeline-item__node {
    background-color: #c6e4e2;
  }
  .el-timeline-item__tail {
    background-color: #c6e4e2;
    border-left: 2px solid #c6e4e2;
  }
  .el-timeline-item__timestamp {
    color: #41a49d;
  } */ 
  .notice {
    position: absolute;
    left: 10%;
    width: 50%;
  }
</style>