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
              <div class="detail" v-if="true">
                <p>总电脑数: &nbsp <span>{{computer.count}}</span></p>
                <p>最受欢迎: &nbsp <span v-for="item in tags[0]">{{item}}&nbsp</span></p>
                <p>安全保护: &nbsp <span>{{computer.safe}}</span></p>
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
            <div :class="['down', phoneActive ? 'active':'']" @mouseover="phoneActive=true"  @mouseout="phoneActive=false">
              <i class="fa fa-angle-double-down" style="color: #22C2DD"></i>
              <transition name="slide-fade">
                <span v-if="phoneActive" @click="append('phone')">查看详情</span>
              </transition>
            </div>
            <transition name="slide-fade">
              <div class="detail" v-if="true">
                <p>总电脑数: &nbsp <span>{{phone.count}}</span></p>
                <p>最受欢迎: &nbsp <span v-for="item in tags[1]">{{item}}&nbsp</span></p>
                <p>安全保护: &nbsp <span>{{phone.safe}}</span></p>
                <p>...</p>
              </div>
            </transition>
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
              <transition name="slide-fade">
                <span v-if="cameraActive" @click="append('phone')">查看详情</span>
              </transition>
            </div>
            <transition name="slide-fade">
              <div class="detail" v-if="true">
                <p>总电脑数: &nbsp <span>{{camera.count}}</span></p>
                <p>最受欢迎: &nbsp <span v-for="item in tags[2]">{{item}}&nbsp</span></p>
                <p>安全保护: &nbsp <span>{{camera.safe}}</span></p>
                <p>...</p>
              </div>
            </transition>
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
            <transition name="slide-fade">
              <div class="detail" v-if="true">
                <p>总电脑数: &nbsp <span>{{player.count}}</span></p>
                <p>最受欢迎: &nbsp <span v-for="item in tags[3]">{{item}} &nbsp</span></p>
                <p>安全保护: &nbsp <span>{{player.safe}}</span></p>
                <p>...</p>
              </div>
            </transition>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

  import {getRecommendations, getAllDevice} from '../../service/fetchs'

  export default {
    data () {
      return {
        title: '统计',
        computerActive: false,
        computerAppend: false,
        phoneActive: false,
        cameraActive: false,
        playerActive: false,
        types: ['phone', 'computer', 'ppc', 'player'],
        tags: [],
        computer: {
          count: 0,
          tags:[],
          safe: 0
        },
        phone: {
          count: 0,
          tags:[],
          safe: 0
        },
        camera: {
          count: 0,
          tags:[],
          safe: 0
        },
        player:{
          count: 0,
          tags:[],
          safe: 0
        }
      }
    },
    methods: {
      append (t) {
        if (t === 'com') {
          this.computerAppend = !this.computerAppend
        }else if (t === 'phone'){
          this.phoneAppend = !this.phoneAppend
        }
      }
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push('/login')
      }else {
      }
    },
    mounted () {
      document.title = this.title

      getAllDevice().then(res => {
        console.log(res)

        for (let i = 0; i < res.length; i++){
          if (res[i].type_1 === 'computer'){
            this.computer.count += 1
            if (res[i].is_safety){
              this.computer.safe += 1
            }
          }else if (res[i].type_1 === 'phone'){
            this.phone.count += 1
            if (res[i].is_safety){
              this.phone.safe += 1
            }
          }else if (res[i].type_1 === 'camera'){
            this.camera.count += 1
            if (res[i].is_safety){
              this.camera.safe += 1
            }
          }else if (res[i].type_1 === 'player'){
            this.player.count += 1
            if (res[i].is_safety){
              this.player.safe += 1
            }
          }
        }

      }).catch(err => {
        console.log(err)
      })

      for (let i = 0; i < this.types.length; i++){
        getRecommendations(this.types[i]).then(res => {
          console.log(res)
          this.tags.push(res)
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped src="./statistic.css"></style>
