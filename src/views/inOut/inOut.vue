<template>
  <div class="main-container">
    <h1>入库</h1>
    <el-form ref="form" :model="form" label-width="80px" class="in-form">
      <el-form-item label="设备名称">
        <el-input v-model="form.name" placeholder="请输入设备名称"></el-input>
      </el-form-item>
      <el-form-item label="设备昵称">
        <el-input v-model="form.nikename" placeholder="请输入设备昵称"></el-input>
      </el-form-item>
      <el-form-item label="设备类型">
        <el-select v-model="form.type" placeholder="请选择设备类型">
          <el-option label="手机" value="phone"></el-option>
          <el-option label="电脑" value="computer"></el-option>
          <el-option label="平板" value="pod"></el-option>
          <el-option label="相机" value="camera"></el-option>
          <el-option label="音响" value="player"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="具体型号">
        <el-row gutter=10>
          <el-col :span="10">
            <el-select v-model="form.type1" placeholder="请选择设备品牌">
              <el-option :label="item.name" :value="index" v-for="(item, index) in type[form.type]"></el-option>
            </el-select>
          </el-col>
          <el-col :span="10">
            <el-select v-model="form.type2" placeholder="请选择具体系列">
              <el-option :label="item.name" :value="item.name" v-for="(item, index) in type[form.type][form.type1].types"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="入库时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="保护措施">
        <el-switch on-text="" off-text="" v-model="form.safe"></el-switch>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" v-loading.fullscreen.lock="fullscreenLoading">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
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
  import {type} from '../../assets/type'

  export default {
    data () {
      return {
        title: '入库',
        type: {},
        activeName: 'in',
        form: {
          name: '',
          nikename: '',
          type: 'phone',
          type1: 0,
          type2: '',
          date: '',
          safe: false,
          desc: ''
        },
        fullscreenLoading: false,
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
      onSubmit () {
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
          this.$message({
            message: '入库成功',
            type: 'success'
          });
        }, 1000);
      }
    },
    watch: {
      form: function (val) {

      }
    },
    mounted () {
      document.title = this.title
//      this.open()
      console.log(type)
      this.type = type
    }
  }
</script>

<style scoped src="./inOut.css"></style>
