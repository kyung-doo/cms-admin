import Vue from 'vue'


export default (() => {

    function numberCheck ( e ) {
        this.value = this.value.replace(/[^0-9]/g, '');
        if (e.keyCode && (e.keyCode <= 47 || e.keyCode >= 58) && (e.keyCode <= 95 || e.keyCode >= 106) && e.keyCode != 8) { 
            event.preventDefault(); 
        }
    }

    Vue.directive('numberOnly', { 
        bind (el, binding) {
            el.addEventListener('keydown', numberCheck)
            el.addEventListener('keyup', numberCheck)
        }
    })

})()

    
