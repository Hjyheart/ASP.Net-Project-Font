<template>
  <div class="main-container">
    <h1>搜索</h1>
    <el-autocomplete
      placeholder="请输入内容"
      v-model="searchInput"
      class="inline-input"
      :fetch-suggestions="querySearch"
      :trigger-on-focus="false"
      @select="handleSelect"
    >
      <el-select v-model="selectValue" slot="prepend" placeholder="请选择">
        <el-option label="电脑" value="1"></el-option>
        <el-option label="手机" value="2"></el-option>
        <el-option label="平板" value="3"></el-option>
        <el-option label="音响" value="4"></el-option>
      </el-select>
      <el-button slot="append" icon="search"></el-button>
    </el-autocomplete>

    <div :class="['item-list-container', switchPanel ? 'active':'']">
      <div :class="['item-list', active ? 'active':'', switchPanel ? 'hidden': '']">
        <el-row :gutter="20">
          <el-col :span="12">
            <transition name="slide-fade" v-for="(item, index) in test.slice(0, 3)" :key="index" v-if="test.length >= 3">
              <el-card :body-style="{padding: '0px'}" v-if="item.show">
                <img :src="item.url">
                <div style="padding: 14px;">
                  <span>电脑</span>
                  <div class="bottom clearfix">
                    <el-button type="text" class="button" @click="showDetail(item)">详情</el-button>
                  </div>
                </div>
              </el-card>
            </transition>
            <transition name="slide-fade" v-for="(item, index) in test" :key="index" v-if="test.length < 3">
              <el-card :body-style="{padding: '0px'}" v-if="item.show">
                <img :src="item.url">
                <div style="padding: 14px;">
                  <span>电脑</span>
                  <div class="bottom clearfix">
                    <el-button type="text" class="button" @click="showDetail(item)">详情</el-button>
                  </div>
                </div>
              </el-card>
            </transition>
          </el-col>
          <el-col :span="12">
            <transition name="slide-fade" v-for="(item, index) in test.slice(4, 6)" :key="index" v-if="test.length >= 6">
              <el-card :body-style="{padding: '0px'}" v-if="item.show">
                <img :src="item.url">
                <div style="padding: 14px;">
                  <span>电脑</span>
                  <div class="bottom clearfix">
                    <el-button type="text" class="button" @click="showDetail(item)">详情</el-button>
                  </div>
                </div>
              </el-card>
            </transition>
            <transition name="slide-fade" v-for="(item, index) in test.slice(4, test.length)" :key="index" v-if="test.length < 6">
              <el-card :body-style="{padding: '0px'}" v-if="item.show">
                <img :src="item.url">
                <div style="padding: 14px;">
                  <span>电脑</span>
                  <div class="bottom clearfix">
                    <el-button type="text" class="button" @click="showDetail(item)">详情</el-button>
                  </div>
                </div>
              </el-card>
            </transition>
          </el-col>
        </el-row>
        <el-row>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="6"
            layout="total, prev, pager, next"
            :total="test.length">
          </el-pagination>
        </el-row>
      </div>
      <transition name="slide-fade">
        <el-row v-if="switchPanel">
          <el-button type="warning" @click="goBack">返回</el-button>
        </el-row>
      </transition>
      <br>
      <transition name="slide-fade">
        <el-row v-if="switchPanel">
          <div :class="['item-detail', switchPanel ? 'active':'']" v-if="switchPanel">
            <transition name="slid-fade">
              <el-table
                :data="tableData"
                stripe
                style="width: 1000px">
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
                  prop="type1"
                  label="品牌">
                </el-table-column>
                <el-table-column
                  prop="type2"
                  label="具体型号">
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
                      <el-button
                        size="small"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    </el-row>
                    <el-row>
                      <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </el-row>
                  </template>
                </el-table-column>
              </el-table>
            </transition>
          </div>
        </el-row>
      </transition>
    </div>

    <el-dialog title="编辑" :visible.sync="editDialogShow">
      <el-form ref="editDataForm" :model="dataEditForm" label-width="80px">
        <el-form-item label="设备名称">
          <el-input v-model="dataEditForm.name" placeholder="请输入设备名称"></el-input>
        </el-form-item>
        <el-form-item label="设备型号">
          <el-input v-model="dataEditForm.number" placeholder="请输入设备型号"></el-input>
        </el-form-item>
        <el-form-item label="设备类型">
          <el-select v-model="dataEditForm.type" placeholder="请选择设备类型">
            <el-option label="手机" value="phone"></el-option>
            <el-option label="电脑" value="computer"></el-option>
            <el-option label="平板" value="pod"></el-option>
            <el-option label="相机" value="camera"></el-option>
            <el-option label="音响" value="player"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入库时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="dataEditForm.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2"> &nbsp; </el-col>
          <el-col :span="11">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="dataEditForm.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="保护措施">
          <el-switch on-text="" off-text="" v-model="dataEditForm.safe"></el-switch>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="dataEditForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitEdit" v-loading.fullscreen.lock="fullscreenLoading">确认提交</el-button>
          <el-button @click="editDialogShow=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

  import {getAllDevice} from '../../service/fetchs'
  import {type} from '../../assets/type'

  export default {
    // TODO: 给设备划定页数
    data () {
      return {
        title: '查询',
        type: {},
        searchInput: '',
        selectValue: '',
        res: [],
        test: [
          {
            url: '../../../static/img/computer-default.jpg',
            show: false
          },
          {
            url: '../../../static/img/camera-default.jpg',
            show: false
          },
          {
            url: '../../../static/img/phone-default.jpg',
            show: false
          },
          {
            url: '../../../static/img/camera-default.jpg',
            show: false
          },
          {
            url: '../../../static/img/computer-default.jpg',
            show: false
          },
          {
            url: '../../../static/img/player-default.jpg',
            show: false
          },
        ],
        currentPage: 1,
        active: false,
        switchPanel: false,
        tableData: [{
          name: '小米6',
          type: 'phone',
          type1: 0,
          type2: 10,
          date: '2017-5-1',
          safe: false,
          desc: '无敌的小米6'
        }],
        editDialogShow: false,
        deleteDialogShow: false,
        dataEditForm: {}
      }
    },
    methods: {
      /**
       * For search
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
       * For pagination
       */
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      /**
       * For item detail
       */
      showDetail (item) {
        this.active = true
        setTimeout(() => this.switchPanel = true, 1000)
      },
      goBack () {
        this.switchPanel = false
        setTimeout(() => this.active = false, 1500)
      },
      /**
       * For op
       */
      handleEdit(index, row) {
        console.log(index, row);
        this.editDialogShow = true
        this.dataEditForm = this.tableData[index]
        if (this.dataEditForm['safe'] === 'true'){
          this.dataEditForm['safe'] = true
        }else {
          this.dataEditForm['safe'] = false
        }
      },
      onSubmitEdit () {
        this.editDialogShow = false
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.dataEditForm['safe'] = this.dataEditForm['safe'].toString()
          this.tableData[0] = this.dataEditForm
          this.dataEditForm = {}
          this.fullscreenLoading = false;
          this.$message({
            message: '修改成功',
            type: 'success'
          });
        }, 1000);
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.deleteDialogShow = true
      }
    },
    mounted () {
      document.title = this.title
      this.loadAll()
      setTimeout(() => {
        this.test.forEach(i => i.show = true, 1000)
      })
    },
    watch: {
      searchInput: (val) => {
        console.log(val)
      }
    }
  }
</script>

<style scoped src="./search.css"></style>
