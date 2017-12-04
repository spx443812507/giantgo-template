// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSocketio from 'vue-socket.io'
import io from 'socket.io-client'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from '@/App'

Vue.config.productionTip = false

Vue.use(MintUI)
Vue.use(VueAxios, axios)
Vue.use(VueSocketio, io.connect('ws://localhost/webinar', {
  path: '/socketio/socket.io'
}))

router.beforeEach(function (to, from, next) {
  if (to.matched.some(record => record.meta.authorization)) {
    if (Vue.cookie.get('token')) {
      next()
    } else {
      next({
        path: '/passport/signin',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

axios.interceptors.request.use(function (config) {
  if (Vue.cookie.get('token')) {
    config.headers['authorization'] = 'Bearer ' + Vue.cookie.get('token')
  }

  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  // Do something with response data

  return response
}, function (error) {
  // Do something with response error
  if (error.response.status === 401) {
    router.app.$router.push({name: 'signin', query: {redirect: router.app.$route.fullPath}})
  }

  return Promise.reject(error)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
