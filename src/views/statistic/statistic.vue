<template>
  <div class="main-container">
    <h1>统计</h1>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }" :class="[computerAppend ? 'active':'']">
            <img src="../../../static/img/computer-default.jpg">
            <div class="card-title">
              <span>电脑</span>
            </div>
            <div :class="['down', computerActive ? 'active':'']" @mouseover="computerActive=true"  @mouseout="computerActive=false">
              <i class="fa fa-angle-double-down" style="color: #22C2DD"></i>
              <transition name="slide-fade">
                <span v-if="computerActive" @click="append('com')">查看详情</span>
              </transition>
            </div>
            <transition name="slide-fade">
              <div class="detail" v-if="computerAppend">
                <p>总电脑数: &nbsp <span>12</span></p>
                <p>最受欢迎: &nbsp <span>ThinkPad xx</span></p>
                <p>安全保护: &nbsp <span>10</span></p>
                <p>...</p>
              </div>
            </transition>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <img src="../../../static/img/phone-default.jpg">
            <div class="card-title">
              <span>手机</span>
            </div>
            <div class="down">
              <i class="fa fa-angle-double-down" style="color: #22C2DD"></i>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <img src="../../../static/img/camera-default.jpg">
            <div class="card-title">
              <span>照相机</span>
            </div>
            <div class="down">
              <i class="fa fa-angle-double-down" style="color: #22C2DD"></i>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <img src="../../../static/img/player-default.jpg">
            <div class="card-title">
              <span>音响</span>
            </div>
            <div class="down">
              <i class="fa fa-angle-double-down" style="color: #22C2DD"></i>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: '统计',
        computerActive: false,
        computerAppend: false,
        phoneActive: false,
        cameraActive: false,
        playerActive: false
      }
    },
    methods: {
      append (t) {
        if (t === 'com') {
          this.computerAppend = !this.computerAppend
        }
      }
    },
    mounted () {
      document.title = this.title
    }
  }
</script>

<style scoped src="./statistic.css"></style>
