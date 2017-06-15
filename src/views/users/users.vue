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
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="id"
          label="学号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别">
        </el-table-column>
        <el-table-column
          label="操作">
          <template scope="scope">
            <p class="detail" @click="showDetail(scope.row.id)">详情</p>
          </template>
        </el-table-column>
      </el-table>
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
    <el-dialog title="设备详情" :visible.sync="showUserDialog">
      <el-table :data="userLog" stripe>
        <el-table-column
          prop="date1"
          label="借日期">
        </el-table-column>
        <el-table-column
          prop="date2"
          label="还日期">
        </el-table-column>
        <el-table-column
          prop="name"
          label="设备名称">
        </el-table-column>
        <el-table-column
          prop="type"
          label="型号">
        </el-table-column>
        <el-table-column
          label="状态">
          <template scope="scope">
            <el-tag type="danger">{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: '用户管理',
        searchInput: '',
        res: [],
        tableData: [
          {
            id: 1452822,
            name: '洪嘉勇',
            sex: '男'
          }
        ],
        userLog: [
          {
            'date1': '2017-6-8',
            'date2': '2017-6-10',
            'name': 'iphone',
            'type': 'se',
            'status': '超期1天'
          }
        ],
        showUserDialog: false,
        currentPage: 1
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
      },
      loadAll () {
        return [
          {
            value: '洪嘉勇',
            id: 1452822
          },
          {
            value: '夏陈',
            id: 1453094
          }
        ]
      },
      /**
       * Show user detail
       * @param id
       */
      showDetail (id) {
        this.showUserDialog = true
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
      }
    },
    mounted () {
      document.title = this.title
      this.res = this.loadAll()
    }
  }
</script>

<style scoped src="./users.css"></style>
