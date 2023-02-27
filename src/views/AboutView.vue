<template>
  <div class="about">
    <h1>This is the about page {{ counterStore.count }}</h1>
    <div></div>
  </div>
</template>

<script lang="ts" setup>
import { onServerPrefetch } from 'vue'
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()

// 模拟服务端 获取异步数据
onServerPrefetch(async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      counterStore.count = 100

      resolve(true)
    }, 300)
  })
})
</script>
