<template>
  <div class="main-container" v-if="show !== '/login'">
    <div class="logo">
      <p>管理控制台</p>
    </div>
    <div class="block" @mouseover="searchActive = false"></div>
    <div class="others">
      <div class="user"  @mouseover="userActive = true;searchActive = false" @click="toAdmin">
        <i class="fa fa-user"></i>
        <p>{{username}}</p>
      </div>
      <div class="logout" @click="logout">
        <i class="fa fa-sign-out"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        show: '',
        username: ''
      }
    },
    mounted () {
      this.show = this.$route.path
      this.username = this.$session.get('Auth')
    },
    methods: {
      logout () {
        this.$session.destroy()
        this.$router.push('/login')
      },
      toAdmin () {
        this.$router.push({'name': 'admin'})
      }
    },
    watch: {
      '$route' (to, from) {
        this.show = to.path
        console.log(to.path)
        if (to.path === '/login') {
          document.body.style.height = '100%'
        }else {
          document.body.style.height = 'calc(100% - 50px)'
        }
      }
    }
  }
</script>

<style scoped src="./bar.css"></style>
