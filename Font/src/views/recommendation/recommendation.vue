<template>
  <div class="main-container">
    <h1>推荐</h1>
    <div class="container">
      <!--<bubble ref="bubble" :tags="tags" class="bubble"></bubble>-->
      <ul>
        <li style="color: #0088f5; margin: 10px" v-for="item in tags">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import bubble from '../../components/vue-bubble/bubble.vue'
  import {getRecommendations, getDeviceInfo} from '../../service/fetchs'

  export default {
    data () {
      return {
        title: '推荐',
        tags: [],
        types: ['phone', 'computer', 'ppc', 'player']
      }
    },
    components: {
      bubble
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push('/login')
      }else {

      }
    },
    methods: {

    },
    async mounted () {
      document.title = this.title


      for (let i = 0; i < this.types.length; i++){
        getRecommendations(this.types[i]).then(res => {
          console.log(res)
          for (let k = 0; k < res.length; k++){
            this.tags.push(res[k])
          }
        }).catch(err => {
          console.log(err)
        })
      }

//      this.$refs.bubble.flush()
    }
  }
</script>

<style scoped src="./recommendation.css"></style>
