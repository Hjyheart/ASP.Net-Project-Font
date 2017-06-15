<template>
  <div class="main-container">
    <h1>借还历史</h1>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="借" name="borrow">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            label="所借设备">
            <template scope="scope">
              <p class="device-name" @click="showDevice(scope.row.device.id)">{{scope.row.device.name}}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="backDate"
            label="应还日期">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="还" name="back">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            label="所还设备">
            <template scope="scope">
              <p class="device-name" @click="showDevice(scope.row.device.id)">{{scope.row.device.name}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="状态">
            <template scope="scope">
              <el-tag type="danger">超期1天</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <br>
    <el-row>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="tableData.length">
      </el-pagination>
    </el-row>
    <el-dialog title="设备详情" :visible.sync="showDeviceDialog">
      <el-table :data="device" stripe>
        <el-table-column
          prop="date1"
          label="入库日期">
        </el-table-column>
        <el-table-column
          prop="name"
          label="设备名称">
        </el-table-column>
        <el-table-column
          prop="nikename"
          label="设备昵称">
        </el-table-column>
        <el-table-column
          prop="number"
          label="型号">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="desc"
          label="设备描述">
        </el-table-column>
        <el-table-column
          prop="safe"
          label="是否采取安全措施">
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: '借还历史',
        activeName: 'borrow',
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            device: {
              id: 1,
              name: 'airports'
            },
            backDate: '2016-05-05'
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            device: {
              id: 2,
              name: 'airports'
            },
            backDate: '2016-05-05'
          }
        ],
        device: [{
          name: 'mac pro',
          nikename: 'hjyheart',
          number: '最新款',
          type: 'computer',
          date1: '2017-6-7',
          date2: '',
          safe: "false",
          desc: '无敌'
        }],
        showDeviceDialog: false,
        currentPage: 1
      }
    },
    methods: {
      /**
       * For tag
       */
      handleClick(tab, event) {
        console.log(tab, event);
      },
      /**
       * For page
       * @param val
       */
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      /**
       * Show device
       * @param id
       */
      showDevice (id) {
        console.log(id)
        this.showDeviceDialog = true
      }
    },
    mounted () {
      document.title = this.title
    }
  }
</script>

<style scoped src="./history.css"></style>
