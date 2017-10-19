import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/Passport/SignIn'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'signIn',
      component: SignIn
    }
  ]
})
