
import Vue from 'vue'
import App from './App'
import http from './commons/http/http'

Vue.config.productionTip = false

App.mpType = 'app'

uni.$http = http;




const app = new Vue({
    ...App
})
app.$mount()
