<template>
  <div class="page">
    <h1>This is the about page {{ counterStore.count }}</h1>
    <div v-for="[key, value] in Object.entries(githubStore.user)" :key="key">{{ key }} : {{ value }}</div>
  </div>
</template>

<script lang="ts" setup>
import { onServerPrefetch } from 'vue'
import { getGithubUsers } from '@/api/user'
import { useCounterStore } from '@/stores/counter'
import { useGithubStore } from '@/stores/github'

const counterStore = useCounterStore()
const githubStore = useGithubStore()

if (import.meta.env.SSR) {
  counterStore.count = 100
}

// 模拟服务端 获取异步数据
onServerPrefetch(async () => {
  try {
    const { data } = await getGithubUsers()
    githubStore.user = data || {}
  } catch (error) {
    githubStore.user = {
      name: 'bilibili',
    }
  }
})
</script>
