
import Vue from 'vue'
import App from './App'
import http from './commons/http/http'

Vue.config.productionTip = false

App.mpType = 'app'

uni.$http = http;

uni.$showToast = (title = '', duration = 3000, icon = 'none') => {
  uni.showToast({ title, duration, icon });
};

const app = new Vue({
    ...App
})
app.$mount()
