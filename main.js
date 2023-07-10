
import Vue from 'vue'
import App from './App'
import { createHttp } from './commons/http/http'
import store from './store/store.js'

Vue.config.productionTip = false

App.mpType = 'app'

uni.$http = createHttp(store);

uni.$showToast = (title = '', duration = 3000, icon = 'none') => {
  uni.showToast({ title, duration, icon });
};

const app = new Vue({
    ...App,
    store,
})
app.$mount()
