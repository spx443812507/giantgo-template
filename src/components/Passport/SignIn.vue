<template>
  <div id="app">
    <router-view></router-view>
    <mt-button type="default" @click="clickButton">default</mt-button>
  </div>
</template>

<script>
  export default {
    name: 'app',
    sockets: {
      connect: function () {
        this.id = this.$socket.id

        console.log('socket connected')
      },
      userJoin: function (data) {
        console.log(data)
      }
    },
    methods: {
      clickButton: function () {
        this.$socket.emit('subscribe', {
          room: 'room3',
          command: 'userJoin'
        })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .pager {
    background: url('../../assets/images/logo.png');
  }
</style>
