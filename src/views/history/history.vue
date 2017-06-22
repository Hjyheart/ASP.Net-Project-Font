<template>
  <div class="main-container">
    <h1>借还历史</h1>
    <el-tabs v-model="activeName" type="card">
      <transition name="slide-fade">
        <el-tab-pane label="借" name="borrow" v-if="show">
          <el-table
            :data="showData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="time"
              label="日期">
            </el-table-column>
            <el-table-column
              prop="user_id"
              label="学号">
            </el-table-column>
            <el-table-column
              label="所借设备">
              <template scope="scope">
                <p class="device-name" @click="showDevice(scope.row.device_id)">设备详情</p>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </transition>
      <transition name="slide-fade">
        <el-tab-pane label="还" name="back" v-if="show">
          <el-table
            :data="showData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="time"
              label="日期">
            </el-table-column>
            <el-table-column
              prop="user_id"
              label="学号">
            </el-table-column>
            <el-table-column
              label="所借设备">
              <template scope="scope">
                <p class="device-name" @click="showDevice(scope.row.device_id)">设备详情</p>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

      </transition>
    </el-tabs>
    <br>
    <el-row>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="showData.length">
      </el-pagination>
    </el-row>
    <el-dialog title="设备详情" :visible.sync="showDeviceDialog" @close="device=[]">
      <el-table :data="device" stripe>
        <el-table-column
          prop="in_time"
          label="入库日期">
        </el-table-column>
        <el-table-column
          prop="name"
          label="设备名称">
        </el-table-column>
        <el-table-column
          prop="type_1"
          label="型号">
        </el-table-column>
        <el-table-column
          label="品牌">
          <template scope="scope">
            <p>{{deviceType[scope.row.type_1][scope.row.type_2].name}}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="具体型号">
          <template scope="scope">
            <p>{{deviceType[scope.row.type_1][scope.row.type_2].types[scope.row.type_3].name}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="desc"
          label="设备描述">
        </el-table-column>
        <el-table-column
          label="是否采取安全措施">
          <template scope="scope">
            <p v-if="device[scope.$index].is_safety === 1">true</p>
            <p v-if="device[scope.$index].is_safety === 0">false</p>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  import {type} from '../../assets/type'
  import {getAllHistory, getDeviceInfo} from '../../service/fetchs'

  export default {
    data () {
      return {
        title: '借还历史',
        activeName: 'borrow',
        show: true,
        deviceType: {},
        tableDataB: [],
        tableDataR: [],
        showData: [],
        device: [],
        showDeviceDialog: false,
        currentPage: 1
      }
    },
    methods: {
      /**
       * For page
       * @param val
       */
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val
        this.show = false
        if (val * 10 - val + 10 <= this.tableData.length){
          this.showData = this.tableData.slice(val * 10 - 1, val * 10 - 1)
        }else {
          this.showData = this.tableData.slice(val * 10 - 1, this.tableData.length - 1)
        }

        setTimeout(() => this.show = true, 500)

      },
      /**
       * Show device
       * @param id
       */
      showDevice (id) {
        console.log(id)
        this.showDeviceDialog = true

        getDeviceInfo(id).then(res => {
          this.device.push(res)
        }).catch(err => {
          console.log(err)
        })

      },
      loadAll (){

      }
    },
    mounted () {
      document.title = this.title

      this.deviceType = type

      getAllHistory().then(res => {
        console.log(res)
        for (let i = 0; i < res.length; i++){
          if (res[i].type === 0) {
            this.tableDataB.push(res[i])
          } else {
            this.tableDataR.push(res[i])
          }
        }
        if (this.tableDataB.length <= 10) {
          this.showData = this.tableDataB
        } else {
          this.showData = this.tableDataB.slice(0, 10)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push('/login')
      }else {
      }
    },
    watch: {
      activeName: function (val) {
        if (val === 'borrow'){
          this.show = false
          if (this.tableDataB.length <= 10) {
            this.showData = this.tableDataB
          } else {
            this.showData = this.tableDataB.slice(0, 10)
          }
          setTimeout(() => this.show = true, 500)
        }else {
          this.show = false
          if (this.tableDataR.length <= 10) {
            this.showData = this.tableDataR
          } else {
            this.showData = this.tableDataR.slice(0, 10)
          }
          setTimeout(() => this.show = true, 500)
        }
      }
    }
  }
</script>

<style scoped src="./history.css"></style>
