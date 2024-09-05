/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Tipos para arquivos de imagem
declare module '*.png' {
  const pngContent: string
  export default pngContent
}

declare module '*.jpg' {
  const jpgContent: string
  export default jpgContent
}

// ... similar changes for other image types

declare module '*.webp' {
  const webpContent: string
  export default webpContent
}
