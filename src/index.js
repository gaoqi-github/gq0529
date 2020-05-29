import Vue from 'vue'
import App from "./App"

Vue.config.productionTip = false
//全局时间总线对象
// Vue.prototype.$globalEventBus = new Vue()

new Vue({
    //在已存在的Vue实例中，创建全局事件总线
    beforeCreate() {
        Vue.prototype.$bus = this
    },
    el:"#root",
    render:h=>h(App)
})