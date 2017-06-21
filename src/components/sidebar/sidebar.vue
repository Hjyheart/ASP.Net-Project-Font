<template>
  <div :class="['main-container', active ? 'active':'']" v-if="show !== '/login'">
    <div class="three" @mouseover="three='../../../static/icon/three1.svg'"  @mouseout="three='../../../static/icon/three.svg'" @click="active = !active">
      <img :src="three" alt="">
    </div>
    <div class="item" @mouseover="activeId=1" @mouseout="activeId=-1" @click="to('/admin-in-Out')">
      <img src="../../../static/icon/more.svg" alt="">
      <p>入库</p>
      <div :class="['aside', (active && activeId === 1) ? 'active':'']">
        <span>入库</span>
      </div>
    </div>
    <div class="item" @mouseover="activeId=2" @mouseout="activeId=-1" @click="to('/manage')">
      <img src="../../../static/icon/more.svg" alt="">
      <p>管理</p>
      <div :class="['aside', (active && activeId === 2) ? 'active':'']">
        <span>管理</span>
      </div>
    </div>
    <div class="item" @mouseover="activeId=3" @mouseout="activeId=-1" @click="to('/statistic')">
      <img src="../../../static/icon/more.svg" alt="">
      <p>统计</p>
      <div :class="['aside', (active && activeId === 3) ? 'active':'']">
        <span>统计</span>
      </div>
    </div>
    <div class="item" @mouseover="activeId=4" @mouseout="activeId=-1" @click="to('/recommendation')">
      <img src="../../../static/icon/more.svg" alt="">
      <p>推荐</p>
      <div :class="['aside', (active && activeId === 4) ? 'active':'']">
        <span>推荐</span>
      </div>
    </div>
    <div class="item" @mouseover="activeId=5" @mouseout="activeId=-1" @click="to('/history')">
      <img src="../../../static/icon/more.svg" alt="">
      <p>历史</p>
      <div :class="['aside', (active && activeId === 5) ? 'active':'']">
        <span>历史</span>
      </div>
    </div>
    <div class="item" @mouseover="activeId=6" @mouseout="activeId=-1" @click="to('/users')">
      <img src="../../../static/icon/more.svg" alt="">
      <p>用户</p>
      <div :class="['aside', (active && activeId === 6) ? 'active':'']">
        <span>用户</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        three: '../../../static/icon/three.svg',
        active: false,
        activeId: -1,
        show: ''
      }
    },
    methods: {
      to (url) {
        this.$router.push(url)
      }
    },
    mounted () {
      this.show = this.$route.path
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

<style scoped src="./sidebar.css"></style>
