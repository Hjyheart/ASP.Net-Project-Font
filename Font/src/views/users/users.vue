<template>
  <div class="main-container">
    <h1>用户管理</h1>
    <div class="container">
      <el-autocomplete
        class="inline-input"
        v-model="searchInput"
        :fetch-suggestions="querySearch"
        placeholder="请输入学生信息"
        :trigger-on-focus="false"
        @select="handleSelect">
        <el-button slot="append" icon="search"></el-button>
      </el-autocomplete>
      <br>
      <transition name="slide-fade">
        <el-table
          :data="showData"
          v-if="show"
          stripe
          style="width: 100%">
          <el-table-column
            prop="id"
            label="学号">
          </el-table-column>
          <el-table-column
            prop="username"
            label="姓名">
          </el-table-column>
          <el-table-column
            label="操作">
            <template scope="scope">
              <el-button size="tiny" @click="showDetail(scope.row.id)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </transition>

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
    <el-dialog title="用户Log" :visible.sync="showUserDialog">
      <el-table :data="userLog" stripe>
        <el-table-column
          prop="time"
          label="日期">
        </el-table-column>
        <el-table-column
          prop="device_id"
          label="设备ID">
        </el-table-column>
        <el-table-column
          label="状态">
          <template scope="scope">
            <el-tag type="danger" v-if="scope.row.type === 0">借</el-tag>
            <el-tag type="success" v-if="scope.row.type === 1">还</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>

  import {getUsers, getUserHistory, deleteUser} from '../../service/fetchs'
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";

  export default {
    components: {ElButton},
    data () {
      return {
        title: '用户管理',
        searchInput: '',
        show: true,
        res: [],
        tableData: [],
        showData: [],
        userLog: [],
        showUserDialog: false,
        currentPage: 1
      }
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push('/login')
      }else {
      }
    },
    methods: {
      /**
       * For search
       * @param queryString
       * @param cb
       */
      querySearch(queryString, cb) {
        let tmp = this.res;
        let results = queryString ? tmp.filter(this.createFilter(queryString)) : tmp;

        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.indexOf(queryString) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
        this.show = false
        this.showData = []
        this.showData.push(item.item)
        setTimeout(() => this.show = true, 500)
      },
      handleDelete(id){
        deleteUser(id).then(res => {
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
          this.loadAll()
        }).catch(err => {
          console.log(err)
          this.$message({
            message: '删除失败！',
            type: 'error'
          })
        })
      },
      loadAll () {
        getUsers().then(res => {
          this.show = false
          this.tableData = res
          if (this.tableData.length <= 10) {
            this.showData = this.tableData
          } else {
            this.showData = this.tableData.slice(0, 10)
          }
          for (let i = 0; i < res.length; i++){
            this.res.push({value: res[i].id, item: res[i]})
          }
          setTimeout(() => this.show = true, 500)
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      },
      /**
       * Show user detail
       * @param id
       */
      showDetail (id) {
        this.showUserDialog = true
        getUserHistory(id).then(res => {
          this.userLog = res
          console.log(res)
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
    },
    mounted () {
      document.title = this.title
      this.loadAll()
    },
    watch: {
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

<style scoped src="./users.css"></style>
