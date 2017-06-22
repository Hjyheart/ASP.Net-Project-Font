<template>
  <div class="main-container">
    <h1>入库</h1>
    <el-form ref="form" :model="form" label-width="80px" class="in-form">
      <el-form-item label="设备名称">
        <el-input v-model="form.name" placeholder="请输入设备名称"></el-input>
      </el-form-item>
      <el-form-item label="设备类型">
        <el-select v-model="form.type_1" placeholder="请选择设备类型">
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
            <el-select v-model="form.type_2" placeholder="请选择设备品牌">
              <el-option :label="item.name" :value="index" v-for="(item, index) in deviceType[form.type_1]"></el-option>
            </el-select>
          </el-col>
          <el-col :span="10">
            <el-select v-model="form.type_3" placeholder="请选择具体系列">
              <el-option :label="item.name" :value="index" v-for="(item, index) in deviceType[form.type_1][form.type_2].types"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="入库时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.in_time" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="保护措施">
        <el-switch on-text="" off-text="" v-model="form.is_safety"></el-switch>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" v-loading.fullscreen.lock="fullscreenLoading">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {type} from '../../assets/type'
  import {addDevice} from '../../service/fetchs'

  export default {
    data () {
      return {
        title: '入库',
        deviceType: {},
        activeName: 'in',
        form: {
          name: '',
          type_1: 'phone',
          type_2: 0,
          type_3: 0,
          in_time: '',
          is_safety: 1,
          desc: '',
          status: 1
        },
        fullscreenLoading: false
      }
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push('/login')
      }else {
      }
    },
    methods: {
      onSubmit () {
        this.fullscreenLoading = true;

        this.form.is_safety === true ? this.form.is_safety = 1 : this.form.is_safety = 0
        this.form.in_time = this.form.in_time.getFullYear() + '-' + (this.form.in_time.getMonth() + 1).toString() +
          '-' + this.form.in_time.getDate()

        addDevice(this.form).then(res => {
          console.log(res)
          this.fullscreenLoading = false;
          this.$message({
            message: '入库成功',
            type: 'success'
          });
        }).catch(err => {
          console.log(err)
          this.fullscreenLoading = false;
          this.$message({
            message: '入库失败',
            type: 'error'
          });
        })
      }
    },
    mounted () {
      document.title = this.title
      this.deviceType = type
    }
  }
</script>

<style scoped src="./inOut.css"></style>
