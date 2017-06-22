<template>
  <div class="main-container">
    <h1>管理</h1>
    <el-autocomplete
      placeholder="请输入内容"
      v-model="searchInput"
      class="inline-input"
      :fetch-suggestions="querySearch"
      :trigger-on-focus="false"
      @select="handleSelect"
    >
      <el-button slot="append" icon="search"></el-button>
    </el-autocomplete>
    <br>
    <div class="container">
      <el-row :gutter="100">
        <el-col :span="12">
          <el-select v-model="searchType" placeholder="请选择设备类型">
            <el-option label="手机" value="phone"></el-option>
            <el-option label="电脑" value="computer"></el-option>
            <el-option label="平板" value="ppc"></el-option>
            <el-option label="相机" value="camera"></el-option>
            <el-option label="音响" value="player"></el-option>
            <el-option label="全部" value="all"></el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-select v-model="brand" placeholder="请选择品牌">
            <el-option :label="item.name" :value="index" v-for="(item,index) in brands"></el-option>
            <el-option label="全部" value="all"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <br>
      <el-row>
        <transition name="slide-fade">
          <el-col :span="24" v-if="show">
            <el-table
              :data="showData"
              stripe
              style="width: 1050px">
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
                label="类型">
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
                label="设备描述">
                <template scope="scope">
                  <el-button style="color: #0088f5; cursor: pointer; text-align: center" size="tiny" @click="showDesc(scope.row, scope.$index)">详情</el-button>
                </template>
              </el-table-column>
              <el-table-column
                label="是否采取安全措施">
                <template scope="scope">
                  <p v-if="tableData[scope.$index].is_safety === 1">true</p>
                  <p v-if="tableData[scope.$index].is_safety === 0">false</p>
                </template>
              </el-table-column>
              <el-table-column
                label="操作">
                <template scope="scope">
                  <el-row>
                    <el-button-group>
                      <el-button
                        size="small"
                        @click="handleEdit(scope.$index, scope.row)">改</el-button>
                      <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删</el-button>
                      <el-button
                        size="small"
                        type="warning"
                        @click="handleBorrow(scope.$index, scope.row)"
                        v-if="scope.row.status === 1">借</el-button>
                      <el-button
                        size="small"
                        type="success"
                        @click="handleReturn(scope.$index, scope.row)"
                        v-if="scope.row.status === 0">还</el-button>
                    </el-button-group>
                  </el-row>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </transition>
      </el-row>
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
    </div>
    <el-dialog title="编辑" :visible.sync="editDialogShow" v-if="dataEditForm.name !== ''">
      <el-form :model="dataEditForm" label-width="80px" class="in-form">
        <el-form-item label="设备名称">
          <el-input v-model="dataEditForm.name" placeholder="请输入设备名称"></el-input>
        </el-form-item>
        <el-form-item label="设备类型">
          <el-select v-model="dataEditForm.type_1" placeholder="请选择设备类型">
            <el-option label="手机" value="phone"></el-option>
            <el-option label="电脑" value="computer"></el-option>
            <el-option label="平板" value="pod"></el-option>
            <el-option label="相机" value="camera"></el-option>
            <el-option label="音响" value="player"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="具体型号">
          <el-row :gutter='10'>
            <el-col :span="10">
              <el-select v-model="dataEditForm.type_2" placeholder="请选择设备品牌">
                <el-option :label="item.name" :value="index" v-for="(item, index) in deviceType[dataEditForm.type_1]"></el-option>
              </el-select>
            </el-col>
            <el-col :span="10">
              <el-select v-model="dataEditForm.type_3" placeholder="请选择具体系列">
                <el-option :label="item.name" :value="index" v-for="(item, index) in deviceType[dataEditForm.type_1][dataEditForm.type_2].types"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="保护措施">
          <el-switch on-text="" off-text="" v-model="dataEditForm.is_safety"></el-switch>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="dataEditForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitEdit" v-loading.fullscreen.lock="fullscreenLoading">修改</el-button>
          <el-button type="error" @click="closeEditDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="删除" :visible.sync="deleteDialogShow" size="tiny">
      <span>确定删除</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="deleteDevice">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="设备描述" :visible.sync="descDialogShow" size="tiny">
      <p>{{descText}}</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="descDialogShow=false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="借阅登记" :visible.sync="enterUserBorrow" size="tiny">
      <el-input v-model="user" placeholder="请输入学号"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="borrow">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="归还登记" :visible.sync="enterUserReturn" size="tiny">
      <el-input v-model="user" placeholder="请输入学号"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="back">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {getAllDevice, editDevice, deleteDevice, getDeviceInfo, addRelationship, deleteRelationship} from '../../service/fetchs'
  import {type} from '../../assets/type'

  export default {
    data () {
      return {
        title: '管理',
        show: false,
        searchInput: '',
        selectValue: '',
        res: [],
        deviceType: {},
        searchType: 'all',
        alpha: 'all',
        brands: [],
        brand: 'all',
        user: '',
        tableData: [],
        showData: [],
        currentPage: 1,
        editDialogShow: false,
        deleteDialogShow: false,
        descDialogShow: false,
        enterUserBorrow: false,
        enterUserReturn: false,
        descText: '',
        curIndex: -1,
        fullscreenLoading: false,
        dataEditForm: {
          id: -1,
          name: '',
          type_1: '',
          type_2: 0,
          type_3: 0,
          in_time: '',
          is_safety: 1,
          desc: '',
          status: 0
        }
      }
    },
    methods: {
      /**
       * Show desc
       */
      showDesc (row, index){
        console.log(row)
        this.descDialogShow = true
        this.descText = row.desc
      },
      /**
       * For searching
       */
      querySearch(queryString, cb){
        let res = this.res
        let tmp = queryString ? res.filter(this.createFilter(queryString)) : res
        cb(tmp)
      },
      createFilter (queryString) {
        return (res) => {
          return (res.value.indexOf(queryString) === 0)
        }
      },
      handleSelect(item) {
        console.log(item);
        this.show = false
        this.showData = []
        this.showData.push(item.item)
        setTimeout(() => this.show = true, 500)
      },
      loadAll () {
        getAllDevice().then(res => {
          for (let i = 0; i < res.length; i++){
            res[i].type_2 = parseInt(res[i].type_2)
            res[i].type_3 = parseInt(res[i].type_3)
          }
          this.tableData = res
          if (this.tableData.length <= 10) {
            this.showData = this.tableData
          } else {
            this.showData = this.tableData.slice(0, 10)
          }

          for (let i = 0; i < res.length; i++){
            this.res.push({value: res[i].name, item: res[i]})
          }

        }).catch(err => {
          console.log(err)
        })
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
       * For edit
       * @param index
       * @param row
       */
      handleEdit(index, row) {
        this.curIndex = index
        this.editDialogShow = true
        this.dataEditForm.id = this.showData[index].id
        this.dataEditForm.name = this.showData[index].name
        this.dataEditForm.type_1 = this.showData[index].type_1
        this.dataEditForm.type_2 = this.showData[index].type_2
        this.dataEditForm.type_3 = this.showData[index].type_3
        this.dataEditForm.in_time = this.showData[index].in_time
        this.dataEditForm.is_safety = this.showData[index].is_safety
        this.dataEditForm.desc = this.showData[index].desc
      },
      onSubmitEdit () {
        this.editDialogShow = false
        this.fullscreenLoading = true;

        this.dataEditForm.is_safety === true ? this.dataEditForm.is_safety = 1 : this.dataEditForm.is_safety = 0

        console.log(this.dataEditForm)
        editDevice(this.dataEditForm.id, this.dataEditForm).then(res => {
          console.log(res)
          this.tableData[this.curIndex] = this.dataEditForm
          this.curIndex = -1
          this.dataEditForm = {
            id: -1,
            name: '',
            type_1: '',
            type_2: 0,
            type_3: 0,
            in_time: '',
            is_safety: 0,
            desc: '',
            status: 0
          }
          this.fullscreenLoading = false
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.loadAll()
        }).catch(err => {
          console.log(err)
          this.curIndex = -1
          this.dataEditForm = {
            name: '',
            type_1: '',
            type_2: 0,
            type_3: 0,
            date: '',
            safe: 0,
            desc: ''
          }
          this.fullscreenLoading = false
          this.$message({
            message: '失败了',
            type: 'error'
          });
        })
      },
      closeEditDialog () {
        this.editDialogShow = false
        this.show = false
        setTimeout(() => this.show = true, 500)
      },
      /**
       * For delete
       * @param index
       * @param row
       */
      handleDelete(index, row) {
        console.log(index, row);
        this.curIndex = index
        this.deleteDialogShow = true
      },
      deleteDevice() {
        this.deleteDialogShow = false
        deleteDevice(this.showData[this.curIndex].id).then(res => {
          console.log(res)
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.show = false
          getAllDevice().then(res => {
            for (let i = 0; i < res.length; i++){
              res[i].type_2 = parseInt(res[i].type_2)
              res[i].type_3 = parseInt(res[i].type_3)
            }
            this.tableData = res
            if (this.tableData.length <= 10) {
              this.showData = this.tableData
            } else {
              this.showData = this.tableData.slice(0, 10)
            }
            this.show = true
          })
          this.curIndex = -1
        }).catch(err => {
          console.log(err)
          this.$message({
            message: '删除失败',
            type: 'error'
          });
          this.curIndex = -1
        })

      },
      /**
       * For borrowing
       */
      borrow() {
        this.enterUserBorrow = false
        addRelationship(this.showData[this.curIndex].id, this.user).then(res => {
          this.$message({
            message: '借阅成功',
            type: 'success'
          })
          this.loadAll()
        }).catch(err => {
          console.log(err)
          this.$message({
            message: '借阅失败',
            type: 'error'
          })
        })
      },
      handleBorrow (index, row) {
        this.curIndex = index
        this.enterUserBorrow = true
      },
      /**
       * For returning
       */
      back(){
        this.enterUserReturn = false
        deleteRelationship(this.showData[this.curIndex].id, this.user).then(res => {
          this.$message({
            message: '还成功',
            type: 'success'
          })
          this.loadAll()
        }).catch(err => {
          console.log(err)
          this.$message({
            message: '还失败',
            type: 'error'
          })
        })
      },
      handleReturn (index, row) {
        this.enterUserReturn = true
        this.curIndex = index
      }
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push('/login')
      }else {
      }
    },
    mounted () {
      document.title = this.title
      this.deviceType = type
      this.loadAll()

//      console.log(this.type['phone'][0].name)

      setTimeout(() => this.show = true, 500)
    },
    watch: {
      searchType: function (val) {
        this.show = false

        if (val === 'all'){
          if (this.tableData.length <= 10) {
            this.showData = this.tableData
          } else {
            this.showData = this.tableData.slice(0, 10)
          }
          setTimeout(() => this.show = true, 500)
          return
        }

        this.brands = this.deviceType[val]
        let tmp = []
        for (let i = 0; i < this.tableData.length; i++){
          if (val === this.tableData[i].type_1) {
            tmp.push(this.tableData[i])
          }
        }
        this.showData = tmp
        setTimeout(() => this.show = true, 500)
      },
      brand: function (val) {
        this.show = false

        if (val === 'all'){
          let tmp = []
          for (let i = 0; i < this.tableData.length; i++){
            if (this.searchType === this.tableData[i].type_1) {
              tmp.push(this.tableData[i])
            }
          }
          this.showData = tmp
          setTimeout(() => this.show = true, 500)
          return
        }

        let tmp = []
        for (let i = 0; i < this.tableData.length; i++){
          if (val === this.tableData[i].type_2 && this.searchType === this.tableData[i].type_1) {
            tmp.push(this.tableData[i])
          }
        }
        this.showData = tmp
        setTimeout(() => this.show = true, 500)
      },
      searchInput: function (val) {
        if (val === '') {
          this.show = false
          if (this.tableData.length <= 10) {
            this.showData = this.tableData
          } else {
            this.showData = this.tableData.slice(0, 10)
          }
          setTimeout(() => this.show = true, 500)
        }
      }
    }
  }
</script>

<style scoped src="./manage.css"></style>
