<template>
  <div class="main-container">
    <h1>管理员</h1>
    <div class="container">
      <el-form :model="form" label-width="80px">
        <el-form-item label="旧密码">
          <el-input v-model="form.oldPwd"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="form.newPwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">修改密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: '管理员',
        form: {
          oldPwd:'',
          newPwd:''
        }
      }
    },
    methods: {
      onSubmit () {

      }
    },
    mounted () {
      document.title = this.title
    }
  }
</script>

<style scoped src="./admin.css"></style>
