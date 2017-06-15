<template>
  <div class="main-container">
    <h1>管理</h1>
    <div class="container">
      <el-row :gutter="100">
        <el-col :span="12">
          <el-select v-model="type" placeholder="请选择设备类型">
            <el-option label="手机" value="phone"></el-option>
            <el-option label="电脑" value="computer"></el-option>
            <el-option label="平板" value="pod"></el-option>
            <el-option label="相机" value="camera"></el-option>
            <el-option label="音响" value="player"></el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-select v-model="alpha" placeholder="请选择首字母">
            <el-option :label="item" :value="item" v-for="item in alphas"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <br>
      <el-row>
        <el-col :span="24">
          <el-table
            :data="tableData"
            stripe
            style="width: 1050px">
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
    <el-dialog title="编辑" :visible.sync="editDialogShow">
      <el-form ref="editDataForm" :model="dataEditForm" label-width="80px">
        <el-form-item label="设备名称">
          <el-input v-model="dataEditForm.name" placeholder="请输入设备名称"></el-input>
        </el-form-item>
        <el-form-item label="设备昵称">
          <el-input v-model="dataEditForm.nikename" placeholder="请输入设备昵称"></el-input>
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
  export default {
    data () {
      return {
        title: '管理',
        type: '',
        alpha: 'all',
        alphas: [
          'all', 'A','B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
          'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        ],
        tableData: [
          {
            name: 'mac pro',
            nikename: 'hjyheart',
            number: '最新款',
            type: 'computer',
            date1: '2017-6-7',
            date2: '',
            safe: "false",
            desc: '无敌'
          },
          {
            name: 'iphone 8',
            nikename: '小8',
            number: '最新款',
            type: 'phone',
            date1: '2017-6-7',
            date2: '',
            safe: "false",
            desc: '无敌'
          }],
        currentPage: 1,
        editDialogShow: false,
        deleteDialogShow: false,
        curIndex: -1,
        dataEditForm: {}
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
      },
      /**
       * For edit
       * @param index
       * @param row
       */
      handleEdit(index, row) {
        console.log(index, row);
        this.curIndex = index
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
          this.tableData[this.curIndex] = this.dataEditForm
          this.curIndex = -1
          this.dataEditForm = {}
          this.fullscreenLoading = false;
          this.$message({
            message: '修改成功',
            type: 'success'
          });
        }, 1000);
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
    }
  }
</script>

<style scoped src="./manage.css"></style>
