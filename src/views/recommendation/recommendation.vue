<template>
  <div class="main-container">
    <h1>推荐</h1>
    <div class="container">
      <bubble ref="bubble" :tags="tags" class="bubble"></bubble>
    </div>
  </div>
</template>

<script>
  import bubble from '../../components/vue-bubble/bubble.vue'

  export default {
    data () {
      return {
        title: '推荐',
        tags: ['联想 X9', 'mac pro']
      }
    },
    components: {
      bubble
    },
    methods: {

    },
    mounted () {
      document.title = this.title
      this.$refs.bubble.flush()
    }
  }
</script>

<style scoped src="./recommendation.css"></style>
