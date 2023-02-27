import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGithubStore = defineStore('github', () => {
  const user: any = ref({ name: 'github' })

  return { user }
})
