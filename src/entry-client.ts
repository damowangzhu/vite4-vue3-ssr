import { createApp } from './main'

const { app, router, pinia } = createApp()

router.isReady().then(() => {
  if (window.__INITIAL_STATE__) {
    pinia.state.value = JSON.parse(window.__INITIAL_STATE__)
  }

  const meta = router.currentRoute.value.meta

  if (meta.title !== window.document.title) {
    window.document.title = (meta.title || '') as string
  }

  app.mount('#app')
})
