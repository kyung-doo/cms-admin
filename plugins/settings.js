import Vue from 'vue'
import { SetDateFormat } from '~/plugins/utils'



export default ({ app, isDev }) => {

    // axios 기본경로
    app.$axios.defaults.baseURL = isDev ? 'http://localhost:3000':''

    // uploadUrl 경로
    Vue.prototype.$uploadUrl = isDev ? 'http://localhost:3000':''


    // 숫자만 쓰기 diretive 
    Vue.directive('numberOnly', { 
        bind (el, binding) {
            el.addEventListener('keydown', numberCheck)
            el.addEventListener('keyup', numberCheck)
        }
    })
    
    const numberCheck = function ( e ) {
        this.value = this.value.replace(/[^0-9]/g, '');
        if (e.keyCode && (e.keyCode <= 47 || e.keyCode >= 58) && (e.keyCode <= 95 || e.keyCode >= 106) && e.keyCode != 8) { 
            event.preventDefault(); 
        }
    }


    // 날짜 포맷
    SetDateFormat()
    
    Vue.filter('formatDate', function(value) {
        if (value) {
            return new Date(value).format('yyyy-MM-dd')
        }
    })

    Vue.filter('formatDateTime', function(value) {
        if (value) {
            return new Date(value).format('MM-dd hh:mm')
        }
    })
    
}