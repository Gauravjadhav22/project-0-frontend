<template>
    <div class="container p_top not_found">
        <ExclamationCircleOutlined/>
        <h1>Not found</h1>
    </div>
</template>

<script>
    import {
        ExclamationCircleOutlined
    } from '@ant-design/icons-vue'

    export default {
        components:{
            ExclamationCircleOutlined
        }
    }
</script>

<style scoped>
    .anticon {
        font-size: 150px;
        color:#dc3545
    }
    h1{
        margin-top: 20px;
        font-size: 40px;
        font-weight: 100;
    }
</style>