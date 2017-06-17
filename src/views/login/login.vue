<template>
  <div class="main-container">
    <transition name="slide-fade">
      <div class="login-form" v-if="!register && show">
        <div class="avatar">
          <img src="../../../static/img/avatar.jpg" alt="avatar">
        </div>
        <div class="username">
          <input type="text" placeholder="用户名" v-model="username" autofocus>
        </div>
        <div class="password">
          <input type="password" v-model="password" placeholder="密码" @keyup.enter="onSubmit">
          <div>
            <i class="fa fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </transition>
    <transition name="slide-up">
      <div class="register-form" v-if="register">
        <h1>注册</h1>
        <div class="username">
          <input type="text" placeholder="用户名" v-model="username" autofocus>
        </div>
        <div class="password" style="width: 100%">
          <input type="password" v-model="password" placeholder="密码">
        </div>
        <div class="password" style="width: 100%">
          <input type="password" v-model="repassword" placeholder="重新输入密码" @keyup.enter="onSubmit">
        </div>
        <el-button type="success" size="small">确认提交</el-button>
      </div>
    </transition>
    <transition name="slide-up">
      <a v-if="show" @click="register=!register">{{text}}</a>
    </transition>
    <transition name="slide-up">
      <h2 v-if="show">俱乐部设备管理系统</h2>
    </transition>
    <transition name="slide-up">
      <span v-if="show">.Net课设 1452822 洪嘉勇 1452716 张尹嘉</span>
    </transition>
  </div>
</template>

<script>
  import {getUsers} from '../../service/fetchs'
  import $ from 'jquery'

  export default {
    data () {
      return {
        title: '登录',
        username: '',
        password: '',
        repassword: '',
        show: false,
        text: '注册',
        register: false
      }
    },
    watch: {
      register: function (val) {
        if (val === true) {
          this.text = '登录'
        }else {
          this.text = '注册'
        }
      }
    },
    methods: {
      onSubmit () {
        console.log(this.username)
        console.log(this.password)

        this.$session.start()
        this.$session.set('Auth', this.username)
        this.$router.push('/admin-in-out')
      }
    },
    beforeCreate: function () {
      if (this.$session.exists()) {
        this.$router.push('/admin-in-out')
      }else {
//        this.$session.start()
//        this.$session.set('Auth', 'test')
//        this.$router.push('/search')
      }
    },
    mounted () {
      document.title = this.title
      document.body.style.height = '100%'
      setTimeout(() => this.show = true, 500)

//      $.ajax({
//        method: 'GET',
//        url: 'http://192.168.1.110:58620/api/user'
//      }).done( res=>{
//        console.log(res);
//      }).catch( err=>{
//        console.log(err);
//      });

      var formData = new FormData()
      formData.append('id', 2)
      formData.append('account', 'test')
      formData.append('passwd', 'test')

      $.ajax({
        method: 'POST',
        url: 'http://192.168.1.110:58620/api/user',
        data: formData,
        processData: false
//        params: {
//          'id': 2,
//          'account': 'test',
//          'passwd': 'test'
//        }
      }).done( res=>{
        console.log(res);
      }).catch( err=>{
        console.log(err);
      });

    }
  }
</script>

<style scoped src="./login.css"></style>
