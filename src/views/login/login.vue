<template>
  <div class="main-container">
    <transition name="slide-fade">
      <div class="login-form" v-if="!register && show">
        <div class="username">
          <input type="text" placeholder="学号" v-model="id" autofocus>
          <i class="fa fa-user-circle"></i>
        </div>
        <div class="password">
          <input type="password" v-model="password" placeholder="密码" @keyup.enter="onSubmit">
          <i class="fa fa-arrow-right"></i>
        </div>
      </div>
    </transition>
    <transition name="slide-fade">
      <div class="register-form" v-if="register">
        <div class="username">
          <input type="text" placeholder="学号" v-model="id" autofocus>
        </div>
        <div class="username">
          <input type="text" placeholder="用户名" v-model="username" autofocus>
        </div>
        <div class="password">
          <input type="password" v-model="password" placeholder="密码">
        </div>
        <div class="password">
          <input type="password" v-model="repassword" placeholder="确认密码" @keyup.enter="onSubmit">
          <i class="fa fa-arrow-right"></i>
        </div>
      </div>
    </transition>
    <transition name="slide-up">
      <a v-if="show" @click="register=!register">{{text}}</a>
    </transition>
    <transition name="slide-up">
      <h2 v-if="show">俱乐部设备管理系统 <span>v1.0</span></h2>
    </transition>
  </div>
</template>

<script>

  import {checkUser, addUser} from '../../service/fetchs'

  export default {
    data () {
      return {
        title: '登录',
        id: '',
        username: '',
        password: '',
        repassword: '',
        show: false,
        register: false,
        text: '注册'
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
        if (!this.register){
          if (this.id === '') {
            this.$message({
              message: '请输入学号',
              type: 'warning'
            })
            return
          }
          if (this.password === '') {
            this.$message({
              message: '请输入密码',
              type: 'warning'
            })
            return
          }
          checkUser(this.id, this.password).then(res => {
            if (res === true){
              this.$session.start()
              this.$session.set('Auth', this.id)
              this.$router.push('/manage')
            }else if (res === false){
              this.$message({
                message: '账号或密码错误',
                type: 'error'
              })
            }

          }).catch(err => {

          })
        }else {
          if (this.id === '') {
            this.$message({
              message: '请输入学号',
              type: 'warning'
            })
            return
          }
          if (this.username === '') {
            this.$message({
              message: '请输入用户名',
              type: 'warning'
            })
            return
          }
          if (this.password === '') {
            this.$message({
              message: '请输入密码',
              type: 'warning'
            })
            return
          }
          if (this.repassword === '') {
            this.$message({
              message: '请确认密码',
              type: 'warning'
            })
            return
          }
          if (this.repassword !== this.password) {
            this.$message({
              message: '密码不匹配',
              type: 'error'
            })
            return
          }

          addUser(this.id, this.username, this.password).then(res => {
            this.$session.start()
            this.$session.set('Auth', this.id)
            this.$router.push('/manage')
          }).catch(err => {
            this.$message({
              message: '创建失败，请重试',
              type: 'error'
            })
          })
        }
      }
    },
    beforeCreate: function () {
      if (this.$session.exists()) {
        this.$router.push('/manage')
      }else {
      }
    },
    mounted () {
      document.title = this.title
      document.body.style.height = '100%'
      setTimeout(() => this.show = true, 500)
    }
  }
</script>

<style scoped src="./login.css"></style>

