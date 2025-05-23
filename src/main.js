import Vue from 'vue'
import App from './App'

// 阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false
// 删除运行 h5 会报错
App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
