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
            <el-option label="平板" value="pod"></el-option>
            <el-option label="相机" value="camera"></el-option>
            <el-option label="音响" value="player"></el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-select v-model="brands" placeholder="请选择品牌">
            <el-option :label="item.name" :value="item.name" v-for="item in brands"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <br>
      <el-row>
        <transition name="slide-fade">
          <el-col :span="24" v-if="show">
            <el-table
              :data="tableData"
              stripe
              style="width: 1050px">
              <el-table-column
                prop="date"
                label="入库日期">
              </el-table-column>
              <el-table-column
                prop="name"
                label="设备名称">
              </el-table-column>
              <el-table-column
                prop="type"
                label="类型">
              </el-table-column>
              <el-table-column
                label="品牌">
                <template scope="scope">
                  <p>{{type[tableData[scope.$index].type][tableData[scope.$index].type1].name}}</p>
                </template>
              </el-table-column>
              <el-table-column
                label="具体型号">
                <template scope="scope">
                  <p>{{type[tableData[scope.$index].type][tableData[scope.$index].type1].types[tableData[scope.$index].type2].name}}</p>
                </template>
              </el-table-column>
              <el-table-column
                prop="desc"
                label="设备描述">
              </el-table-column>
              <el-table-column
                label="是否采取安全措施">
                <template scope="scope">
                  <p v-if="tableData[scope.$index].safe">true</p>
                  <p v-if="!tableData[scope.$index].safe">false</p>
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
                        type="warning" v-if="scope.$index % 2 === 0">借</el-button>
                      <el-button
                        size="small"
                        type="success" v-if="scope.$index % 2 !== 0">还</el-button>
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
          :page-size="20"
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
          <el-select v-model="dataEditForm.type" placeholder="请选择设备类型" @change="changeType">
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
              <el-select v-model="dataEditForm.type1" placeholder="请选择设备品牌" @change="changeType1">
                <el-option :label="item.name" :value="index" v-for="(item, index) in type[dataEditForm.type]"></el-option>
              </el-select>
            </el-col>
            <el-col :span="10">
              <el-select v-model="dataEditForm.type2" placeholder="请选择具体系列">
                <el-option :label="item.name" :value="index" v-for="(item, index) in type[dataEditForm.type][dataEditForm.type1].types"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="入库时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="dataEditForm.date" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="保护措施">
          <el-switch on-text="" off-text="" v-model="dataEditForm.safe"></el-switch>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="dataEditForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitEdit" v-loading.fullscreen.lock="fullscreenLoading">立即创建</el-button>
          <el-button type="error" @click="closeEditDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="删除" :visible.sync="deleteDialogShow" size="tiny">
      <span>确定删除</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="deleteDialogShow = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {getAllDevice, editDevice} from '../../service/fetchs'
  import {type} from '../../assets/type'

  export default {
    data () {
      return {
        title: '管理',
        show: false,
        searchInput: '',
        selectValue: '',
        res: [],
        type: {},
        searchType: '',
        alpha: 'all',
        brands: [],
        tableData: [
          {
            name: '无敌小米',
            type: 'phone',
            type1: 0,
            type2: 1,
            date: '2017-1-1',
            safe: false,
            desc: '无敌'
          },
          {
            name: '无敌大米',
            type: 'phone',
            type1: 1,
            type2: 3,
            date: '2017-1-1',
            safe: false,
            desc: '不无敌'
          }],
        currentPage: 1,
        editDialogShow: false,
        deleteDialogShow: false,
        curIndex: -1,
        fullscreenLoading: false,
        dataEditForm: {
          name: '',
          type: '',
          type1: 0,
          type2: 0,
          date: '',
          safe: false,
          desc: ''
        }
      }
    },
    methods: {
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
        // TODO: 点击切到某一条
        this.show = false
        setTimeout(() => this.show = true, 500)
      },
      loadAll () {
        getAllDevice().then(res => {
          this.res = res
        }).catch(err => {
          console.log(err)
        })

        this.res = [
          { value: '张尹嘉'},
          { value: '夏陈'},
          { value: '洪嘉勇'},
          { value: 'iphone'}
        ]
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
       * For edit
       * @param index
       * @param row
       */
      handleEdit(index, row) {
        this.curIndex = index
        this.editDialogShow = true
        this.dataEditForm.name = this.tableData[index].name
        this.dataEditForm.type = this.tableData[index].type
        this.dataEditForm.type1 = this.tableData[index].type1
        this.dataEditForm.type2 = this.tableData[index].type2
        this.dataEditForm.date = this.tableData[index].date
        this.dataEditForm.safe = this.tableData[index].safe
        this.dataEditForm.desc = this.tableData[index].desc
      },
      onSubmitEdit () {
        this.editDialogShow = false
        this.fullscreenLoading = true;

        // TODO: 这里是接口

        editDevice(this.dataEditForm).then(res => {
          console.log(res)
          this.tableData[this.curIndex] = this.dataEditForm
          this.curIndex = -1
          this.dataEditForm = {}
          this.fullscreenLoading = false
          this.$message({
            message: '修改成功',
            type: 'success'
          });
        }).catch(err => {
          console.log(err)
          this.curIndex = -1
          this.dataEditForm = {}
          this.fullscreenLoading = false
          this.$message({
            message: '失败了',
            type: 'error'
          });
        })
      },
      changeType () {
        this.dataEditForm.type1 = this.type[this.dataEditForm.type]
      },
      changeType1 () {
        this.dataEditForm.type2 = this.type[this.dataEditForm.type][this.dataEditForm.type1].types
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
        this.deleteDialogShow = true
      }
    },
    mounted () {
      document.title = this.title
      this.type = type
      this.loadAll()
      setTimeout(() => this.show = true, 500)
    },
    watch: {
      searchType: function (val) {
        this.brands = type[val]
        console.log(this.brands)
        // TODO: 改变列表
        this.show = false
        setTimeout(() => this.show = true, 500)
      },
      brands: function (val) {
        // TODO: 改变列表
        this.show = false
        setTimeout(() => this.show = true, 500)
      }
    }
  }
</script>

<style scoped src="./manage.css"></style>
