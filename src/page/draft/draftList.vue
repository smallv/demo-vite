<template>
  <div>
    draftList
  </div>
</template>
<script>
import { getCurrentInstance } from 'vue'
export default {
  setup() {
    const { proxy } = getCurrentInstance()
    let apis = proxy.$api
    let params = {"all":"","top":"1","lcAmt":"","lcAmt2":"","status":"","createDate":"","endDate":"","sysType":"1","pageNum":1,"pageSize":10}
    apis.getDraftList(params).then(res => {
      console.log(res);
    })
  },
}
</script>