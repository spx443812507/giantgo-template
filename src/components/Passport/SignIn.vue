<template>
  <div id="app">
    <router-view></router-view>
    <mt-button type="default" @click="subscribe">订阅</mt-button>
    <mt-button type="default" @click="publish">发布</mt-button>
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
      subscribe: function () {
        this.$socket.emit('subscribe', {
          room: 'room11',
          command: 'userJoin'
        })
      },
      publish: function () {
        this.$socket.emit('publish', {
          room: 'room11',
          command: 'userJoin',
          data: {
            name: 'spx'
          }
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
