/// <reference types="vite/client" />

import type { I18n } from 'vue-i18n'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t: (key: string, ...args: any[]) => string
    $i18n: I18n['global']
  }
}
