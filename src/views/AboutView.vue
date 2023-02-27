<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>{{ counterStore.count }}</div>
  </div>
</template>

<script lang="ts" setup>
import { onServerPrefetch } from "vue";
import { useCounterStore } from "@/stores/counter";

const counterStore = useCounterStore();

// 模拟服务端 获取异步数据
onServerPrefetch(async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      counterStore.count = 100;

      resolve(true);
    }, 300);
  });
});
</script>
