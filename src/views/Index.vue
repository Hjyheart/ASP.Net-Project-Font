<template>
  <div></div>
</template>

<script>
  export default {
    data () {
      return {
        title: '首页'
      }
    },
    methods: {

    },
    mounted () {
      document.title = this.title
    }
  }
</script>

<style scoped>

</style>
