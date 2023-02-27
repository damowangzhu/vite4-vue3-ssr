<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <a href="/">Home</a>
      <a href="/about">About </a>
    </div>
  </div>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}
a:first-of-type {
  border: none;
}

.wrapper {
  text-align: center;
}
</style>
