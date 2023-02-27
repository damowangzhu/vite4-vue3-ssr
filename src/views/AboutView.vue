<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>{{ counterStore.count }}</div>
  </div>
</template>

<script lang="ts" setup>
import { onServerPrefetch } from 'vue'
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()

onServerPrefetch(async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      counterStore.count = 100

      resolve(true)
    }, 1000)
  })
})
</script>
