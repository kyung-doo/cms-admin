<template>
    <div class="list-view-num">
        <b-form-select
            v-model="selectVal"
            :options="options || defaultOptions" />
        <slot name="label">
            <span class="label">개씩 보기</span>
        </slot>
    </div>
</template>

<script>
export default {

    props: {
        options: null
    },

    data () {
        return {
            defaultOptions: [
                { value: 10, text: '10', selected: true },
                { value: 15, text: '15' },
                { value: 20, text: '20' },
                { value: 25, text: '25' },
                { value: 30, text: '30' },
                { value: 40, text: '40' },
                { value: 50, text: '50' },
                { value: 60, text: '60' },
                { value: 70, text: '70' },
                { value: 100, text: '100' }
            ],
            selectVal: this.options ? this.options[0].value : 10
        }
    },

    watch: {
        selectVal () {
            this.$emit("change", this.selectVal)
        }
    }
}
</script>

<style scoped>
    .list-view-num {
        width: 250px;
        float: left;
        position: relative;
    }
    .list-view-num .custom-select {
        width: calc(100% - 100px);
        vertical-align: middle;
    }
    .list-view-num .label {
        vertical-align: middle;
        margin-left: 5px;
    }
</style>
