import { generateImageTryOnApi } from '@/api/tryOnApi'
import { defineStore } from 'pinia'

interface State {
  imageUrl: string
  generating: boolean
}

export const useTryOnStore = defineStore('tryOnStore', {
  state: (): State => {
    return {
      imageUrl: '',
      generating: false
    }
  },
  actions: {
    async generateImage(humanImage: File, clothImage: string) {
      this.generating = true
      const { data } = await generateImageTryOnApi({ humanImage, clothImage })
      this.generating = false
      return data
    }
  }
})
