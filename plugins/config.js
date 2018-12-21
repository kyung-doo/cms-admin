import Vue from 'vue'

export default ({ app, isDev }) => {
    
    if( !isDev ) {
        app.$axios.defaults.baseURL = ''
        Vue.prototype.$uploadUrl = ''
    }
    else
    {
        app.$axios.defaults.baseURL = "http://localhost:3000"
        Vue.prototype.$uploadUrl = 'http://localhost:3000'
    }
    console.log(Vue.prototype)
}